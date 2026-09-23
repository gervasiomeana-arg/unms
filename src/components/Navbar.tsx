import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations, getLocalized } from '../data/translations';
import { Language } from '../types';
import {
  Globe,
  Bell,
  Heart,
  Menu,
  X,
  Lock,
  ChevronDown,
  Volume2,
  CheckCheck,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    isRTL,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    openDonationModal,
    setIsAdminOpen,
    adminAuthenticated,
  } = useApp();

  const t = translations.nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; nativeName: string; flag: string }[] = [
    { code: 'es', label: 'Español', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'ar', label: 'العربية', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all duration-200">
      {/* Visible proposal status throughout the site */}
      <div className="bg-[#9E3A24] text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-300" />
        <span>
          {language === 'ar'
            ? 'مقترح قيد التقييم · البيانات والأرقام والوظائف التوضيحية قابلة للتغيير'
            : language === 'fr'
            ? 'Projet en cours d’évaluation · contenus et chiffres illustratifs'
            : language === 'en'
            ? 'Proposal under review · illustrative content and figures'
            : 'Propuesta en evaluación · contenido y cifras ilustrativas'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="nav-logo-btn"
          >
            {/* Elegant emblem */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 flex items-center justify-center p-0.5 shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-stone-950 flex flex-col items-center justify-center border border-amber-500/40">
                <span className="text-amber-400 font-bold text-xs tracking-wider">UNMS</span>
                <span className="text-[9px] text-stone-400 font-serif">1974</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  UNMS
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  {language === 'ar' ? 'الصحراء الغربية' : 'Sahara'}
                </span>
              </div>
              <span className="text-xs text-stone-300 font-medium hidden md:block max-w-[280px] truncate">
                {t.home[language]} • {translations.hero.titleMain[language]}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => scrollTo('sobre-unms')}
              className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
              id="nav-about-link"
            >
              {t.about[language]}
            </button>
            <button
              onClick={() => scrollTo('lineas-accion')}
              className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
              id="nav-pillars-link"
            >
              {t.pillars[language]}
            </button>
            <button
              onClick={() => scrollTo('historias-blog')}
              className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
              id="nav-blog-link"
            >
              {t.blog[language]}
            </button>
            <button
              onClick={() => scrollTo('galeria-audiovisual')}
              className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
              id="nav-gallery-link"
            >
              {t.gallery[language]}
            </button>
            <button
              onClick={() => scrollTo('campanas-solidaridad')}
              className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
              id="nav-campaigns-link"
            >
              {t.campaigns[language]}
            </button>
          </nav>

          {/* Right Action Tools: Language, Push Notifications, Donate, Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors"
                id="lang-selector-btn"
                aria-label="Seleccionar idioma"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline font-bold uppercase">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute ${
                      isRTL ? 'left-0' : 'right-0'
                    } mt-2 w-48 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl py-1 z-50 overflow-hidden`}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 border-b border-stone-800 uppercase tracking-wider">
                      {t.language[language]}
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-amber-600/20 transition-colors ${
                          language === lang.code ? 'text-amber-400 bg-stone-800 font-bold' : 'text-stone-200'
                        }`}
                        id={`lang-opt-${lang.code}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        {language === lang.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Push Notifications Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors"
                id="push-bell-btn"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-extrabold text-white animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute ${
                      isRTL ? 'left-0' : 'right-0'
                    } mt-2 w-80 sm:w-96 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 overflow-hidden`}
                  >
                    {/* Header */}
                    <div className="px-4 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {translations.push.notificationCenter[language]}
                        </span>
                      </div>
                      {unreadNotificationsCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>{translations.push.markAllRead[language]}</span>
                        </button>
                      )}
                    </div>

                    <p className="border-b border-stone-800 px-4 py-2 text-[11px] text-stone-400">
                      {language === 'ar' ? 'معاينة: الإشعارات تظهر في هذا المتصفح فقط.' : language === 'fr' ? 'Aperçu : les alertes restent dans ce navigateur.' : language === 'en' ? 'Preview: alerts remain in this browser.' : 'Vista previa: las alertas solo aparecen en este navegador.'}
                    </p>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-stone-800">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-stone-400">
                          {translations.push.noNotifications[language]}
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.actionUrl) {
                                const id = notif.actionUrl.replace('#', '');
                                scrollTo(id);
                                setNotifDropdownOpen(false);
                              }
                            }}
                            className={`p-3.5 hover:bg-stone-800/80 cursor-pointer transition-colors ${
                              !notif.read ? 'bg-amber-950/20' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                {notif.type === 'urgent' && (
                                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                                )}
                                <span
                                  className={`text-xs font-bold ${
                                    !notif.read ? 'text-amber-300' : 'text-stone-200'
                                  }`}
                                >
                                  {getLocalized(notif.title, language)}
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-400 whitespace-nowrap">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                              {getLocalized(notif.message, language)}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Panel Quick Access Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 text-xs font-medium transition-colors"
              id="nav-admin-btn"
              title="Panel de Administración"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{t.admin[language]}</span>
            </button>

            {/* Main Donate Button */}
            <button
              onClick={() => openDonationModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="nav-donate-cta"
            >
              <Heart className="w-4 h-4 text-stone-950 fill-stone-950" />
              <span>{t.donate[language]}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200"
              id="mobile-menu-toggle-btn"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 py-5 flex flex-col gap-3 shadow-xl overflow-hidden"
          >
            <button
              onClick={() => scrollTo('sobre-unms')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.about[language]}
            </button>
            <button
              onClick={() => scrollTo('lineas-accion')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.pillars[language]}
            </button>
            <button
              onClick={() => scrollTo('historias-blog')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.blog[language]}
            </button>
            <button
              onClick={() => scrollTo('galeria-audiovisual')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.gallery[language]}
            </button>
            <button
              onClick={() => scrollTo('campanas-solidaridad')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.campaigns[language]}
            </button>
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.admin[language]}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDonationModal();
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-600 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-stone-950" />
                <span>{t.donate[language]}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
