import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { DonationRecord } from '../types';
import {
  Heart,
  CreditCard,
  Building,
  CheckCircle,
  ShieldCheck,
  Award,
  Download,
  Printer,
  Copy,
  Check,
  X,
  Smartphone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DonationSystem: React.FC = () => {
  const {
    language,
    isRTL,
    isDonationModalOpen,
    closeDonationModal,
    donationModalPrefill,
    addDonation,
    showToast,
  } = useApp();

  const t = translations.donation;

  // Donation form state
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [amount, setAmount] = useState<number>(30);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');
  const [selectedCause, setSelectedCause] = useState<string>('general');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank_transfer' | 'bizum'>('card');
  
  // Donor details
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Completed donation state for certificate modal view
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);
  const [copiedIban, setCopiedIban] = useState(false);

  // Apply prefill when opened
  useEffect(() => {
    if (donationModalPrefill) {
      if (donationModalPrefill.amount) {
        setAmount(donationModalPrefill.amount);
        setCustomAmount('');
      }
      if (donationModalPrefill.cause) {
        setSelectedCause(donationModalPrefill.cause);
      }
    }
  }, [donationModalPrefill]);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const presets = [
    { value: 15, item: t.presets.p15 },
    { value: 30, item: t.presets.p30 },
    { value: 60, item: t.presets.p60 },
    { value: 120, item: t.presets.p120 },
  ];

  const currentActiveAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText(t.bankDetails.iban);
    setCopiedIban(true);
    showToast(translations.social.linkCopied[language], 'success');
    setTimeout(() => setCopiedIban(false), 2500);
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentActiveAmount || currentActiveAmount <= 0) {
      showToast('Por favor selecciona o ingresa una cantidad válida', 'warning');
      return;
    }
    if (!donorName.trim() || !email.trim()) {
      showToast('Por favor introduce tu nombre y correo electrónico', 'warning');
      return;
    }

    const rec = addDonation({
      donorName: isAnonymous ? 'Donante Anónimo' : donorName.trim(),
      email: email.trim(),
      amount: currentActiveAmount,
      currency,
      frequency,
      cause: selectedCause,
      paymentMethod,
      isAnonymous,
      message: message.trim(),
    });

    setCompletedDonation(rec);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  if (!isDonationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white text-stone-900 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[94vh] flex flex-col border border-stone-200"
      >
        {/* Top Floating Modal Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-amber-700" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                {t.badge[language]}
              </span>
              <span className="text-[11px] text-stone-500">
                {language === 'ar' ? 'الاتحاد الوطني للنساء الصحراويات (UNMS)' : 'Unión Nacional de Mujeres Saharauis'}
              </span>
            </div>
          </div>

          <button
            onClick={closeDonationModal}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {completedDonation ? (
            /* ================= COMPLETED DONATION CERTIFICATE VIEW ================= */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-stone-900 font-serif">
                  {language === 'ar' ? 'شكراً جزيلاً لتضامنكم الكريم!' : '¡Muchísimas gracias por tu solidaridad!'}
                </h3>
                <p className="mt-1 text-xs text-stone-600">
                  {language === 'ar'
                    ? 'تم تسجيل مساهمتك بنجاح لدعم برامج المرأة والطفل في المخيمات.'
                    : 'Tu aportación directa apoya de manera inmediata los programas de la UNMS.'}
                </p>
              </div>

              {/* Printable Official Certificate Card */}
              <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border-2 border-dashed border-amber-400 text-left rtl:text-right relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-amber-300">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold block">
                      República Árabe Saharaui Democrática (RASD)
                    </span>
                    <h4 className="text-lg font-bold text-stone-900 font-serif">
                      {t.certificateTitle[language]}
                    </h4>
                  </div>
                  <Award className="w-8 h-8 text-amber-700" />
                </div>

                <div className="grid grid-cols-2 gap-4 my-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">{t.fullName[language]}:</span>
                    <span className="font-bold text-stone-900 text-sm">{completedDonation.donorName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Identificador Oficial:</span>
                    <span className="font-mono font-bold text-amber-800">{completedDonation.certificateId}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Cantidad Aportada:</span>
                    <span className="text-base font-extrabold text-stone-900 font-serif">
                      {currencySymbol}{completedDonation.amount} ({completedDonation.frequency === 'monthly' ? 'Mensual' : 'Puntual'})
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Fecha de Emisión:</span>
                    <span className="font-bold text-stone-800">{completedDonation.date}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200 text-[11px] text-stone-600 italic">
                  "Certificamos la recepción de los fondos destinados a proyectos de salud materna, educación y cooperativas lideradas por mujeres saharauis."
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handlePrintCertificate}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.downloadReceipt[language]}</span>
                </button>
                <button
                  onClick={() => {
                    setCompletedDonation(null);
                    closeDonationModal();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl"
                >
                  {language === 'ar' ? 'إغلاق' : 'Finalizar y Cerrar'}
                </button>
              </div>
            </div>
          ) : (
            /* ================= DONATION INPUT FORM ================= */
            <form onSubmit={handleSubmitDonation} className="space-y-6">
              {/* Frequency Selector */}
              <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setFrequency('one_time')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    frequency === 'one_time'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.frequency.oneTime[language]}
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    frequency === 'monthly'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.frequency.monthly[language]}
                </button>
              </div>

              {/* Amount Selection Presets */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'اختر مبلغ المساهمة' : 'Selecciona el Monto de Apoyo'} ({currencySymbol})
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presets.map((preset) => (
                    <button
                      type="button"
                      key={preset.value}
                      onClick={() => handlePresetClick(preset.value)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                        amount === preset.value && !customAmount
                          ? 'border-amber-600 bg-amber-50/80 text-amber-950 shadow-xs ring-2 ring-amber-500/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <span className="text-xl font-extrabold font-serif">
                        {currencySymbol}{preset.value}
                      </span>
                      <span className="text-[10px] text-stone-500 mt-1 leading-tight line-clamp-2">
                        {getLocalized(preset.item.desc, language)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 text-stone-400 font-bold text-sm">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={customAmount}
                      onChange={handleCustomChange}
                      placeholder={t.customAmount[language]}
                      className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Cause Destination */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {t.selectCause[language]}
                </label>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                >
                  <option value="general">{getLocalized(t.causes.general, language)}</option>
                  <option value="health">{getLocalized(t.causes.health, language)}</option>
                  <option value="education">{getLocalized(t.causes.education, language)}</option>
                  <option value="cooperatives">{getLocalized(t.causes.cooperatives, language)}</option>
                </select>
              </div>

              {/* Donor Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.fullName[language]} *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Ej. Carmen Navarro"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.email[language]} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              {/* Anonymous checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>{t.anonymousCheck[language]}</span>
              </label>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {t.paymentMethod[language]}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bizum')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'bizum'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Bizum / Móvil</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Transferencia</span>
                  </button>
                </div>
              </div>

              {/* Method Details Views */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      {t.cardNumber[language]}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8920"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        {t.cardExp[language]}
                      </label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        {t.cardCvc[language]}
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="784"
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs space-y-2">
                  <div className="font-bold text-stone-900">
                    {getLocalized(t.bankDetails.accountHolder, language)}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-amber-200 font-mono">
                    <span>{t.bankDetails.iban}</span>
                    <button
                      type="button"
                      onClick={handleCopyIban}
                      className="p-1 hover:bg-amber-100 rounded text-amber-800"
                    >
                      {copiedIban ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-stone-600">
                    SWIFT/BIC: <strong className="font-mono">{t.bankDetails.swift}</strong>
                  </div>
                  <div className="text-[11px] text-amber-900 font-semibold">
                    {getLocalized(t.bankDetails.concept, language)}
                  </div>
                </div>
              )}

              {paymentMethod === 'bizum' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2 text-emerald-950">
                  <div className="font-bold">Bizum ONG Solidaria Saharaui</div>
                  <div className="font-mono text-sm font-bold bg-white p-2 rounded-xl border border-emerald-200 inline-block">
                    Código Donación: <strong>03841</strong>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Abre tu app bancaria, accede a Bizum &gt; Donar a ONG e introduce el código 03841.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-stone-950" />
                <span>
                  {t.submitDonation[language]} {currencySymbol}{currentActiveAmount}
                </span>
              </button>

              {/* Security notice */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.securityNotice[language]}</span>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
