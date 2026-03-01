'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adhesionSchema, type AdhesionFormData } from '@/lib/validations';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdhesionClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors } } = useForm<AdhesionFormData>({
    resolver: zodResolver(adhesionSchema),
  });

  const onSubmit = async (data: AdhesionFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/adhesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed');
      setSubmitStatus('success');
    } catch (e) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center p-4 bg-gray-50 dark:bg-[#020617] transition-colors">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Demande reçue !</h1>
          <p className="text-gray-600 dark:text-gray-400">Nous avons bien reçu votre demande d'adhésion.</p>
        </motion.div>
      </div>
    )
  }

  const inputClasses = "w-full p-3 rounded-lg border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600";
  const labelClasses = "block text-sm font-medium mb-2 dark:text-gray-200";

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-[#020617] transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400">Rejoignez notre communauté et contribuez activement au changement.</p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-slate-800"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Nom</label>
                <input {...register('nom')} className={inputClasses} placeholder="Votre nom" />
                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>Post-nom</label>
                <input {...register('postNom')} className={inputClasses} placeholder="Votre post-nom" />
                {errors.postNom && <p className="text-red-500 text-sm mt-1">{errors.postNom.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>Prénom</label>
                <input {...register('prenom')} className={inputClasses} placeholder="Votre prénom" />
                {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>Email</label>
                <input type="email" {...register('email')} className={inputClasses} placeholder="exemple@email.com" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>Téléphone</label>
                <input {...register('telephone')} className={inputClasses} placeholder="+243..." />
                {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
              </div>
              <div>
                <label className={labelClasses}>Profession</label>
                <input {...register('profession')} className={inputClasses} placeholder="Votre profession" />
                {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Adresse physique</label>
              <input {...register('adresse')} className={inputClasses} placeholder="Numéro, Avenue, Quartier..." />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
            </div>

            <div>
              <label className={labelClasses}>Motivation</label>
              <textarea rows={4} {...register('motivation')} className={inputClasses} placeholder="Pourquoi souhaitez-vous nous rejoindre ?" />
              {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                <AlertCircle size={20} />
                <span>Une erreur est survenue. Veuillez réessayer.</span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
