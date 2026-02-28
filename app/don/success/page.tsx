'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Home, Heart } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const description = searchParams.get('description');
  const transactionRefId = searchParams.get('transactionRefId');

  const isSuccess = status === '200' || description === 'SUCCESS';

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-[#020617] px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-slate-800"
        >
          {isSuccess ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Merci pour votre don !</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Votre générosité nous aide à changer des vies.
              </p>
              {transactionRefId && (
                  <p className="text-xs text-gray-400 mb-8">Référence du don : {transactionRefId}</p>
              )}
              
              <div className="flex gap-4 w-full">
                <Link href="/" className="flex-1 py-3 px-4 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Home size={18} />
                  Accueil
                </Link>
                <Link href="/don" className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Nouveau don
                </Link>
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                <XCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Paiement non abouti</h2>
              <p className="text-red-500 mb-8">
                {description || "Une erreur est survenue lors du paiement."}
              </p>
              <Link href="/don" className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                Réessayer
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center dark:text-white">Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
