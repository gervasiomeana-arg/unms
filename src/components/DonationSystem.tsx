import React, { useEffect, useState } from 'react';
import { Heart, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

const copy = {
  es: { badge: 'Propuesta conceptual', title: 'Explorá una forma de apoyar', intro: 'Esta vista permite evaluar un futuro recorrido de donación, sin solicitar pagos ni datos personales.', amount: 'Importe de ejemplo', cause: 'Destino propuesto', once: 'Una vez', monthly: 'Mensualmente', action: 'Ver resumen', summary: 'Resumen ilustrativo', note: 'Demostración de diseño: no se realizó ningún cobro ni se emitió un comprobante.', close: 'Volver a la página', general: 'Fondo general', health: 'Salud', education: 'Educación', cooperatives: 'Cooperativas' },
  en: { badge: 'Concept proposal', title: 'Explore a way to support', intro: 'Preview a future donation journey without entering payment or personal details.', amount: 'Example amount', cause: 'Proposed cause', once: 'One time', monthly: 'Monthly', action: 'View summary', summary: 'Illustrative summary', note: 'Design demonstration: no payment was taken and no receipt was issued.', close: 'Back to the page', general: 'General fund', health: 'Health', education: 'Education', cooperatives: 'Cooperatives' },
  fr: { badge: 'Projet conceptuel', title: 'Découvrir comment soutenir', intro: 'Explorez un futur parcours de don, sans paiement ni données personnelles.', amount: 'Montant indicatif', cause: 'Cause proposée', once: 'Une fois', monthly: 'Chaque mois', action: 'Voir le récapitulatif', summary: 'Récapitulatif illustratif', note: 'Démonstration : aucun paiement ni reçu n’a été effectué.', close: 'Revenir au site', general: 'Fonds général', health: 'Santé', education: 'Éducation', cooperatives: 'Coopératives' },
  ar: { badge: 'مقترح تصوري', title: 'استكشف مسار الدعم', intro: 'معاينة لمسار تبرع مستقبلي دون طلب بيانات شخصية أو معلومات دفع.', amount: 'مبلغ توضيحي', cause: 'الوجهة المقترحة', once: 'مرة واحدة', monthly: 'شهرياً', action: 'عرض الملخص', summary: 'ملخص توضيحي', note: 'عرض توضيحي فقط: لم يتم تحصيل أي مبلغ أو إصدار إيصال.', close: 'العودة إلى الصفحة', general: 'الصندوق العام', health: 'الصحة', education: 'التعليم', cooperatives: 'التعاونيات' },
};
type Cause = 'general' | 'health' | 'education' | 'cooperatives';

export const DonationSystem: React.FC = () => {
  const { language, isDonationModalOpen, closeDonationModal, donationModalPrefill } = useApp();
  const t = copy[language];
  const [amount, setAmount] = useState(30);
  const [cause, setCause] = useState<Cause>('general');
  const [monthly, setMonthly] = useState(false);
  const [summary, setSummary] = useState(false);

  useEffect(() => {
    if (!isDonationModalOpen) return;
    setAmount(donationModalPrefill?.amount ?? 30);
    const chosen = donationModalPrefill?.cause === 'cooperative' ? 'cooperatives' : donationModalPrefill?.cause;
    setCause(chosen === 'health' || chosen === 'education' || chosen === 'cooperatives' ? chosen : 'general');
    setSummary(false);
  }, [isDonationModalOpen, donationModalPrefill]);

  useEffect(() => {
    if (!isDonationModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeDonationModal(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isDonationModalOpen, closeDonationModal]);

  if (!isDonationModalOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/85 p-4 backdrop-blur-md" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDonationModal(); }}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="support-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="my-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-amber-200/30 bg-[#FAF6EE] shadow-2xl">
        <div className="relative bg-stone-950 px-6 py-9 text-white sm:px-10">
          <button type="button" onClick={closeDonationModal} aria-label="Cerrar" className="absolute right-5 top-5 rounded-full border border-white/20 p-2 hover:bg-white/10"><X className="h-5 w-5" /></button>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300"><Heart className="h-3.5 w-3.5" />{t.badge}</div>
          <h2 id="support-title" className="max-w-md font-serif text-3xl leading-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-300">{t.intro}</p>
        </div>
        <div className="space-y-6 px-6 py-8 sm:px-10">
          {summary ? (
            <div className="rounded-2xl border border-amber-300 bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">{t.summary}</span>
              <p className="mt-3 font-serif text-4xl text-stone-900">€{amount.toLocaleString()} <span className="text-base text-stone-500">/ {monthly ? t.monthly.toLowerCase() : t.once.toLowerCase()}</span></p>
              <p className="mt-2 text-sm text-stone-700">{t[cause]}</p>
            </div>
          ) : (
            <>
              <div><span className="mb-3 block text-xs font-bold uppercase tracking-wider text-stone-700">{t.amount}</span><div className="grid grid-cols-4 gap-2">{[15, 30, 60, 120].map(value => <button type="button" key={value} onClick={() => setAmount(value)} aria-pressed={amount === value} className={`rounded-xl border px-2 py-4 text-sm font-bold transition-colors ${amount === value ? 'border-amber-600 bg-amber-100 text-stone-950' : 'border-stone-300 bg-white text-stone-700 hover:border-amber-600'}`}>€{value}</button>)}</div></div>
              <div><label htmlFor="support-cause" className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">{t.cause}</label><select id="support-cause" value={cause} onChange={event => setCause(event.target.value as Cause)} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900">{(['general', 'health', 'education', 'cooperatives'] as const).map(key => <option key={key} value={key}>{t[key]}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-stone-200/70 p-1">{[false, true].map(value => <button type="button" key={String(value)} onClick={() => setMonthly(value)} aria-pressed={monthly === value} className={`rounded-lg py-2.5 text-sm font-semibold ${monthly === value ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600'}`}>{value ? t.monthly : t.once}</button>)}</div>
              <button type="button" onClick={() => setSummary(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-4 font-bold text-stone-950 shadow-lg transition-colors hover:bg-amber-500">{t.action}<ArrowRight className="h-4 w-4" /></button>
            </>
          )}
          <div className="flex items-start gap-2 text-xs leading-relaxed text-stone-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" /><span>{t.note}</span></div>
          {summary && <button type="button" onClick={closeDonationModal} className="w-full rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-white">{t.close}</button>}
        </div>
      </motion.div>
    </div>
  );
};
