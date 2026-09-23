import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { BlogPost, TestimonialMedia, Campaign, PushNotification, Language } from '../types';
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  Send,
  Download,
  Upload,
  RefreshCw,
  X,
  FileText,
  Video,
  Heart,
  Bell,
  CheckCircle,
  BarChart3,
  Globe,
  Sparkles,
  Search,
  Check,
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
    notifications,
    broadcastNotification,
    deleteNotification,
    resetToDefaultData,
    showToast,
  } = useApp();

  const t = translations.admin;

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'gallery' | 'campaigns' | 'push' | 'donations'>('overview');

  // Story form state (for Add / Edit)
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [currentStory, setCurrentStory] = useState<Partial<BlogPost> | null>(null);

  // Media form state (for Add / Edit)
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<Partial<TestimonialMedia> | null>(null);

  // Push Broadcast form state
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
      showToast('Se requiere título en español', 'warning');
      return;
    }

    if (currentStory.id) {
      updateBlogPost(currentStory as BlogPost);
    } else {
      addBlogPost({
        title: currentStory.title || { es: '', en: '', ar: '', fr: '' },
        summary: currentStory.summary || { es: '', en: '', ar: '', fr: '' },
        content: currentStory.content || { es: '', en: '', ar: '', fr: '' },
        category: (currentStory.category as any) || 'humanitarian',
        categoryLabel: currentStory.categoryLabel || { es: 'Humanitaria', en: 'Humanitarian', ar: 'إنسانية', fr: 'Humanitaire' },
        author: currentStory.author || { name: 'Comité UNMS', role: { es: 'Delegación', en: 'Delegation', ar: 'اللجنة', fr: 'Délégation' } },
        date: new Date().toISOString().split('T')[0],
        readTime: currentStory.readTime || '4',
        imageUrl: currentStory.imageUrl || '/src/assets/images/unms_hero_women_1788306077567.jpg',
        featured: currentStory.featured || false,
        tags: currentStory.tags || ['UNMS', 'Solidaridad'],
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

    if (currentMedia.id) {
      updateTestimonial(currentMedia as TestimonialMedia);
    } else {
      addTestimonial({
        type: currentMedia.type || 'video',
        title: currentMedia.title || { es: '', en: '', ar: '', fr: '' },
        speaker: currentMedia.speaker || '',
        speakerRole: currentMedia.speakerRole || { es: '', en: '', ar: '', fr: '' },
        location: currentMedia.location || 'Wilaya de Smara',
        duration: currentMedia.duration || '03:45',
        thumbnailUrl: currentMedia.thumbnailUrl || '/src/assets/images/unms_hero_women_1788306077567.jpg',
        quote: currentMedia.quote || { es: '', en: '', ar: '', fr: '' },
        fullTranscript: currentMedia.fullTranscript || { es: '', en: '', ar: '', fr: '' },
        date: new Date().toISOString().split('T')[0],
        tags: currentMedia.tags || ['Testimonio'],
        featured: currentMedia.featured || false,
      });
    }

    setIsEditingMedia(false);
    setCurrentMedia(null);
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
    showToast('Archivo CSV de donaciones exportado', 'success');
  };

  const totalDonationsAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl bg-stone-900 text-stone-100 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col border border-stone-800"
      >
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                {t.title[language]}
              </h2>
              <p className="text-xs text-stone-400 hidden sm:block">
                {t.subtitle[language]}
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
                <span>{language === 'ar' ? 'تسجيل الخروج' : 'Cerrar Sesión'}</span>
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
                  {language === 'ar' ? 'تسجيل الدخول إلى لوحة الإدارة' : language === 'fr' ? 'Accès au Panneau de Gestion' : language === 'en' ? 'Admin Panel Access' : 'Acceso al Panel de Gestión'}
                </h3>
                <p className="text-xs text-stone-400 mt-2">
                  {language === 'ar'
                    ? 'أدخل رمز المرور المعتمد لإدارة محتوى المنصة (الرمز الرسمي: unms2026)'
                    : language === 'fr'
                    ? 'Entrez le mot de passe autorisé pour gérer les contenus (Clé d’accès : unms2026).'
                    : language === 'en'
                    ? 'Enter the authorized passcode to manage platform content (Passcode: unms2026).'
                    : 'Introduce la clave de acceso de la organización para gestionar contenidos (Clave de acceso: unms2026).'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={language === 'ar' ? 'كلمة المرور (unms2026)' : language === 'fr' ? 'Mot de passe (unms2026)' : language === 'en' ? 'Passcode (unms2026)' : 'Clave de acceso (unms2026)'}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-sm text-center text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  {language === 'ar' ? 'دخول' : language === 'fr' ? 'Accéder' : language === 'en' ? 'Sign In' : 'Acceder al Panel'}
                </button>
              </form>
            </div>
          ) : (
            /* ================= AUTHENTICATED ADMIN DASHBOARD ================= */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-3">
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
                  onClick={() => setActiveTab('push')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'push'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.pushBroadcast[language]}
                </button>
                <button
                  onClick={() => setActiveTab('donations')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'donations'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {t.tabs.donations[language]} ({donations.length})
                </button>
              </div>

              {/* TAB 1: OVERVIEW METRICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400">{t.totalDonations[language]}</div>
                      <div className="text-2xl font-bold text-amber-400 font-serif mt-1">
                        €{totalDonationsAmount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">{donations.length} aportes registrados</div>
                    </div>

                    <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400">{t.publishedStoriesCount[language]}</div>
                      <div className="text-2xl font-bold text-white font-serif mt-1">
                        {blogPosts.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">En 4 idiomas activos</div>
                    </div>

                    <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400">{t.mediaTestimonialsCount[language]}</div>
                      <div className="text-2xl font-bold text-white font-serif mt-1">
                        {testimonials.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">Vídeos, audios y fotos</div>
                    </div>

                    <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                      <div className="text-xs text-stone-400">Mensajes de Solidaridad</div>
                      <div className="text-2xl font-bold text-white font-serif mt-1">
                        {solidarityMessages.length}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">Red internacional activa</div>
                    </div>
                  </div>

                  {/* Reset & Quick Tools */}
                  <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif">
                        Restaurar datos predeterminados de demostración
                      </h4>
                      <p className="text-xs text-stone-400">
                        Restablece las historias, testimonios y donaciones al estado inicial de fábrica.
                      </p>
                    </div>

                    <button
                      onClick={resetToDefaultData}
                      className="px-4 py-2 bg-stone-800 hover:bg-rose-950/80 hover:text-rose-300 text-stone-300 border border-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restablecer Datos</span>
                    </button>
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
                          author: { name: 'Comité UNMS', role: { es: 'Coordinación', en: 'Coordination', ar: 'التنسيق', fr: 'Coordination' } },
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
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTestimonial(media.id)}
                            className="p-2 hover:bg-stone-800 text-stone-300 hover:text-rose-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PUSH NOTIFICATIONS BROADCASTER */}
              {activeTab === 'push' && (
                <div className="space-y-6">
                  <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      <Bell className="w-4 h-4" />
                      <span>{t.tabs.pushBroadcast[language]}</span>
                    </div>
                    <p className="text-xs text-stone-400 mb-6">
                      Envía una notificación push instantánea a todos los seguidores y miembros conectados a la plataforma.
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

              {/* TAB 5: DONATIONS RECORDS */}
              {activeTab === 'donations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {t.tabs.donations[language]} ({donations.length})
                    </h3>
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
      </motion.div>
    </div>
  );
};
