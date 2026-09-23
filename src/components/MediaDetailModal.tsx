import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { TestimonialMedia } from '../types';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Share2,
  Check,
  FileText,
  Video,
  Mic,
  Image as ImageIcon,
  Quote,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface MediaDetailModalProps {
  media: TestimonialMedia;
  onClose: () => void;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ media, onClose }) => {
  const { language, isRTL, showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'transcript'>('player');

  const handleCopyShare = () => {
    navigator.clipboard.writeText(`${getLocalized(media.title, language)} - ${window.location.href}`);
    setCopied(true);
    showToast(translations.social.linkCopied[language], 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col border border-stone-800"
      >
        {/* Top Floating Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              {media.type === 'video' && <Video className="w-3.5 h-3.5" />}
              {media.type === 'audio' && <Mic className="w-3.5 h-3.5" />}
              {media.type === 'photo_story' && <ImageIcon className="w-3.5 h-3.5" />}
              <span className="capitalize">{media.type.replace('_', ' ')}</span>
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{media.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="Compartir testimonio"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Media Player Showcase Stage */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl group flex items-center justify-center">
            <img
              src={media.thumbnailUrl}
              alt={getLocalized(media.title, language)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            {/* Simulated Live Playback Overlay */}
            {isPlaying && (
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2 px-3 py-1 bg-stone-900/90 border border-stone-700 rounded-full text-xs text-amber-400 font-semibold shadow-md">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>{media.type === 'video' ? 'Reproduciendo en Alta Definición' : 'Audio Transmitiendo'}</span>
              </div>
            )}

            {/* Center Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative z-10 w-20 h-20 rounded-full bg-amber-600/90 hover:bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-stone-950" />
              ) : (
                <Play className={`w-8 h-8 fill-stone-950 ${isRTL ? 'rotate-180' : ''}`} />
              )}
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>{media.duration || '04:12'}</span>
              </div>

              {/* Progress bar simulation */}
              <div className="flex-1 mx-4 h-1.5 bg-stone-700 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-amber-500 rounded-full w-2/5 animate-pulse" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="hidden sm:inline font-mono">1080p HD</span>
              </div>
            </div>
          </div>

          {/* Title and Speaker info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {getLocalized(media.title, language)}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-400">
              <span className="text-amber-400 font-bold text-sm">{media.speaker}</span>
              <span>•</span>
              <span className="text-stone-300">{getLocalized(media.speakerRole, language)}</span>
              <span>•</span>
              <span>{media.date}</span>
            </div>
          </div>

          {/* Quote Banner */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 flex gap-3 items-start">
            <Quote className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-serif italic leading-relaxed text-amber-100">
                "{getLocalized(media.quote, language)}"
              </p>
              <span className="block mt-2 text-xs font-semibold text-stone-400">
                — {media.speaker} ({media.location})
              </span>
            </div>
          </div>

          {/* Multilingual Full Transcript Section */}
          <div className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              <FileText className="w-4 h-4" />
              <span>
                {language === 'ar'
                  ? 'النص الكامل للشهادة والتسجيل'
                  : language === 'fr'
                  ? 'Transcription Complète du Témoignage'
                  : language === 'en'
                  ? 'Full Testimonial Transcript'
                  : 'Transcripción Completa del Testimonio'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
              {getLocalized(media.fullTranscript, language)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {media.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-800 border border-stone-700 text-stone-300 rounded-lg text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
