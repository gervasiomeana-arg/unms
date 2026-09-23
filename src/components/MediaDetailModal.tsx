import React, { useEffect } from 'react';
import { X, MapPin, CalendarDays, Film, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { getLocalized } from '../data/translations';
import { TestimonialMedia } from '../types';

export const MediaDetailModal: React.FC<{ media: TestimonialMedia; onClose: () => void }> = ({ media, onClose }) => {
  const { language } = useApp();
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/85 p-4 backdrop-blur-md" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.article role="dialog" aria-modal="true" aria-labelledby="media-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-stone-900 text-white shadow-2xl">
        <div className="relative aspect-video overflow-hidden bg-stone-950">
          {media.mediaUrl && media.type === 'video'
            ? <video className="h-full w-full object-contain" src={media.mediaUrl} controls playsInline poster={media.thumbnailUrl} />
            : <img className="h-full w-full object-cover" src={media.thumbnailUrl} alt={getLocalized(media.title, language)} />}
          <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 rounded-full bg-stone-950/80 p-2.5 text-white hover:bg-stone-800"><X className="h-5 w-5" /></button>
          {!media.mediaUrl && <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-stone-950/80 px-4 py-3 text-sm backdrop-blur-sm"><Film className="mr-2 inline h-4 w-4 text-amber-400" />{language === 'ar' ? 'المادة السمعية البصرية قيد الإعداد · معاينة للمشروع' : language === 'fr' ? 'Contenu audiovisuel à venir · aperçu du projet' : language === 'en' ? 'Audiovisual material coming soon · project preview' : 'Material audiovisual pendiente · vista previa del proyecto'}</div>}
        </div>
        <div className="space-y-6 p-6 sm:p-9">
          <div className="flex flex-wrap gap-4 text-xs text-amber-300"><span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{media.location}</span><span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{media.date}</span></div>
          <h2 id="media-title" className="font-serif text-2xl leading-tight sm:text-3xl">{getLocalized(media.title, language)}</h2>
          <p className="text-sm text-stone-300">{media.speaker} · {getLocalized(media.speakerRole, language)}</p>
          {media.mediaUrl && media.type === 'audio' && <audio src={media.mediaUrl} controls className="w-full" />}
          <blockquote className="border-l-2 border-amber-500 pl-4 font-serif text-lg italic text-amber-100"><Quote className="mb-2 h-5 w-5 text-amber-400" />{getLocalized(media.quote, language)}</blockquote>
          <div className="border-t border-stone-700 pt-6"><h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400">{language === 'ar' ? 'النص' : language === 'fr' ? 'Récit' : language === 'en' ? 'Story' : 'Relato'}</h3><p className="whitespace-pre-line text-sm leading-7 text-stone-300">{getLocalized(media.fullTranscript, language)}</p></div>
        </div>
      </motion.article>
    </div>
  );
};
