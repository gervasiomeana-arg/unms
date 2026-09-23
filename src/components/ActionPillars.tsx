import React from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { IMAGES } from '../data/initialData';
import { HeartPulse, GraduationCap, Scissors, Scale, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const ActionPillars: React.FC = () => {
  const { language, isRTL, openDonationModal } = useApp();
  const t = translations.pillars;

  const pillarsData = [
    {
      id: 'pillar-health',
      title: t.p1.title,
      desc: t.p1.desc,
      icon: HeartPulse,
      image: IMAGES.health,
      tag: { es: 'Salud', en: 'Health', ar: 'الصحة', fr: 'Santé' },
      cause: 'health',
      color: 'from-rose-900/80 to-stone-900',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'pillar-edu',
      title: t.p2.title,
      desc: t.p2.desc,
      icon: GraduationCap,
      image: IMAGES.education,
      tag: { es: 'Educación', en: 'Education', ar: 'التعليم', fr: 'Éducation' },
      cause: 'education',
      color: 'from-amber-900/80 to-stone-900',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'pillar-coop',
      title: t.p3.title,
      desc: t.p3.desc,
      icon: Scissors,
      image: IMAGES.weaving,
      tag: { es: 'Artesanía', en: 'Crafts', ar: 'الحرف', fr: 'Artisanat' },
      cause: 'cooperatives',
      color: 'from-emerald-900/80 to-stone-900',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'pillar-rights',
      title: t.p4.title,
      desc: t.p4.desc,
      icon: Scale,
      image: IMAGES.advocacy,
      tag: { es: 'Derechos Humanos', en: 'Human Rights', ar: 'حقوق الإنسان', fr: 'Droits Humains' },
      cause: 'general',
      color: 'from-blue-900/80 to-stone-900',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'pillar-culture',
      title: t.p5.title,
      desc: t.p5.desc,
      icon: Sparkles,
      image: IMAGES.culture,
      tag: { es: 'Cultura y Memoria', en: 'Culture & Memory', ar: 'التراث والذاكرة', fr: 'Culture & Mémoire' },
      cause: 'general',
      color: 'from-purple-900/80 to-stone-900',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  return (
    <section id="lineas-accion" className="py-16 lg:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200 inline-block mb-3">
            {t.tag[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
            {t.title[language]}
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {language === 'ar'
              ? 'تتكامل جهود الاتحاد في خمسة محاور حيوية لحماية كرامة المجتمع وصون الهوية وتأهيل الأجيال.'
              : language === 'fr'
              ? 'L’UNMS concentre son action sur cinq piliers essentiels pour l’autonomie et la dignité.'
              : language === 'en'
              ? 'UNMS focuses its humanitarian efforts across five vital pillars for community empowerment.'
              : 'La UNMS articula su labor humanitaria y social en cinco ejes estratégicos para el empoderamiento y la dignidad.'}
          </p>
        </div>

        {/* 5 Action Pillars Grid (3 top, 2 bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarsData.slice(0, 3).map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl overflow-hidden bg-stone-50 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={pillar.image}
                    alt={getLocalized(pillar.title, language)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${pillar.badgeColor}`}>
                      {getLocalized(pillar.tag, language)}
                    </span>
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 w-10 h-10 rounded-xl bg-stone-900/90 border border-stone-700 text-amber-400 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 font-serif group-hover:text-amber-700 transition-colors">
                      {getLocalized(pillar.title, language)}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {getLocalized(pillar.desc, language)}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/70 flex items-center justify-between">
                    <button
                      onClick={() => openDonationModal({ cause: pillar.cause })}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-amber-700" />
                      <span>
                        {language === 'ar' ? 'دعم هذا المحور' : language === 'fr' ? 'Soutenir ce projet' : language === 'en' ? 'Support this initiative' : 'Apoyar este proyecto'}
                      </span>
                    </button>
                    <span className="w-7 h-7 rounded-full bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center transition-colors">
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2 Bottom Pillars (Wider horizontal or 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {pillarsData.slice(3, 5).map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="rounded-3xl overflow-hidden bg-stone-50 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Image */}
                <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={pillar.image}
                    alt={getLocalized(pillar.title, language)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${pillar.badgeColor}`}>
                      {getLocalized(pillar.tag, language)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-700 transition-colors">
                      {getLocalized(pillar.title, language)}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {getLocalized(pillar.desc, language)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between">
                    <button
                      onClick={() => openDonationModal({ cause: pillar.cause })}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                    >
                      <Heart className="w-3.5 h-3.5 fill-amber-700" />
                      <span>
                        {language === 'ar' ? 'مساهمة تضامنية' : 'Aporte Solidario'}
                      </span>
                    </button>
                    <ArrowRight className={`w-4 h-4 text-amber-700 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''} transition-transform`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
