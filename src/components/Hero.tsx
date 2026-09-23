import React from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { IMAGES } from '../data/initialData';
import { Heart, Sparkles, BookOpen, PlayCircle, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { language, isRTL, openDonationModal, setActiveMediaModal, testimonials } = useApp();
  const t = translations.hero;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth >= 1024 ? -156 : -112;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const featuredVideo = testimonials.find((item) => item.featured) || testimonials[0];

  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-950 text-white pt-10 pb-20 lg:pt-20 lg:pb-28 border-b border-stone-800">
      {/* Background with layered desert gradient & authentic photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Imagen ilustrativa de la propuesta UNMS"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-125 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main textual column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right">
            {/* 50 Years Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-6 shadow-inner"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t.badge[language]}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-100 leading-[1.15]"
            >
              <span className="block font-serif text-amber-400">
                {t.titleMain[language]}
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-stone-300 mt-2">
                {language === 'ar'
                  ? 'صوت الصمود، وريادة العمل الإنساني وبناء المجتمع'
                  : language === 'fr'
                  ? 'Voix de la Résilience et de l’Action Humanitaire'
                  : language === 'en'
                  ? 'The Voice of Resilience & Humanitarian Leadership'
                  : 'Fuerza, Dignidad y Acción Humanitaria en el Desierto'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal"
            >
              {t.subtitle[language]}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => openDonationModal()}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                id="hero-donate-primary-btn"
              >
                <Heart className="w-5 h-5 fill-stone-950 text-stone-950" />
                <span>{t.ctaDonate[language]}</span>
              </button>

              <button
                onClick={() => scrollTo('historias-blog')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 font-semibold text-sm transition-all"
                id="hero-explore-stories-btn"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{t.ctaExplore[language]}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {featuredVideo && (
                <button
                  onClick={() => setActiveMediaModal(featuredVideo)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-800/40 font-semibold text-sm transition-all"
                  id="hero-watch-testimony-btn"
                >
                  <PlayCircle className="w-4 h-4 text-amber-400" />
                  <span>{featuredVideo.mediaUrl ? t.watchTestimonials[language] : language === 'ar' ? 'اكتشف القصة' : language === 'fr' ? 'Découvrir le récit' : language === 'en' ? 'Explore the story' : 'Conocer el relato'}</span>
                </button>
              )}
            </motion.div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'محتوى المقترح قيد التقييم'
                    : language === 'fr'
                    ? 'Contenu à valider'
                    : language === 'en'
                    ? 'Content pending validation'
                    : 'Contenido pendiente de validar'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? '100% إدارة نسائية مستقلة'
                    : language === 'fr'
                    ? '100% gouvernance féminine'
                    : language === 'en'
                    ? '100% Women-led governance'
                    : '100% Gestión y liderazgo femenino'}
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'شفافية وتوجيه مباشر للمشاريع'
                    : language === 'fr'
                    ? 'Transparence & Impact direct'
                    : language === 'en'
                    ? 'Transparency & Direct impact'
                    : 'Transparencia e impacto directo'}
                </span>
              </div>
            </div>
          </div>

          {/* Right visual card showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-700 shadow-2xl p-2 group"
            >
              {/* Image Frame */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-950">
                <img
                  src={IMAGES.weaving}
                  alt="Imagen ilustrativa de un proyecto de artesanía"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                {/* Floating quote callout */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-200 text-xs leading-relaxed">
                  <p className="italic font-serif text-amber-200">
                    "{translations.pillars.p2.desc[language]}"
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-semibold text-white">
                      {language === 'ar' ? 'مدرسة 27 فبراير للتكوين' : 'Escuela 27 de Febrero'}
                    </span>
                    <span className="text-amber-400">Wilaya Bojador</span>
                  </div>
                </div>
              </div>

              {/* Fast mini-donation impact preview banner */}
              <div className="p-3 bg-stone-950 rounded-xl mt-2 border border-stone-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                    €30
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="text-xs font-bold text-white">
                      {language === 'ar' ? 'منحة تعليمية شهرية' : 'Beca de Formación'}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {language === 'ar' ? 'توفير الحقيبة والمقررات الدراسية' : 'Material didáctico completo'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openDonationModal({ amount: 30, cause: 'education' })}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
                >
                  {language === 'ar' ? 'تمويل' : 'Aportar'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
