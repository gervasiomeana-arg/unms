import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { BlogPost } from '../types';
import {
  X,
  Clock,
  Calendar,
  MapPin,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Quote,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryDetailModalProps {
  story: BlogPost;
  onClose: () => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ story, onClose }) => {
  const { language, isRTL, likePost, openDonationModal, showToast } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const t = translations.blog;

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}${window.location.pathname}#historia-${story.id}`;
    const title = getLocalized(story.title, language);
    const hashtags = 'MujeresSaharauis,UNMS,SaharaLibre';

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${title} - ${url}`);
      setCopied(true);
      showToast(translations.social.linkCopied[language], 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${getLocalized(story.title, language)}. ${getLocalized(story.summary, language)}. ${getLocalized(story.content, language)}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'es-ES';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
        showToast(
          language === 'ar'
            ? 'بدء تشغيل السرد الصوتي للقصة'
            : language === 'fr'
            ? 'Lecture du récit audio en cours'
            : language === 'en'
            ? 'Playing story audio narration'
            : 'Reproduciendo narración de audio',
          'info'
        );
      }
    } else {
      showToast(language === 'ar' ? 'القراءة الصوتية غير متاحة في هذا المتصفح.' : language === 'fr' ? 'La lecture audio n’est pas disponible dans ce navigateur.' : language === 'en' ? 'Audio narration is unavailable in this browser.' : 'La narración de audio no está disponible en este navegador.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col border border-stone-200"
      >
        {/* Modal Top Floating Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
              {getLocalized(story.categoryLabel, language)}
            </span>
            {story.wilaya && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>{story.wilaya}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2.5 py-1 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
              title="Cambiar tamaño de texto"
            >
              A{fontSize === 'normal' ? '+' : '-'}
            </button>

            {/* Audio narrator button */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-amber-600 text-white shadow-sm animate-pulse'
                  : 'bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-800'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {isPlayingAudio
                  ? (language === 'ar' ? 'صوت قيد التشغيل' : 'Reproduciendo')
                  : t.listenAudio[language]}
              </span>
            </button>

            {/* Close modal button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-6">
          {/* Header image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900 mb-6 shadow-md">
            <img
              src={story.imageUrl}
              alt={getLocalized(story.title, language)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium">
              {story.author.name} • {getLocalized(story.author.role, language)}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
            {getLocalized(story.title, language)}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-4 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{story.readTime} {t.readTime[language]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-700">{story.author.name}</span>
              <span>({getLocalized(story.author.role, language)})</span>
            </div>
          </div>

          {/* Audio narration player banner if active */}
          {isPlayingAudio && (
            <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center animate-spin">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-950">
                    {language === 'ar' ? 'البث الصوتي المباشر للمقال' : 'Narración Sonora Comunitaria'}
                  </div>
                  <div className="text-[11px] text-amber-800">
                    {language === 'ar' ? 'بصوت أرشيف الذاكرة الشفوية للاتحاد' : 'Voz del Archivo de Memoria Oral UNMS'}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleAudio}
                className="text-xs font-bold text-amber-800 underline hover:text-amber-950"
              >
                {language === 'ar' ? 'إيقاف' : 'Detener'}
              </button>
            </div>
          )}

          {/* Story Quote Callout if available */}
          {story.quote && (
            <div className="my-6 p-6 rounded-2xl bg-[#FAF6EE] border-l-4 rtl:border-l-0 rtl:border-r-4 border-amber-600 flex gap-4 items-start">
              <Quote className="w-8 h-8 text-amber-600 shrink-0 mt-0.5 opacity-60" />
              <div>
                <p className="text-base sm:text-lg font-serif italic text-stone-900 leading-relaxed font-medium">
                  "{getLocalized(story.quote, language)}"
                </p>
                <span className="block mt-2 text-xs font-bold text-amber-800">
                  — {story.author.name}
                </span>
              </div>
            </div>
          )}

          {/* Story Full Content */}
          <div
            className={`mt-6 text-stone-800 leading-relaxed whitespace-pre-line ${
              fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base'
            }`}
          >
            {getLocalized(story.content, language)}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Actions: Likes, Social Share, Direct Donate CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => likePost(story.id)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-300 rounded-xl text-xs font-bold text-stone-700 hover:text-rose-600 transition-colors shadow-2xs"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{story.likes} {language === 'ar' ? 'إعجاب' : 'Apoyos'}</span>
              </button>

              {/* Social sharing tools */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-2 bg-white hover:bg-emerald-50 rounded-lg border border-stone-200 text-emerald-600 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-white hover:bg-sky-50 rounded-lg border border-stone-200 text-sky-600 transition-colors"
                  title="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-white hover:bg-blue-50 rounded-lg border border-stone-200 text-blue-600 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 text-stone-700 transition-colors"
                  title="Copiar enlace"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct Support Button */}
            <button
              onClick={() => {
                onClose();
                openDonationModal({ cause: story.category === 'education' ? 'education' : story.category === 'health' ? 'health' : 'general' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>
                {language === 'ar' ? 'دعم هذا المشروع التنموي' : 'Apoyar este Proyecto'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
