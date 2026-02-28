import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFile = './public/images/Logo.png';
const appDir = './app';
const publicDir = './public';

const sizes = [
    { name: 'icon.png', size: 32, dir: appDir }, // default icon for Next.js App Router
    { name: 'apple-icon.png', size: 180, dir: appDir }, // Apple touch icon
    { name: 'icon-192x192.png', size: 192, dir: publicDir }, // Android Web App
    { name: 'icon-512x512.png', size: 512, dir: publicDir } // Android Web App
];

async function generateFavicons() {
    console.log('🖼️  Démarrage de la génération dynamique des favicons...');

    if (!fs.existsSync(inputFile)) {
        console.error(`❌ Erreur: L'image source est introuvable à l'adresse : ${inputFile}`);
        process.exit(1);
    }

    try {
        for (const { name, size, dir } of sizes) {
            const outputPath = path.join(dir, name);
            
            // Generate PNG with sharp
            await sharp(inputFile)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 } // transparent background
                })
                .toFile(outputPath);
                
            console.log(`✅ Généré : ${outputPath} (${size}x${size})`);
        }
        
        console.log('🎉 Toutes les favicons ont été générées avec succès !');
    } catch (err) {
        console.error('❌ Erreur inattendue lors de la création des images :', err);
    }
}

generateFavicons();
