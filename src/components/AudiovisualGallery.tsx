import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import {
  Play,
  Video,
  Mic,
  Image as ImageIcon,
  MapPin,
  Clock,
  Sparkles,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AudiovisualGallery: React.FC = () => {
  const { language, isRTL, testimonials, setActiveMediaModal } = useApp();
  const t = translations.gallery;

  const [activeType, setActiveType] = useState<string>('all');

  const tabs = [
    { id: 'all', label: t.tabs.all, icon: Sparkles },
    { id: 'video', label: t.tabs.video, icon: Video },
    { id: 'audio', label: t.tabs.audio, icon: Mic },
    { id: 'photo_story', label: t.tabs.photos, icon: ImageIcon },
  ];

  const filteredMedia = testimonials.filter((item) => {
    if (activeType === 'all') return true;
    return item.type === activeType;
  });

  return (
    <section id="galeria-audiovisual" className="py-16 lg:py-24 bg-stone-950 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/30 inline-block mb-3">
            {t.tag[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            {t.title[language]}
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg leading-relaxed">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Media Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeType === tab.id
                    ? 'bg-amber-600 text-stone-950 shadow-lg shadow-amber-900/30 scale-105'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{getLocalized(tab.label, language)}</span>
              </button>
            );
          })}
        </div>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMedia.map((media, idx) => (
            <motion.button
              type="button"
              key={media.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setActiveMediaModal(media)}
              className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between text-left rtl:text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
            >
              <div>
                {/* Thumbnail Frame */}
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
                  <img
                    src={media.thumbnailUrl}
                    alt={getLocalized(media.title, language)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-950/80 backdrop-blur-md text-amber-400 border border-stone-700 flex items-center gap-1.5">
                      {media.type === 'video' && <Video className="w-3.5 h-3.5" />}
                      {media.type === 'audio' && <Mic className="w-3.5 h-3.5" />}
                      {media.type === 'photo_story' && <ImageIcon className="w-3.5 h-3.5" />}
                      <span className="capitalize">{media.type.replace('_', ' ')}</span>
                    </span>
                  </div>

                  {/* Play Button Icon in Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-600/90 group-hover:bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform">
                      {media.mediaUrl ? <Play className={`w-6 h-6 fill-stone-950 ${isRTL ? 'rotate-180' : ''}`} /> : <Quote className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Duration tag at bottom */}
                  {media.duration && media.mediaUrl && (
                    <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-md bg-stone-950/80 text-[11px] font-mono text-stone-300 border border-stone-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{media.duration}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{media.location}</span>
                    <span>•</span>
                    <span className="text-stone-400">{media.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-400 transition-colors leading-snug">
                    {getLocalized(media.title, language)}
                  </h3>

                  <div className="mt-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs italic text-stone-300 font-serif leading-relaxed">
                    "{getLocalized(media.quote, language)}"
                  </div>
                </div>
              </div>

              {/* Bottom Speaker Bar */}
              <div className="px-6 pb-6 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-200">{media.speaker}</div>
                  <div className="text-[11px] text-stone-400">{getLocalized(media.speakerRole, language)}</div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span>{t.viewTranscript[language]}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
