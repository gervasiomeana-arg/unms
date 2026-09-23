import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { Building2, GraduationCap, Sparkles, ShieldCheck, MapPin, HeartHandshake, Compass, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const ImpactStats: React.FC = () => {
  const { language, impactStats, isRTL } = useApp();
  const t = translations.impact;
  const [activeWilaya, setActiveWilaya] = useState<string>('smara');

  const wilayasData = [
    {
      id: 'smara',
      name: { es: 'Wilaya de Smara', en: 'Smara Camp', ar: 'ولاية السمارة', fr: 'Wilaya de Smara' },
      focus: {
        es: 'Centro Hospitalario Materno-Infantil y Escuela de Enfermería Comunitaria.',
        en: 'Maternal-Child Hospital Center and Community Nursing Academy.',
        ar: 'المستشفى المركزي للأمومة والطفولة ومدرسة التمريض المجتمعي.',
        fr: 'Centre Hospitalier Mère-Enfant et École d’Infirmières.',
      },
      stats: '15 Dispensarios • 4 Centros de Alfabetización',
    },
    {
      id: 'bojador',
      name: { es: 'Wilaya de Bojador', en: 'Bojador Camp', ar: 'ولاية بوجدور', fr: 'Wilaya de Bojador' },
      focus: {
        es: 'Sede Histórica de la Escuela de Formación de Mujeres 27 de Febrero.',
        en: 'Historical Campus of the 27th February Women’s Leadership & Training Academy.',
        ar: 'المقر التاريخي لمدرسة 27 فبراير لتأهيل وتكوين النساء.',
        fr: 'Siège Historique de l’École de Formation des Femmes du 27 Février.',
      },
      stats: 'Centro Nacional de Formación • Talleres de Informática',
    },
    {
      id: 'elaaiun',
      name: { es: 'Wilaya de El Aaiún', en: 'El Aaiun Camp', ar: 'ولاية العيون', fr: 'Wilaya de Laâyoune' },
      focus: {
        es: 'Talleres de Preservación de Música Tradicional Haul y Poesía Hassaniya.',
        en: 'Workshops for Haul Traditional Music Preservation and Hassaniya Oral Poetry.',
        ar: 'ورشات صون الموسيقى التقليدية (الهَوْل) والشعر الحساني والتراث.',
        fr: 'Ateliers de Préservation de la Musique Haul et Poésie Hassanya.',
      },
      stats: 'Centro Cultural de Memoria • Cooperativa Textil',
    },
    {
      id: 'dajla',
      name: { es: 'Wilaya de Dajla', en: 'Dakhla Camp', ar: 'ولاية الداخلة', fr: 'Wilaya de Dakhla' },
      focus: {
        es: 'Cooperativas de Curtido Tradicional de Cuero y Huertos Hidropónicos de Mujeres.',
        en: 'Traditional Leather Tanning Cooperatives and Women’s Hydroponic Gardens.',
        ar: 'تعاونيات الدباغة التقليدية للجلود والحدائق الزراعية النسائية.',
        fr: 'Coopératives de Tannerie et Potagers Maraîchers Féminins.',
      },
      stats: '6 Cooperativas Artesanales • Red de Microcréditos',
    },
    {
      id: 'auserd',
      name: { es: 'Wilaya de Auserd', en: 'Auserd Camp', ar: 'ولاية أوسرد', fr: 'Wilaya d’Aousserd' },
      focus: {
        es: 'Comités de Promotoras de Salud Preventiva y Centros de Nutrición Infantil.',
        en: 'Preventive Health Committees and Child Nutrition Distribution Centers.',
        ar: 'لجان الإرشاد الصحي الوقائي ومراكز التغذية التكميلية للأطفال.',
        fr: 'Comités de Santé Préventive et Centres de Nutrition.',
      },
      stats: '12 Puntos de Salud • Red de Promotoras Barriales',
    },
  ];

  const milestones = [
    {
      year: '1974',
      title: {
        es: 'Fundación de la UNMS',
        en: 'Founding of UNMS',
        ar: 'تأسيس الاتحاد الوطني للنساء الصحراويات',
        fr: 'Fondation de l’UNMS',
      },
      desc: {
        es: 'Nace la organización para articular la lucha, alfabetización y derechos de las mujeres.',
        en: 'Created to unite Sahrawi women for self-determination and education.',
        ar: 'تأسيس المنظمة لتوحيد جهود المرأة في التعليم والمقاومة والتحرر.',
        fr: 'Création pour unir les femmes sahraouies pour l’éducation et les droits.',
      },
    },
    {
      year: '1975-76',
      title: {
        es: 'Construcción del Refugio',
        en: 'Building the Camps in Exile',
        ar: 'بناء المخيمات وتنظيم الحياة في اللجوء',
        fr: 'Bâtir les Camps dans l’Exil',
      },
      desc: {
        es: 'Las mujeres organizan la vida comunitaria, la sanidad básica y la acogida de miles de familias.',
        en: 'Women erected the first tent settlements, distribution networks, and health posts.',
        ar: 'أدارت النساء توزيع المؤن، وبناء الخيام والمستوصفات الميدانية الأولى.',
        fr: 'Les femmes organisent les premiers abris, la santé et la solidarité.',
      },
    },
    {
      year: '1978',
      title: {
        es: 'Apertura Escuela 27 de Febrero',
        en: 'Inauguration of 27th Feb School',
        ar: 'افتتاح مدرسة 27 فبراير للتكوين',
        fr: 'Ouverture École 27 Février',
      },
      desc: {
        es: 'Inauguración del mayor centro de formación técnica y pedagógica para mujeres en el desierto.',
        en: 'Inauguration of the largest women’s vocational and literacy academy in the desert.',
        ar: 'تدشين أكبر صرح تعليمي ومهني وسياسي لتأهيل المرأة بالصحراء.',
        fr: 'Ouverture du plus grand centre de formation professionnelle pour femmes.',
      },
    },
    {
      year: '1995-2026',
      title: {
        es: 'Incidencia Global y Futuro',
        en: 'Global Advocacy & Ongoing Mission',
        ar: 'المرافعة الدولية والمسيرة المستمرة',
        fr: 'Plaidoyer Mondial & Action Continue',
      },
      desc: {
        es: 'Participación en Beijing 1995, foros de la ONU, cooperativas sostenibles y energía solar.',
        en: 'Presence at UN forums, establishing sustainable green cooperatives, and digital solidarity.',
        ar: 'المشاركة في المؤتمرات الدولية، وتأسيس التعاونيات الخضراء والتحول الرقمي.',
        fr: 'Présence à l’ONU, essor des coopératives solaires et solidarité numérique.',
      },
    },
  ];

  return (
    <section id="sobre-unms" className="py-16 lg:py-24 bg-[#FAF6EE] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200 inline-block mb-3">
            {language === 'ar' ? 'أرقام وإنجازات' : language === 'fr' ? 'Chiffres & Réalisations' : language === 'en' ? 'Impact & Milestones' : 'Cifras y Realidad'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
            {t.title[language]}
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle[language]}
          </p>
        </div>

        {/* 4 Large Impact Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, idx) => {
            const icons = [Building2, GraduationCap, Sparkles, ShieldCheck];
            const Icon = icons[idx % icons.length];

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-bold text-amber-700">{stat.suffix}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mt-2">
                  {getLocalized(stat.label, language)}
                </h3>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {getLocalized(stat.description, language)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Wilayas (Campamentos) Explorer */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-amber-700" />
                <span>
                  {language === 'ar' ? 'الخريطة المجتمعية' : language === 'fr' ? 'Carte Communautaire' : language === 'en' ? 'Community Map' : 'Mapa Comunitario'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mt-1">
                {language === 'ar'
                  ? 'الولايات الخمس: قلاع الصمود والتسيير الذاتي'
                  : language === 'fr'
                  ? 'Les 5 Wilayas : Bastions d’Autogestion Féminine'
                  : language === 'en'
                  ? 'The 5 Wilayas: Pillars of Self-Governed Communities'
                  : 'Las 5 Wilayas: Autogestión y Organización de Base'}
              </h3>
            </div>

            {/* Wilaya selector pills */}
            <div className="flex flex-wrap gap-2">
              {wilayasData.map((wilaya) => (
                <button
                  key={wilaya.id}
                  onClick={() => setActiveWilaya(wilaya.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeWilaya === wilaya.id
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {getLocalized(wilaya.name, language)}
                </button>
              ))}
            </div>
          </div>

          {/* Active Wilaya Details Banner */}
          {(() => {
            const current = wilayasData.find((w) => w.id === activeWilaya) || wilayasData[0];
            return (
              <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>{getLocalized(current.name, language)}</span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mt-2 font-serif">
                    {getLocalized(current.focus, language)}
                  </h4>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-amber-200 text-xs font-semibold text-stone-700 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{current.stats}</span>
                  </div>
                </div>

                <div className="md:col-span-4 bg-white p-4 rounded-xl border border-stone-200/80 text-xs text-stone-600">
                  <div className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-amber-700" />
                    <span>
                      {language === 'ar' ? 'الهيكل الإداري النسائي' : 'Estructura Democrática'}
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {language === 'ar'
                      ? 'تنتخب النساء لجان الأحياء، الصحة، التعليم والتموين بكل ولاية سنوياً عبر مجالس عامة مباشرة.'
                      : language === 'fr'
                      ? 'Les femmes élisent chaque année les comités de quartier, santé et éducation.'
                      : language === 'en'
                      ? 'Grassroots women councils are democratically elected annually in each camp.'
                      : 'Las mujeres eligen anualmente comités de barrio, sanidad, educación y suministros mediante asambleas directas.'}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 50 Years Milestone Timeline */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'محطات تاريخية' : language === 'fr' ? 'Chronologie Historique' : language === 'en' ? 'Historical Timeline' : 'Hitos Históricos'}
                </span>
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 font-serif mt-1">
                {language === 'ar'
                  ? 'نصف قرن من الكفاح والتنظيم الإنساني'
                  : language === 'fr'
                  ? 'Un Demi-Siècle de Lutte et d’Organisation'
                  : language === 'en'
                  ? 'Half a Century of Solidarity & Self-Reliance'
                  : 'Medio Siglo de Organización Comunitaria'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {milestones.map((m, index) => (
              <div
                key={m.year}
                className="bg-white rounded-2xl p-5 border border-stone-200/80 relative hover:border-amber-400 transition-colors"
              >
                <div className="text-xs font-black text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md inline-block font-mono mb-3">
                  {m.year}
                </div>
                <h4 className="text-sm font-bold text-stone-900 font-serif">
                  {getLocalized(m.title, language)}
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {getLocalized(m.desc, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
