import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { BlogPost } from '../types';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Volume2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const BlogSection: React.FC = () => {
  const { language, isRTL, blogPosts, setActiveStoryModal, likePost } = useApp();
  const t = translations.blog;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'education', label: { es: 'Educación', en: 'Education', ar: 'التعليم', fr: 'Éducation' } },
    { id: 'health', label: { es: 'Salud', en: 'Health', ar: 'الصحة', fr: 'Santé' } },
    { id: 'cooperative', label: { es: 'Cooperativas', en: 'Cooperatives', ar: 'التعاونيات', fr: 'Coopératives' } },
    { id: 'advocacy', label: { es: 'Derechos Humanos', en: 'Human Rights', ar: 'حقوق الإنسان', fr: 'Droits Humains' } },
    { id: 'culture', label: { es: 'Cultura', en: 'Culture', ar: 'الثقافة', fr: 'Culture' } },
    { id: 'humanitarian', label: { es: 'Acción humanitaria', en: 'Humanitarian', ar: 'العمل الإنساني', fr: 'Action humanitaire' } },
    { id: 'empowerment', label: { es: 'Autonomía', en: 'Empowerment', ar: 'التمكين', fr: 'Autonomie' } },
  ];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const title = getLocalized(post.title, language).toLowerCase();
    const summary = getLocalized(post.summary, language).toLowerCase();
    const author = post.author.name.toLowerCase();
    const tags = post.tags.join(' ').toLowerCase();

    return title.includes(query) || summary.includes(query) || author.includes(query) || tags.includes(query);
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const showFeatured = Boolean(featuredPost && selectedCategory === 'all' && !searchQuery);
  const visiblePosts = showFeatured ? filteredPosts.filter(post => post.id !== featuredPost.id) : filteredPosts;

  return (
    <section id="historias-blog" className="py-16 lg:py-24 bg-[#FAF6EE] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200 inline-block mb-3">
            {t.tag[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
            {t.title[language]}
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="blog-filters flex flex-nowrap overflow-x-auto md:flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {getLocalized(cat.label, language)}
              </button>
            ))}
          </div>

          {/* Search Input Field */}
          <div className="relative w-full md:w-72">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder[language]}
              className={`w-full py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all ${
                isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
              }`}
            />
          </div>
        </div>

        {/* Featured Post Card (Hero Highlight) if in "all" or matching query */}
        {showFeatured && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-xl transition-shadow grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
              <img
                src={featuredPost.imageUrl}
                alt={getLocalized(featuredPost.title, language)}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-amber-600 text-stone-950 font-extrabold text-xs shadow-md">
                  ★ {language === 'ar' ? 'قصة مميزة' : 'Historia Destacada'}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-200 font-medium text-xs border border-stone-700">
                  {getLocalized(featuredPost.categoryLabel, language)}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredPost.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime} {t.readTime[language]}</span>
                  </span>
                  {featuredPost.wilaya && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-800 font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{featuredPost.wilaya}</span>
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif group-hover:text-amber-700 transition-colors leading-snug">
                  {getLocalized(featuredPost.title, language)}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {getLocalized(featuredPost.summary, language)}
                </p>

                {featuredPost.quote && (
                  <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border-l-3 rtl:border-l-0 rtl:border-r-3 border-amber-600 text-xs italic text-stone-800 font-serif">
                    "{getLocalized(featuredPost.quote, language)}"
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="text-xs text-stone-700 font-medium">
                  {featuredPost.author.name}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStoryModal(featuredPost)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all"
                  >
                    <span>{t.readArticle[language]}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stories Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 text-sm font-medium">
              {language === 'ar'
                ? 'لم يتم العثور على قصص تطابق بحثك'
                : 'No se encontraron historias que coincidan con tu búsqueda.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div
                    onClick={() => setActiveStoryModal(post)}
                    className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <img
                      src={post.imageUrl}
                      alt={getLocalized(post.title, language)}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-stone-800 border border-stone-200 shadow-xs">
                        {getLocalized(post.categoryLabel, language)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-2.5">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} {t.readTime[language]}</span>
                      {post.wilaya && (
                        <>
                          <span>•</span>
                          <span className="text-amber-700 font-semibold">{post.wilaya}</span>
                        </>
                      )}
                    </div>

                    <h3
                      onClick={() => setActiveStoryModal(post)}
                      className="text-lg font-bold text-stone-900 font-serif group-hover:text-amber-700 transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {getLocalized(post.title, language)}
                    </h3>

                    <p className="mt-2.5 text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {getLocalized(post.summary, language)}
                    </p>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 text-[11px] font-bold text-stone-600 hover:text-rose-600 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{post.likes}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveStoryModal(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    <span>{t.readArticle[language]}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
