'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon,
  Heading1, Heading2, Quote, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import { useCallback, useState } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Écrivez votre récit ici...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4'
      }
    },
    immediatelyRender: false,
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Nettoyer l'URL
    let cleanUrl = url.trim();

    // Si l'URL est déjà absolue (commence par http:// ou https://), la garder telle quelle
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: cleanUrl }).run();
      return;
    }

    // Si l'URL commence par le domaine du site actuel, extraire seulement la partie chemin
    if (cleanUrl.startsWith(window.location.origin)) {
      cleanUrl = cleanUrl.substring(window.location.origin.length);
    }

    // Si c'est une route relative qui ne commence pas par '/', l'ajouter
    if (!cleanUrl.startsWith('/')) {
      cleanUrl = '/' + cleanUrl;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: cleanUrl }).run();
  }, [editor]);

  const [isUploading, setIsUploading] = useState(false);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.url && editor) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } catch (err) {
          console.error(err);
          alert('Erreur upload image');
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  }, [editor]);

  if (!editor) {
    return null;
  }

  interface ToolbarButtonProps {
    onClick: () => void;
    isActive: boolean;
    icon: React.ElementType;
  }

  const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => (
    <button
      type="button"
      disabled={isUploading}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${isActive
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
      <div className="border-b border-gray-200 dark:border-slate-700 p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-slate-950">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={UnderlineIcon}
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={Heading1}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          icon={AlignLeft}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          icon={AlignCenter}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          icon={AlignRight}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          icon={AlignJustify}
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2 self-center" />
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
        />
        <ToolbarButton
          onClick={addImage}
          isActive={false}
          icon={ImageIcon}
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={Undo}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={Redo}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
