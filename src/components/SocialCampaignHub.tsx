import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { Campaign } from '../types';
import {
  Share2,
  Heart,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Send,
  Sparkles,
  TrendingUp,
  Clock,
  Check,
  Globe,
  Quote,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';

export const SocialCampaignHub: React.FC = () => {
  const {
    language,
    isRTL,
    campaigns,
    solidarityMessages,
    addSolidarityMessage,
    likeSolidarityMessage,
    openDonationModal,
    showToast,
  } = useApp();

  const t = translations.social;

  // New message form state
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShareCampaign = (campaign: Campaign, platform: string) => {
    const url = window.location.href;
    const title = getLocalized(campaign.title, language);
    const text = `${title} ${campaign.hashtag} - Apoya a la Unión Nacional de Mujeres Saharauis:`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} ${url}`);
      setCopiedId(campaign.id);
      showToast(t.linkCopied[language], 'success');
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      showToast(
        language === 'ar' ? 'يرجى إدخال اسمك ورسالة التضامن' : 'Por favor completa tu nombre y mensaje.',
        'warning'
      );
      return;
    }

    addSolidarityMessage({
      author: author.trim(),
      country: country.trim() || (language === 'ar' ? 'دولي' : 'Internacional'),
      message: message.trim(),
    });

    setAuthor('');
    setCountry('');
    setMessage('');
  };

  return (
    <section id="campanas-solidaridad" className="py-16 lg:py-24 bg-white text-stone-900 border-b border-stone-200">
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
            {t.subtitle[language]}
          </p>
        </div>

        {/* Active Humanitarian Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {campaigns.map((camp, idx) => {
            const percent = Math.min(Math.round((camp.currentAmountEUR / camp.targetGoalEUR) * 100), 100);

            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-stone-50 rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Campaign Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img
                      src={camp.imageUrl}
                      alt={getLocalized(camp.title, language)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                    {camp.urgent && (
                      <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-black shadow-md animate-pulse">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'حملة عاجلة' : 'Urgente'}</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-stone-900/80 backdrop-blur-md rounded-md text-[11px] font-mono text-amber-300 border border-stone-700">
                      {camp.hashtag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                      {getLocalized(camp.title, language)}
                    </h3>

                    <p className="mt-2.5 text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {getLocalized(camp.description, language)}
                    </p>

                    {/* Progress Goal */}
                    <div className="mt-6 pt-4 border-t border-stone-200/80">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                        <span className="text-amber-800 font-bold">
                          €{camp.currentAmountEUR.toLocaleString()}
                        </span>
                        <span className="text-stone-500">
                          {language === 'ar' ? 'الهدف:' : 'Meta:'} €{camp.targetGoalEUR.toLocaleString()}
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-bold text-stone-700">{percent}% {language === 'ar' ? 'مكتمل' : 'recaudado'}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{camp.daysLeft} {language === 'ar' ? 'يوماً متبقياً' : 'días restantes'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Donate + Direct Social Share */}
                <div className="p-6 pt-0 space-y-3">
                  <button
                    onClick={() => openDonationModal({ cause: camp.category })}
                    className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-stone-950" />
                    <span>
                      {language === 'ar' ? 'دعم الحملة الآن' : 'Apoyar esta Campaña'}
                    </span>
                  </button>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                    <span className="text-[11px] text-stone-500 font-medium">
                      {t.shareTo[language]}:
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleShareCampaign(camp, 'whatsapp')}
                        className="p-1.5 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShareCampaign(camp, 'twitter')}
                        className="p-1.5 hover:bg-sky-100 text-sky-700 rounded-lg transition-colors"
                        title="X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShareCampaign(camp, 'telegram')}
                        className="p-1.5 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                        title="Telegram"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleShareCampaign(camp, 'copy')}
                        className="p-1.5 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
                        title="Copiar enlace"
                      >
                        {copiedId === camp.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* International Solidarity Wall (Muro de Solidaridad) */}
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-10 border border-stone-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left form to send message */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{t.solidarityWallTitle[language]}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                {t.sendSolidarityMsg[language]}
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {language === 'ar'
                  ? 'انشر رسالة دعم ومؤازرة لتصل مباشرة إلى لجان ومراكز النساء الصحراويات بالمخيمات.'
                  : 'Envía tus palabras de aliento y solidaridad a las mujeres saharauis en los campamentos.'}
              </p>

              <form onSubmit={handlePostMessage} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.yourName[language]} *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ej. Red de Mujeres Solidarias"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.yourCountry[language]}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Ej. España / México / France"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'ar' ? 'نص الرسالة' : 'Mensaje de Solidaridad'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.yourMessage[language]}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendBtn[language]}</span>
                </button>
              </form>
            </div>

            {/* Right Feed of Solidarity Messages */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-300/60">
                <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-700" />
                  <span>{solidarityMessages.length} {language === 'ar' ? 'رسائل دعم دولية' : 'Mensajes de Apoyo Global'}</span>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto space-y-4 pr-1">
                {solidarityMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-stone-900">{msg.author}</div>
                        <div className="text-[11px] text-amber-800 font-semibold">{msg.country}</div>
                      </div>
                      <span className="text-[10px] text-stone-400">{msg.date}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic">
                      "{msg.message}"
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end">
                      <button
                        onClick={() => likeSolidarityMessage(msg.id)}
                        className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-600" />
                        <span>{msg.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
