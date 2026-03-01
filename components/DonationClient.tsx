'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationSchema, type DonationFormData } from '@/lib/validations';
import { motion } from 'framer-motion';
import { Heart, Lock, CreditCard, FileQuestion } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DonationClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DonationFormData>({
        resolver: zodResolver(donationSchema),
        defaultValues: { amount: 50 },
    });

    const currentAmount = watch('amount');

    // We need to construct the callback URL. In client component, we can use window.location.origin
    const [callbackUrl, setCallbackUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCallbackUrl(`${window.location.origin}/don/success`);
        }
    }, []);

    const onSubmit = (data: DonationFormData) => {
        // If validation passes, submit the actual MaishaPay form
        const form = document.getElementById('maishapay-form') as HTMLFormElement;
        if (form) {
            form.submit();
        }
    };

    const presetAmounts = [10, 20, 50, 100, 200];

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-[#020617] transition-colors">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Votre générosité nous permet de continuer nos actions sur le terrain. Chaque don compte et fait une réelle différence.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Trust & Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 backdrop-blur-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2 dark:text-white">
                                <Lock size={18} className="text-green-500" />
                                Paiement sécurisé
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Toutes les transactions sont sécurisées et chiffrées via Maishapay.
                            </p>
                            <div className="flex gap-2 opacity-50 dark:text-white">
                                <CreditCard />
                            </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-blue-700 flex items-center gap-2 dark:text-blue-400 mb-2">
                                <FileQuestion size={18} className="text-green-500" />
                                Pourquoi faire un don ?</h3>
                            <p className="text-sm text-blue-600 dark:text-blue-300">
                                Parce que chaque don compte et fait une réelle différence. Votre générosité nous permet de continuer nos actions sur le terrain.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-800 backdrop-blur-sm"
                        >
                            {/* The UI Form for Validation */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Amount Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-4 dark:text-white">Je donne</label>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {presetAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => setValue('amount', amount)}
                                                className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${currentAmount === amount
                                                    ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'border-gray-200 dark:border-slate-700 hover:border-green-500 text-gray-500 dark:text-gray-400'
                                                    }`}
                                            >
                                                {amount}$
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500 dark:text-gray-400">$</span>
                                        <input
                                            type="number"
                                            {...register('amount', { valueAsNumber: true })}
                                            className="w-full pl-8 pr-4 py-4 rounded-xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-green-500 outline-none font-bold text-lg dark:text-white"
                                            placeholder="Autre montant"
                                        />
                                    </div>
                                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-green-600/20 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        'Redirection...'
                                    ) : (
                                        <>
                                            <Heart fill="currentColor" className="animate-pulse" />
                                            Faire le don
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Hidden MaishaPay Form */}
                            <form
                                id="maishapay-form"
                                action="https://marchand.maishapay.online/payment/vers1.0/merchant/checkout"
                                method="POST"
                                target="_self"
                                className="hidden"
                            >
                                <input type="hidden" name="gatewayMode" value="1" />
                                <input type="hidden" name="publicApiKey" value="MP-LIVEPK-ESCv/rKvjRdNlD1UNuVk.BYVb04y/GchDa.mH7ED8Np2sKThG1efYIjO1yF0i2Y$xy3Gk5iOhSbyR5VJ55UevkrL$zjU2up$z$SLZu$z$i.cwqfbytB1FS5Z" />
                                <input type="hidden" name="secretApiKey" value="MP-LIVESK-ou0rOAkt91.oAC82eE1BwNPR$n5j2uqK5M1wZ/GpVK9OTZEjSyiipMwqMPezCjDlJHEqkLPI.$aW5u0QxG4$c1A.yiUyteoJRu4$$fny2K.kVaMA$Bms096r" />
                                <input type="hidden" name="montant" value={currentAmount} />
                                <input type="hidden" name="devise" value="USD" />
                                <input type="hidden" name="callbackUrl" value={callbackUrl} />
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
