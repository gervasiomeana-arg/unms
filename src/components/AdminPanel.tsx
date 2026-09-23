import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { IMAGES } from '../data/initialData';
import { BlogPost, TestimonialMedia, Campaign, Language } from '../types';
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  Send,
  Download,
  RefreshCw,
  X,
  Video,
  Heart,
  Bell,
  CheckCircle,
  BarChart3,
  Globe,
  Sparkles,
  Flame,
  MessageSquare,
  Image as ImageIcon,
  Clock,
  MapPin,
  Check,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPanel: React.FC = () => {
  const {
    language,
    isRTL,
    isAdminOpen,
    setIsAdminOpen,
    adminAuthenticated,
    loginAdmin,
    logoutAdmin,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    donations,
    solidarityMessages,
    deleteSolidarityMessage,
    notifications,
    broadcastNotification,
    deleteNotification,
    resetToDefaultData,
    showToast,
  } = useApp();

  const t = translations.admin;

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'articles' | 'gallery' | 'campaigns' | 'messages' | 'push' | 'donations'
  >('overview');

  // Story Form State
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [currentStory, setCurrentStory] = useState<Partial<BlogPost> | null>(null);
  const [storyFormLang, setStoryFormLang] = useState<Language>('es');

  // Media Form State
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<Partial<TestimonialMedia> | null>(null);
  const [mediaFormLang, setMediaFormLang] = useState<Language>('es');

  // Campaign Form State
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<Campaign> | null>(null);
  const [campaignFormLang, setCampaignFormLang] = useState<Language>('es');

  // Push Broadcast Form State
  const [pushTitleEs, setPushTitleEs] = useState('');
  const [pushTitleAr, setPushTitleAr] = useState('');
  const [pushTitleEn, setPushTitleEn] = useState('');
  const [pushTitleFr, setPushTitleFr] = useState('');
  const [pushMsgEs, setPushMsgEs] = useState('');
  const [pushMsgAr, setPushMsgAr] = useState('');
  const [pushMsgEn, setPushMsgEn] = useState('');
  const [pushMsgFr, setPushMsgFr] = useState('');
  const [pushType, setPushType] = useState<'urgent' | 'event' | 'campaign' | 'news'>('urgent');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passcode);
  };

  // Broadcast push action
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitleEs.trim() || !pushMsgEs.trim()) {
      showToast('Por favor completa al menos el título y mensaje en español', 'warning');
      return;
    }

    broadcastNotification({
      title: {
        es: pushTitleEs,
        en: pushTitleEn || pushTitleEs,
        ar: pushTitleAr || pushTitleEs,
        fr: pushTitleFr || pushTitleEs,
      },
      message: {
        es: pushMsgEs,
        en: pushMsgEn || pushMsgEs,
        ar: pushMsgAr || pushMsgEs,
        fr: pushMsgFr || pushMsgEs,
      },
      type: pushType,
    });

    setPushTitleEs('');
    setPushTitleAr('');
    setPushTitleEn('');
    setPushTitleFr('');
    setPushMsgEs('');
    setPushMsgAr('');
    setPushMsgEn('');
    setPushMsgFr('');
  };

  // Story submission
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStory?.title?.es) {
      showToast('Se requiere al menos el título en español', 'warning');
      return;
    }

    const title = currentStory.title;
    const summary = currentStory.summary || { es: '', en: '', ar: '', fr: '' };
    const content = currentStory.content || { es: '', en: '', ar: '', fr: '' };

    const category = currentStory.category || 'humanitarian';
    const categoryLabels: Record<string, { es: string; en: string; ar: string; fr: string }> = {
      humanitarian: { es: 'Humanitaria', en: 'Humanitarian', ar: 'إنسانية', fr: 'Humanitaire' },
      empowerment: { es: 'Empoderamiento', en: 'Empowerment', ar: 'تمكين المرأة', fr: 'Autonomisation' },
      education: { es: 'Educación', en: 'Education', ar: 'التعليم', fr: 'Éducation' },
      health: { es: 'Salud', en: 'Health', ar: 'الصحة', fr: 'Santé' },
      culture: { es: 'Cultura', en: 'Culture', ar: 'التراث والذاكرة', fr: 'Culture' },
      advocacy: { es: 'Incidencia', en: 'Advocacy', ar: 'المرافعة الدولية', fr: 'Plaidoyer' },
      cooperative: { es: 'Cooperativas', en: 'Cooperatives', ar: 'التعاونيات', fr: 'Coopératives' },
    };

    if (currentStory.id) {
      updateBlogPost(currentStory as BlogPost);
    } else {
      addBlogPost({
        title: {
          es: title.es,
          en: title.en || title.es,
          ar: title.ar || title.es,
          fr: title.fr || title.es,
        },
        summary: {
          es: summary.es || title.es,
          en: summary.en || summary.es || title.es,
          ar: summary.ar || summary.es || title.es,
          fr: summary.fr || summary.es || title.es,
        },
        content: {
          es: content.es || summary.es || title.es,
          en: content.en || content.es || summary.es || title.es,
          ar: content.ar || content.es || summary.es || title.es,
          fr: content.fr || content.es || summary.es || title.es,
        },
        category,
        categoryLabel: categoryLabels[category] || categoryLabels.humanitarian,
        author: currentStory.author || {
          name: 'Comité UNMS',
          role: { es: 'Coordinación', en: 'Coordination', ar: 'التنسيق', fr: 'Coordination' },
        },
        date: currentStory.date || new Date().toISOString().split('T')[0],
        readTime: currentStory.readTime || '4',
        imageUrl: currentStory.imageUrl || IMAGES.hero,
        featured: currentStory.featured || false,
        tags: currentStory.tags && currentStory.tags.length > 0 ? currentStory.tags : ['UNMS', 'Solidaridad'],
        wilaya: currentStory.wilaya || 'Smara',
      });
    }

    setIsEditingStory(false);
    setCurrentStory(null);
  };

  // Media submission
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMedia?.title?.es || !currentMedia?.speaker) {
      showToast('Se requiere título y nombre del testimonio', 'warning');
      return;
    }

    const title = currentMedia.title;
    const quote = currentMedia.quote || { es: '', en: '', ar: '', fr: '' };
    const transcript = currentMedia.fullTranscript || { es: '', en: '', ar: '', fr: '' };
    const speakerRole = currentMedia.speakerRole || {
      es: 'Portavoz Comunitaria',
      en: 'Community Spokesperson',
      ar: 'متحدثة مجتمعية',
      fr: 'Porte-parole communautaire',
    };

    const photoUrls = currentMedia.type === 'photo_story' ? currentMedia.photoUrls?.map(url => url.trim()).filter(Boolean) : undefined;
    if (currentMedia.id) {
      updateTestimonial({ ...currentMedia, photoUrls, mediaUrl: currentMedia.mediaUrl?.trim() || undefined } as TestimonialMedia);
    } else {
      addTestimonial({
        type: currentMedia.type || 'video',
        title: {
          es: title.es,
          en: title.en || title.es,
          ar: title.ar || title.es,
          fr: title.fr || title.es,
        },
        speaker: currentMedia.speaker || '',
        speakerRole: {
          es: speakerRole.es,
          en: speakerRole.en || speakerRole.es,
          ar: speakerRole.ar || speakerRole.es,
          fr: speakerRole.fr || speakerRole.es,
        },
        location: currentMedia.location || 'Wilaya de Smara',
        duration: currentMedia.duration || '04:15',
        thumbnailUrl: currentMedia.thumbnailUrl || IMAGES.weaving,
        mediaUrl: currentMedia.mediaUrl?.trim() || undefined,
        photoUrls,
        quote: {
          es: quote.es || title.es,
          en: quote.en || quote.es || title.es,
          ar: quote.ar || quote.es || title.es,
          fr: quote.fr || quote.es || title.es,
        },
        fullTranscript: {
          es: transcript.es || quote.es || title.es,
          en: transcript.en || transcript.es || quote.es || title.es,
          ar: transcript.ar || transcript.es || quote.es || title.es,
          fr: transcript.fr || transcript.es || quote.es || title.es,
        },
        date: currentMedia.date || new Date().toISOString().split('T')[0],
        tags: currentMedia.tags && currentMedia.tags.length > 0 ? currentMedia.tags : ['Testimonio', 'UNMS'],
        featured: currentMedia.featured || false,
      });
    }

    setIsEditingMedia(false);
    setCurrentMedia(null);
  };

  // Campaign submission
  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCampaign?.title?.es) {
      showToast('Se requiere título en español para la campaña', 'warning');
      return;
    }

    const title = currentCampaign.title;
    const desc = currentCampaign.description || { es: '', en: '', ar: '', fr: '' };

    if (currentCampaign.id) {
      updateCampaign(currentCampaign as Campaign);
    } else {
      addCampaign({
        title: {
          es: title.es,
          en: title.en || title.es,
          ar: title.ar || title.es,
          fr: title.fr || title.es,
        },
        description: {
          es: desc.es || title.es,
          en: desc.en || desc.es || title.es,
          ar: desc.ar || desc.es || title.es,
          fr: desc.fr || desc.es || title.es,
        },
        targetGoalEUR: Number(currentCampaign.targetGoalEUR) || 5000,
        daysLeft: Number(currentCampaign.daysLeft) || 30,
        category: currentCampaign.category || 'health',
        hashtag: currentCampaign.hashtag || '#UNMS_Solidaridad',
        imageUrl: currentCampaign.imageUrl || IMAGES.health,
        urgent: currentCampaign.urgent ?? false,
      });
    }

    setIsEditingCampaign(false);
    setCurrentCampaign(null);
  };

  // Export donations CSV
  const handleExportDonationsCSV = () => {
    const headers = 'ID,Donante,Email,Monto,Moneda,Frecuencia,Causa,Fecha,Metodo,Certificado\n';
    const rows = donations
      .map(
        (d) =>
          `"${d.id}","${d.donorName}","${d.email}",${d.amount},"${d.currency}","${d.frequency}","${d.cause}","${d.date}","${d.paymentMethod}","${d.certificateId}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `donaciones_unms_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo CSV de donaciones exportado con éxito', 'success');
  };

  const totalDonationsAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  const presetImages = [
    { label: 'Hero / Asambleas', url: IMAGES.hero },
    { label: 'Cooperativa Textil', url: IMAGES.weaving },
    { label: 'Educación 27 Feb', url: IMAGES.education },
    { label: 'Salud Materno-Infantil', url: IMAGES.health },
    { label: 'Mesa Diplomática / ONU', url: IMAGES.advocacy },
    { label: 'Cultura del Té / Haul', url: IMAGES.culture },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl bg-stone-900 text-stone-100 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col border border-stone-800"
      >
        {/* Admin Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                {t.title[language]}
              </h2>
              <p className="text-xs text-amber-300">
                {language === 'ar' ? 'لوحة تجريبية · التغييرات محفوظة في هذا المتصفح فقط' : language === 'fr' ? 'Panneau de démonstration · modifications locales' : language === 'en' ? 'Demo panel · changes are local to this browser' : 'Panel de demostración · cambios solo en este navegador'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'إغلاق اللوحة' : language === 'fr' ? 'Fermer' : language === 'en' ? 'Close panel' : 'Cerrar panel'}</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 p-6">
          {!adminAuthenticated ? (
            /* ================= LOGIN FORM ================= */
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  {language === 'ar'
                    ? 'تسجيل الدخول إلى لوحة الإدارة'
                    : language === 'fr'
                    ? 'Accès au Panneau de Gestion'
                    : language === 'en'
                    ? 'Admin Panel Access'
                    : 'Acceso al Panel de Gestión'}
                </h3>
                <p className="text-xs text-stone-400 mt-2">
                  {language === 'ar'
                    ? 'معاينة لوحة الإدارة في هذا المتصفح فقط'
                    : language === 'fr'
                    ? 'Aperçu local du panneau de gestion.'
                    : language === 'en'
                    ? 'Local preview of the content panel.'
                    : 'Vista previa local del panel de contenidos.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'معاينة'
                      : language === 'fr'
                      ? 'Aperçu'
                      : language === 'en'
                      ? 'Preview'
                      : 'Vista previa'
                  }
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-sm text-center text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  {language === 'ar'
                    ? 'دخول'
                    : language === 'fr'
                    ? 'Accéder'
                    : language === 'en'
                    ? 'Sign In'
                    : 'Acceder al Panel'}
                </button>
              </form>
            </div>
          ) : (
            /* ================= AUTHENTICATED ADMIN DASHBOARD ================= */
            <div className="space-y-6">
              {/* Navigation Tabs Bar */}
              <div className="admin-tabs flex flex-nowrap overflow-x-auto sm:flex-wrap items-center gap-2 border-b border-stone-800 pb-3">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.overview[language]}
                </button>
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'articles'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.articles[language]} ({blogPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.gallery[language]} ({testimonials.length})
                </button>
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'campaigns'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.campaigns[language]} ({campaigns.length})
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'messages'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.solidarityMessages[language]} ({solidarityMessages.length})
                </button>
                <button
                  onClick={() => setActiveTab('push')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'push'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.pushBroadcast[language]} ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'donations'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.donations[language]} (€{totalDonationsAmount.toLocaleString()})
                </button>
              </div>

              {/* TAB 1: OVERVIEW METRICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>{t.totalDonations[language]}</span>
                        <Heart className="w-4 h-4 text-rose-500" />
                      </div>
                      <div className="text-2xl font-bold text-white font-serif">
                        €{totalDonationsAmount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        {donations.length} registros de ejemplo
                      </div>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>{t.publishedStoriesCount[language]}</span>
                        <Globe className="w-4 h-4 text-amber-500" />
                      </div>
                      <div className="text-2xl font-bold text-white font-serif">
                        {blogPosts.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Crónicas y relatos activos
                      </div>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Testimonios Grabados</span>
                        <Video className="w-4 h-4 text-sky-500" />
                      </div>
                      <div className="text-2xl font-bold text-white font-serif">
                        {testimonials.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Vídeos y audio en archivo
                      </div>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
                      <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
                        <span>Campañas Activas</span>
                        <Flame className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-white font-serif">
                        {campaigns.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Proyectos humanitarios
                      </div>
                    </div>
                  </div>

                  {/* Administrative Quick Actions */}
                  <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Acciones Rápidas del Administrador</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setCurrentStory({
                            title: { es: '', en: '', ar: '', fr: '' },
                            summary: { es: '', en: '', ar: '', fr: '' },
                            content: { es: '', en: '', ar: '', fr: '' },
                            category: 'humanitarian',
                            author: {
                              name: 'Comité UNMS',
                              role: { es: 'Coordinación', en: 'Coordination', ar: 'التنسيق', fr: 'Coordination' },
                            },
                            tags: ['UNMS'],
                            wilaya: 'Smara',
                          });
                          setIsEditingStory(true);
                        }}
                        className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 text-left rtl:text-right flex items-center gap-3 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white">{t.addNewStory[language]}</div>
                          <div className="text-[11px] text-stone-400">Crear crónica multilingüe</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentMedia({
                            type: 'video',
                            title: { es: '', en: '', ar: '', fr: '' },
                            speaker: '',
                            speakerRole: { es: '', en: '', ar: '', fr: '' },
                            quote: { es: '', en: '', ar: '', fr: '' },
                            fullTranscript: { es: '', en: '', ar: '', fr: '' },
                            location: 'Wilaya de Smara',
                            tags: ['Testimonio'],
                          });
                          setIsEditingMedia(true);
                        }}
                        className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 text-left rtl:text-right flex items-center gap-3 transition-colors"
                      >
                        <Video className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white">{t.addNewMedia[language]}</div>
                          <div className="text-[11px] text-stone-400">Subir audio o vídeo</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentCampaign({
                            title: { es: '', en: '', ar: '', fr: '' },
                            description: { es: '', en: '', ar: '', fr: '' },
                            targetGoalEUR: 10000,
                            daysLeft: 45,
                            category: 'health',
                            hashtag: '#SaludSaharaui',
                            urgent: true,
                          });
                          setIsEditingCampaign(true);
                        }}
                        className="p-3 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 text-left rtl:text-right flex items-center gap-3 transition-colors"
                      >
                        <Flame className="w-4 h-4 text-rose-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white">Nueva Campaña</div>
                          <div className="text-[11px] text-stone-400">Lanzar recaudación urgente</div>
                        </div>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                      <span>Restablecer estado de demostración predeterminado:</span>
                      <button
                        onClick={() => {
                          if (window.confirm('¿Seguro que deseas restablecer todos los datos iniciales?')) {
                            resetToDefaultData();
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-rose-950 text-rose-300 border border-stone-800 flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Restablecer Datos</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTICLES MANAGEMENT */}
              {activeTab === 'articles' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {t.tabs.articles[language]} ({blogPosts.length})
                    </h3>
                    <button
                      onClick={() => {
                        setCurrentStory({
                          title: { es: '', en: '', ar: '', fr: '' },
                          summary: { es: '', en: '', ar: '', fr: '' },
                          content: { es: '', en: '', ar: '', fr: '' },
                          category: 'humanitarian',
                          author: {
                            name: 'Comité UNMS',
                            role: { es: 'Coordinación', en: 'Coordination', ar: 'التنسيق', fr: 'Coordination' },
                          },
                          tags: ['UNMS'],
                          wilaya: 'Smara',
                        });
                        setIsEditingStory(true);
                      }}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t.addNewStory[language]}</span>
                    </button>
                  </div>

                  {/* List of articles */}
                  <div className="divide-y divide-stone-800 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-900/50">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-white">
                              {getLocalized(post.title, language)}
                            </div>
                            <div className="text-[11px] text-stone-400">
                              {post.author.name} • {post.date} • {post.wilaya}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCurrentStory(post);
                              setIsEditingStory(true);
                            }}
                            className="p-2 hover:bg-stone-800 text-stone-300 hover:text-amber-400 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBlogPost(post.id)}
                            className="p-2 hover:bg-stone-800 text-stone-300 hover:text-rose-400 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {t.tabs.gallery[language]} ({testimonials.length})
                    </h3>
                    <button
                      onClick={() => {
                        setCurrentMedia({
                          type: 'video',
                          title: { es: '', en: '', ar: '', fr: '' },
                          speaker: '',
                          speakerRole: { es: '', en: '', ar: '', fr: '' },
                          quote: { es: '', en: '', ar: '', fr: '' },
                          fullTranscript: { es: '', en: '', ar: '', fr: '' },
                          location: 'Wilaya de Smara',
                          tags: ['Testimonio'],
                        });
                        setIsEditingMedia(true);
                      }}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t.addNewMedia[language]}</span>
                    </button>
                  </div>

                  {/* List of testimonials */}
                  <div className="divide-y divide-stone-800 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
                    {testimonials.map((media) => (
                      <div key={media.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-900/50">
                        <div className="flex items-center gap-3">
                          <img
                            src={media.thumbnailUrl}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-white">
                              {getLocalized(media.title, language)}
                            </div>
                            <div className="text-[11px] text-stone-400">
                              {media.speaker} • {media.location} • {media.type}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCurrentMedia(media);
                              setIsEditingMedia(true);
                            }}
                            className="p-2 hover:bg-stone-800 text-stone-300 hover:text-amber-400 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(media.id)}
                            className="p-2 hover:bg-stone-800 text-stone-300 hover:text-rose-400 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CAMPAIGNS MANAGEMENT */}
              {activeTab === 'campaigns' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {t.tabs.campaigns[language]} ({campaigns.length})
                    </h3>
                    <button
                      onClick={() => {
                        setCurrentCampaign({
                          title: { es: '', en: '', ar: '', fr: '' },
                          description: { es: '', en: '', ar: '', fr: '' },
                          targetGoalEUR: 10000,
                          daysLeft: 45,
                          category: 'health',
                          hashtag: '#SaludSaharaui',
                          urgent: false,
                        });
                        setIsEditingCampaign(true);
                      }}
                      className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nueva Campaña</span>
                    </button>
                  </div>

                  {/* List of campaigns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaigns.map((camp) => {
                      const percent = Math.min(
                        100,
                        Math.round((camp.currentAmountEUR / camp.targetGoalEUR) * 100)
                      );
                      return (
                        <div
                          key={camp.id}
                          className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={camp.imageUrl}
                              alt=""
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-white truncate">
                                  {getLocalized(camp.title, language)}
                                </h4>
                                {camp.urgent && (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                                    Urgente
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                                {camp.hashtag}
                              </div>
                              <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                                {getLocalized(camp.description, language)}
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                              <span>
                                €{camp.currentAmountEUR.toLocaleString()} / €{camp.targetGoalEUR.toLocaleString()}
                              </span>
                              <span>{percent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-900 text-xs">
                            <span className="text-stone-500 text-[11px]">{camp.daysLeft} días restantes</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setCurrentCampaign(camp);
                                  setIsEditingCampaign(true);
                                }}
                                className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-amber-400 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteCampaign(camp.id)}
                                className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-rose-400 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: SOLIDARITY WALL MESSAGES MODERATION */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {t.tabs.solidarityMessages[language]} ({solidarityMessages.length})
                    </h3>
                  </div>

                  <div className="divide-y divide-stone-800 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden">
                    {solidarityMessages.map((msg) => (
                      <div key={msg.id} className="p-4 flex items-start justify-between gap-4 hover:bg-stone-900/40">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-white">{msg.author}</span>
                            <span className="text-amber-400 font-medium">({msg.country})</span>
                            <span className="text-stone-500 text-[11px]">• {msg.date}</span>
                            <span className="text-rose-400 text-[11px] flex items-center gap-0.5">
                              <Heart className="w-3 h-3 fill-rose-500" /> {msg.likes}
                            </span>
                          </div>
                          <p className="text-xs text-stone-300 italic font-serif leading-relaxed">
                            "{msg.message}"
                          </p>
                        </div>

                        <button
                          onClick={() => deleteSolidarityMessage(msg.id)}
                          className="p-2 hover:bg-stone-800 text-stone-400 hover:text-rose-400 rounded-lg transition-colors shrink-0"
                          title="Eliminar mensaje del muro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: PUSH NOTIFICATIONS BROADCASTER */}
              {activeTab === 'push' && (
                <div className="space-y-6">
                  <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      <Bell className="w-4 h-4" />
                      <span>{t.tabs.pushBroadcast[language]}</span>
                    </div>
                    <p className="text-xs text-stone-400 mb-6">
                      Crea una alerta de demostración visible únicamente en este navegador.
                    </p>

                    <form onSubmit={handleBroadcast} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">
                            Título (Español) *
                          </label>
                          <input
                            type="text"
                            required
                            value={pushTitleEs}
                            onChange={(e) => setPushTitleEs(e.target.value)}
                            placeholder="Ej. Convocatoria Solidaria Internacional"
                            className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">
                            العنوان (بالعربية)
                          </label>
                          <input
                            type="text"
                            value={pushTitleAr}
                            onChange={(e) => setPushTitleAr(e.target.value)}
                            placeholder="مثال: نداء تضامني دولي"
                            className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">
                            Mensaje (Español) *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={pushMsgEs}
                            onChange={(e) => setPushMsgEs(e.target.value)}
                            placeholder="Detalles de la alerta o evento..."
                            className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">
                            نص الإشعار (بالعربية)
                          </label>
                          <textarea
                            rows={3}
                            value={pushMsgAr}
                            onChange={(e) => setPushMsgAr(e.target.value)}
                            placeholder="تفاصيل التنبيه أو الفعالية..."
                            className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white text-right resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <select
                          value={pushType}
                          onChange={(e) => setPushType(e.target.value as any)}
                          className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-300"
                        >
                          <option value="urgent">Urgente / Humanitaria</option>
                          <option value="event">Evento / Webinar</option>
                          <option value="campaign">Campaña de Difusión</option>
                          <option value="news">Noticia de Campamentos</option>
                        </select>

                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.broadcastPush[language]}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active notification history */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      Historial de Alertas Emitidas ({notifications.length})
                    </h4>
                    <div className="divide-y divide-stone-800 bg-stone-950 rounded-2xl border border-stone-800">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-bold text-white">{getLocalized(n.title, language)}</div>
                            <div className="text-stone-400 text-[11px]">{getLocalized(n.message, language)}</div>
                          </div>
                          <button
                            onClick={() => deleteNotification(n.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: DONATIONS RECORDS */}
              {activeTab === 'donations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {t.tabs.donations[language]} ({donations.length})
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">
                        Datos ilustrativos: €{totalDonationsAmount.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={handleExportDonationsCSV}
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-stone-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>

                  <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-xs text-stone-300">
                      <thead className="bg-stone-900 text-stone-400 uppercase text-[10px] border-b border-stone-800">
                        <tr>
                          <th className="p-3">ID / Certificado</th>
                          <th className="p-3">Donante</th>
                          <th className="p-3">Cantidad</th>
                          <th className="p-3">Frecuencia</th>
                          <th className="p-3">Destino</th>
                          <th className="p-3">Método</th>
                          <th className="p-3">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60">
                        {donations.map((d) => (
                          <tr key={d.id} className="hover:bg-stone-900/40">
                            <td className="p-3 font-mono font-bold text-amber-400">{d.certificateId}</td>
                            <td className="p-3 font-semibold text-white">{d.donorName}</td>
                            <td className="p-3 font-bold text-white">€{d.amount}</td>
                            <td className="p-3 capitalize">{d.frequency.replace('_', ' ')}</td>
                            <td className="p-3 capitalize">{d.cause}</td>
                            <td className="p-3 uppercase text-[10px] font-mono">{d.paymentMethod}</td>
                            <td className="p-3 text-stone-400">{d.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MODAL: EDIT / CREATE STORY ================= */}
        <AnimatePresence>
          {isEditingStory && currentStory && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-stone-100 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h3 className="text-lg font-bold text-white font-serif">
                    {currentStory.id ? 'Editar Historia' : 'Publicar Nueva Historia'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditingStory(false);
                      setCurrentStory(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveStory} className="space-y-4">
                  {/* Language Selector for Multilingual content */}
                  <div className="flex items-center gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                    <span className="px-2 text-stone-400 font-semibold">Idioma de redacción:</span>
                    {(['es', 'en', 'ar', 'fr'] as Language[]).map((lng) => (
                      <button
                        type="button"
                        key={lng}
                        onClick={() => setStoryFormLang(lng)}
                        className={`px-3 py-1 rounded-lg uppercase font-bold transition-all ${
                          storyFormLang === lng
                            ? 'bg-amber-600 text-stone-950 shadow-xs'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {lng}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Título ({storyFormLang.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentStory.title?.[storyFormLang] || ''}
                      onChange={(e) =>
                        setCurrentStory({
                          ...currentStory,
                          title: {
                            ...(currentStory.title || { es: '', en: '', ar: '', fr: '' }),
                            [storyFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={storyFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Título de la crónica o historia..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Resumen / Breve descripción ({storyFormLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={2}
                      value={currentStory.summary?.[storyFormLang] || ''}
                      onChange={(e) =>
                        setCurrentStory({
                          ...currentStory,
                          summary: {
                            ...(currentStory.summary || { es: '', en: '', ar: '', fr: '' }),
                            [storyFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={storyFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Sinopsis para la tarjeta..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Contenido Completo ({storyFormLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={5}
                      value={currentStory.content?.[storyFormLang] || ''}
                      onChange={(e) =>
                        setCurrentStory({
                          ...currentStory,
                          content: {
                            ...(currentStory.content || { es: '', en: '', ar: '', fr: '' }),
                            [storyFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={storyFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Texto íntegro del artículo o testimonio..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Categoría</label>
                      <select
                        value={currentStory.category || 'humanitarian'}
                        onChange={(e) =>
                          setCurrentStory({ ...currentStory, category: e.target.value as any })
                        }
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      >
                        <option value="humanitarian">Acción Humanitaria</option>
                        <option value="education">Educación & Formación</option>
                        <option value="health">Salud Materno-Infantil</option>
                        <option value="empowerment">Empoderamiento Femenino</option>
                        <option value="culture">Cultura & Memoria</option>
                        <option value="cooperative">Cooperativas</option>
                        <option value="advocacy">Incidencia Internacional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Wilaya / Ubicación</label>
                      <select
                        value={currentStory.wilaya || 'Smara'}
                        onChange={(e) => setCurrentStory({ ...currentStory, wilaya: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      >
                        <option value="Smara">Wilaya de Smara</option>
                        <option value="Bojador">Wilaya de Bojador</option>
                        <option value="El Aaiún">Wilaya de El Aaiún</option>
                        <option value="Dajla">Wilaya de Dajla</option>
                        <option value="Auserd">Wilaya de Auserd</option>
                        <option value="Ginebra / ONU">Ginebra / ONU</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Tiempo de lectura (min)</label>
                      <input
                        type="text"
                        value={currentStory.readTime || '4'}
                        onChange={(e) => setCurrentStory({ ...currentStory, readTime: e.target.value })}
                        placeholder="Ej. 4"
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Imagen de Portada (URL)</label>
                    <input
                      type="text"
                      value={currentStory.imageUrl || ''}
                      onChange={(e) => setCurrentStory({ ...currentStory, imageUrl: e.target.value })}
                      placeholder="https://... o selecciona un recurso:"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {presetImages.map((p) => (
                        <button
                          type="button"
                          key={p.label}
                          onClick={() => setCurrentStory({ ...currentStory, imageUrl: p.url })}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded-lg text-[10px] text-stone-300"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="story-featured"
                      checked={currentStory.featured || false}
                      onChange={(e) => setCurrentStory({ ...currentStory, featured: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-0"
                    />
                    <label htmlFor="story-featured" className="text-xs text-stone-300">
                      Destacar en portada principal (Featured)
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingStory(false);
                        setCurrentStory(null);
                      }}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold shadow-md"
                    >
                      Guardar Historia
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= MODAL: EDIT / CREATE TESTIMONIAL ================= */}
        <AnimatePresence>
          {isEditingMedia && currentMedia && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-stone-100 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h3 className="text-lg font-bold text-white font-serif">
                    {currentMedia.id ? 'Editar Testimonio / Grabación' : 'Añadir Nuevo Testimonio'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditingMedia(false);
                      setCurrentMedia(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveMedia} className="space-y-4">
                  {/* Language Selector */}
                  <div className="flex items-center gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                    <span className="px-2 text-stone-400 font-semibold">Idioma de transcripción:</span>
                    {(['es', 'en', 'ar', 'fr'] as Language[]).map((lng) => (
                      <button
                        type="button"
                        key={lng}
                        onClick={() => setMediaFormLang(lng)}
                        className={`px-3 py-1 rounded-lg uppercase font-bold transition-all ${
                          mediaFormLang === lng
                            ? 'bg-amber-600 text-stone-950 shadow-xs'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {lng}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Título ({mediaFormLang.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentMedia.title?.[mediaFormLang] || ''}
                      onChange={(e) =>
                        setCurrentMedia({
                          ...currentMedia,
                          title: {
                            ...(currentMedia.title || { es: '', en: '', ar: '', fr: '' }),
                            [mediaFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={mediaFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Título del testimonio..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Nombre de la Portavoz *</label>
                      <input
                        type="text"
                        required
                        value={currentMedia.speaker || ''}
                        onChange={(e) => setCurrentMedia({ ...currentMedia, speaker: e.target.value })}
                        placeholder="Ej. Fatma Brahim"
                        className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">
                        Cargo o Responsabilidad ({mediaFormLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={currentMedia.speakerRole?.[mediaFormLang] || ''}
                        onChange={(e) =>
                          setCurrentMedia({
                            ...currentMedia,
                            speakerRole: {
                              ...(currentMedia.speakerRole || { es: '', en: '', ar: '', fr: '' }),
                              [mediaFormLang]: e.target.value,
                            },
                          })
                        }
                        placeholder="Ej. Coordinadora Sanitaria"
                        className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Formato</label>
                      <select
                        value={currentMedia.type || 'video'}
                        onChange={(e) =>
                          setCurrentMedia({ ...currentMedia, type: e.target.value as TestimonialMedia['type'] })
                        }
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      >
                        <option value="video">Vídeo</option>
                        <option value="audio">Audio / Podcast</option>
                        <option value="photo_story">Fotorreportaje</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Wilaya</label>
                      <input
                        type="text"
                        value={currentMedia.location || 'Wilaya de Smara'}
                        onChange={(e) => setCurrentMedia({ ...currentMedia, location: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Duración o cantidad de fotos</label>
                      <input
                        type="text"
                        value={currentMedia.duration || '04:12'}
                        onChange={(e) => setCurrentMedia({ ...currentMedia, duration: e.target.value })}
                        placeholder="04:12"
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Cita Destacada ({mediaFormLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={currentMedia.quote?.[mediaFormLang] || ''}
                      onChange={(e) =>
                        setCurrentMedia({
                          ...currentMedia,
                          quote: {
                            ...(currentMedia.quote || { es: '', en: '', ar: '', fr: '' }),
                            [mediaFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={mediaFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Cita representativa del testimonio..."
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white italic"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Transcripción Completa ({mediaFormLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={4}
                      value={currentMedia.fullTranscript?.[mediaFormLang] || ''}
                      onChange={(e) =>
                        setCurrentMedia({
                          ...currentMedia,
                          fullTranscript: {
                            ...(currentMedia.fullTranscript || { es: '', en: '', ar: '', fr: '' }),
                            [mediaFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={mediaFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Texto completo de la entrevista..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Imagen de Portada / Miniatura</label>
                    <input
                      type="text"
                      value={currentMedia.thumbnailUrl || ''}
                      onChange={(e) => setCurrentMedia({ ...currentMedia, thumbnailUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {presetImages.map((p) => (
                        <button
                          type="button"
                          key={p.label}
                          onClick={() => setCurrentMedia({ ...currentMedia, thumbnailUrl: p.url })}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded-lg text-[10px] text-stone-300"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {currentMedia.type === 'photo_story' && <div>
                    <label htmlFor="media-photo-urls" className="mb-1 block text-xs font-bold text-stone-300">Fotos de la galería (una URL o ruta por línea)</label>
                    <textarea id="media-photo-urls" rows={4} value={(currentMedia.photoUrls || []).join('\n')} onChange={(e) => setCurrentMedia({ ...currentMedia, photoUrls: e.target.value.split('\n') })} placeholder="https://ejemplo.org/foto-1.jpg" className="w-full resize-y rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2.5 text-xs text-white" />
                    <p className="mt-1 text-[11px] text-stone-400">Si no añades fotos, se mostrará solo la portada.</p>
                  </div>}
                  <div>
                    <label htmlFor="media-source-url" className="mb-1 block text-xs font-bold text-stone-300">URL del archivo audiovisual (opcional)</label>
                    <input id="media-source-url" type="text" value={currentMedia.mediaUrl || ''} onChange={(e) => setCurrentMedia({ ...currentMedia, mediaUrl: e.target.value })} placeholder="https://ejemplo.org/archivo.mp4 o /media/video.mp4" className="w-full rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2.5 text-xs text-white" />
                    <p className="mt-1 text-[11px] text-stone-400">Usa el enlace directo a un archivo MP4/WebM o audio; una página de YouTube no es un archivo reproducible aquí. Sin archivo se mostrará la imagen y el relato.</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="media-featured"
                      checked={currentMedia.featured || false}
                      onChange={(e) => setCurrentMedia({ ...currentMedia, featured: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-0"
                    />
                    <label htmlFor="media-featured" className="text-xs text-stone-300">
                      Destacar en el reproductor del Hero (Featured)
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingMedia(false);
                        setCurrentMedia(null);
                      }}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold shadow-md"
                    >
                      Guardar Testimonio
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= MODAL: EDIT / CREATE CAMPAIGN ================= */}
        <AnimatePresence>
          {isEditingCampaign && currentCampaign && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-stone-100 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h3 className="text-lg font-bold text-white font-serif">
                    {currentCampaign.id ? 'Editar Campaña' : 'Crear Nueva Campaña de Solidaridad'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditingCampaign(false);
                      setCurrentCampaign(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCampaign} className="space-y-4">
                  {/* Language Selector */}
                  <div className="flex items-center gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                    <span className="px-2 text-stone-400 font-semibold">Idioma:</span>
                    {(['es', 'en', 'ar', 'fr'] as Language[]).map((lng) => (
                      <button
                        type="button"
                        key={lng}
                        onClick={() => setCampaignFormLang(lng)}
                        className={`px-3 py-1 rounded-lg uppercase font-bold transition-all ${
                          campaignFormLang === lng
                            ? 'bg-amber-600 text-stone-950 shadow-xs'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {lng}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Título de la Campaña ({campaignFormLang.toUpperCase()}) *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentCampaign.title?.[campaignFormLang] || ''}
                      onChange={(e) =>
                        setCurrentCampaign({
                          ...currentCampaign,
                          title: {
                            ...(currentCampaign.title || { es: '', en: '', ar: '', fr: '' }),
                            [campaignFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={campaignFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Ej. Fondo de Emergencia para Hospitales..."
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Descripción ({campaignFormLang.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={currentCampaign.description?.[campaignFormLang] || ''}
                      onChange={(e) =>
                        setCurrentCampaign({
                          ...currentCampaign,
                          description: {
                            ...(currentCampaign.description || { es: '', en: '', ar: '', fr: '' }),
                            [campaignFormLang]: e.target.value,
                          },
                        })
                      }
                      dir={campaignFormLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder="Propósito y detalles del proyecto..."
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Meta a recaudar (€)</label>
                      <input
                        type="number"
                        required
                        value={currentCampaign.targetGoalEUR || 10000}
                        onChange={(e) =>
                          setCurrentCampaign({ ...currentCampaign, targetGoalEUR: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Días restantes</label>
                      <input
                        type="number"
                        value={currentCampaign.daysLeft || 30}
                        onChange={(e) =>
                          setCurrentCampaign({ ...currentCampaign, daysLeft: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Categoría</label>
                      <select
                        value={currentCampaign.category || 'health'}
                        onChange={(e) =>
                          setCurrentCampaign({ ...currentCampaign, category: e.target.value as any })
                        }
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                      >
                        <option value="health">Salud</option>
                        <option value="education">Educación</option>
                        <option value="cooperative">Cooperativas</option>
                        <option value="emergency">Emergencia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Hashtag de difusión</label>
                    <input
                      type="text"
                      value={currentCampaign.hashtag || '#UNMS_Solidaridad'}
                      onChange={(e) => setCurrentCampaign({ ...currentCampaign, hashtag: e.target.value })}
                      placeholder="#CampañaUNMS"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Imagen de Portada</label>
                    <input
                      type="text"
                      value={currentCampaign.imageUrl || ''}
                      onChange={(e) => setCurrentCampaign({ ...currentCampaign, imageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {presetImages.map((p) => (
                        <button
                          type="button"
                          key={p.label}
                          onClick={() => setCurrentCampaign({ ...currentCampaign, imageUrl: p.url })}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded-lg text-[10px] text-stone-300"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="camp-urgent"
                      checked={currentCampaign.urgent || false}
                      onChange={(e) => setCurrentCampaign({ ...currentCampaign, urgent: e.target.checked })}
                      className="rounded text-rose-600 focus:ring-0"
                    />
                    <label htmlFor="camp-urgent" className="text-xs text-stone-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Marcar como campaña urgente (badge destacado)</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingCampaign(false);
                        setCurrentCampaign(null);
                      }}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold shadow-md"
                    >
                      Guardar Campaña
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
