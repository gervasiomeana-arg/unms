import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import {
  Heart,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  Send,
  Sparkles,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, isRTL, openDonationModal, setIsAdminOpen, showToast } = useApp();
  const [emailSub, setEmailSub] = useState('');
  const t = translations.footer;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    showToast(
      t.subscribedMsg[language],
      'success'
    );
    setEmailSub('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Upper Newsletter & Support Band */}
      <div className="border-b border-stone-800/80 bg-stone-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left rtl:lg:text-right">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center lg:justify-start rtl:lg:justify-start gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.newsletterTitle[language]}</span>
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">
                {language === 'ar'
                  ? 'ابق على تواصل مع صمود ونضال المرأة الصحراوية'
                  : 'Sigue de cerca las acciones y la lucha de las mujeres saharauis'}
              </h3>
              <p className="mt-2 text-xs text-stone-400">
                {t.newsletterDesc[language]}
              </p>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="email"
                  required
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  placeholder={t.emailPlaceholder[language]}
                  className={`w-full py-3 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${
                    isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t.subscribeBtn[language]}</span>
                <Send className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-stone-950 flex items-center justify-center font-serif font-black text-xl shadow-md">
                U
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-wide block font-serif">
                  UNMS
                </span>
                <span className="text-xs text-amber-400/90 font-medium block">
                  {language === 'ar' ? 'الاتحاد الوطني للنساء الصحراويات' : 'Unión Nacional de Mujeres Saharauis'}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {t.aboutText[language]}
            </p>

            <div className="pt-2">
              <button
                onClick={() => openDonationModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{language === 'ar' ? 'مساهمة تضامنية مباشرة' : 'Hacer Donación Solidaria'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.quickLinks[language]}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#inicio" className="hover:text-amber-400 transition-colors">
                  {translations.nav.home[language]}
                </a>
              </li>
              <li>
                <a href="#lineas-accion" className="hover:text-amber-400 transition-colors">
                  {translations.nav.pillars[language]}
                </a>
              </li>
              <li>
                <a href="#historias-blog" className="hover:text-amber-400 transition-colors">
                  {translations.nav.blog[language]}
                </a>
              </li>
              <li>
                <a href="#galeria-audiovisual" className="hover:text-amber-400 transition-colors">
                  {translations.nav.gallery[language]}
                </a>
              </li>
              <li>
                <a href="#campanas-solidaridad" className="hover:text-amber-400 transition-colors">
                  {translations.nav.campaigns[language]}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Sedes */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.delegations[language]}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {t.headquarters[language]}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contacto@unms-sahara.org / solidarias@unms.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Delegaciones: Madrid • Ginebra • Argel • Nueva York</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer / Copyright & Admin Gate */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            {t.rights[language]}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors text-stone-400"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{translations.nav.admin[language]}</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'ar' ? 'منظمة إنسانية معتمدة' : 'ONG Humanitaria Acreditada'}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
