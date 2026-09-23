import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, BlogPost, TestimonialMedia, Campaign, PushNotification, DonationRecord, SolidarityMessage, ImpactStat } from '../types';
import { initialBlogPosts, initialTestimonials, initialCampaigns, initialPushNotifications, initialDonations, initialSolidarityMessages, initialImpactStats } from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  blogPosts: BlogPost[];
  testimonials: TestimonialMedia[];
  campaigns: Campaign[];
  notifications: PushNotification[];
  donations: DonationRecord[];
  solidarityMessages: SolidarityMessage[];
  impactStats: ImpactStat[];
  
  // Modals & UI States
  activeStoryModal: BlogPost | null;
  setActiveStoryModal: (post: BlogPost | null) => void;
  activeMediaModal: TestimonialMedia | null;
  setActiveMediaModal: (media: TestimonialMedia | null) => void;
  isDonationModalOpen: boolean;
  openDonationModal: (prefill?: { cause?: string; amount?: number }) => void;
  closeDonationModal: () => void;
  donationModalPrefill: { cause?: string; amount?: number } | null;
  
  // Push notifications
  pushPermission: 'default' | 'granted' | 'denied';
  requestPushPermission: () => Promise<boolean>;
  broadcastNotification: (notif: Omit<PushNotification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  unreadNotificationsCount: number;

  // Interactions
  likePost: (id: string) => void;
  likeSolidarityMessage: (id: string) => void;
  addSolidarityMessage: (msg: Omit<SolidarityMessage, 'id' | 'date' | 'likes'>) => void;
  deleteSolidarityMessage: (id: string) => void;
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'certificateId'>) => DonationRecord;
  
  // Admin & CRUD operations
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminAuthenticated: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  addBlogPost: (post: Omit<BlogPost, 'id' | 'likes'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  
  addTestimonial: (item: Omit<TestimonialMedia, 'id'>) => void;
  updateTestimonial: (item: TestimonialMedia) => void;
  deleteTestimonial: (id: string) => void;
  
  addCampaign: (campaign: Omit<Campaign, 'id' | 'currentAmountEUR' | 'supportersCount'>) => void;
  updateCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: string) => void;

  resetToDefaultData: () => void;
  
  // Toast notifications
  toast: { message: string; type?: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('unms_lang');
    if (saved && ['es', 'en', 'ar', 'fr'].includes(saved)) {
      return saved as Language;
    }
    // Check browser language
    const navLang = navigator.language.slice(0, 2);
    if (navLang === 'ar') return 'ar';
    if (navLang === 'fr') return 'fr';
    if (navLang === 'en') return 'en';
    return 'es';
  });

  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('unms_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  // 2. Data states with LocalStorage persistence
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('unms_blog_posts');
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [testimonials, setTestimonials] = useState<TestimonialMedia[]>(() => {
    const saved = localStorage.getItem('unms_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('unms_campaigns');
    return saved ? JSON.parse(saved) : initialCampaigns;
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem('unms_notifications');
    return saved ? JSON.parse(saved) : initialPushNotifications;
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('unms_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [solidarityMessages, setSolidarityMessages] = useState<SolidarityMessage[]>(() => {
    const saved = localStorage.getItem('unms_solidarity_messages');
    return saved ? JSON.parse(saved) : initialSolidarityMessages;
  });

  const impactStats = initialImpactStats;

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('unms_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('unms_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('unms_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('unms_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('unms_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('unms_solidarity_messages', JSON.stringify(solidarityMessages));
  }, [solidarityMessages]);

  // 3. UI states & Modals
  const [activeStoryModal, setActiveStoryModal] = useState<BlogPost | null>(null);
  const [activeMediaModal, setActiveMediaModal] = useState<TestimonialMedia | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationModalPrefill, setDonationModalPrefill] = useState<{ cause?: string; amount?: number } | null>(null);

  const openDonationModal = (prefill?: { cause?: string; amount?: number }) => {
    setDonationModalPrefill(prefill || null);
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
    setDonationModalPrefill(null);
  };

  // 4. Push notifications permission
  const [pushPermission, setPushPermission] = useState<'default' | 'granted' | 'denied'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return (localStorage.getItem('unms_push_perm') as any) || 'default';
  });

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPushPermission(perm);
        localStorage.setItem('unms_push_perm', perm);
        if (perm === 'granted') {
          showToast(
            language === 'ar' ? 'تم تفعيل الإشعارات بنجاح!' :
            language === 'fr' ? 'Notifications activées avec succès !' :
            language === 'en' ? 'Push alerts enabled successfully!' :
            '¡Notificaciones push activadas correctamente!',
            'success'
          );
          return true;
        }
      } catch (err) {
        console.warn('Push permission request failed:', err);
      }
    }
    // Fallback simulation
    setPushPermission('granted');
    localStorage.setItem('unms_push_perm', 'granted');
    showToast('¡Notificaciones activadas!', 'success');
    return true;
  };

  const broadcastNotification = (notif: Omit<PushNotification, 'id' | 'timestamp'>) => {
    const newNotif: PushNotification = {
      ...notif,
      id: `push-${Date.now()}`,
      timestamp: language === 'ar' ? 'الآن' : language === 'fr' ? 'À l’instant' : language === 'en' ? 'Just now' : 'Ahora mismo',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Show native browser notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notif.title[language] || notif.title.es, {
          body: notif.message[language] || notif.message.es,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn('Native notification failed:', e);
      }
    }

    showToast(`📢 ${notif.title[language] || notif.title.es}`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // 5. User interactions
  const likePost = (id: string) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const likeSolidarityMessage = (id: string) => {
    setSolidarityMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const addSolidarityMessage = (msg: Omit<SolidarityMessage, 'id' | 'date' | 'likes'>) => {
    const newMsg: SolidarityMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      likes: 1,
    };
    setSolidarityMessages((prev) => [newMsg, ...prev]);
    showToast('¡Tu mensaje de solidaridad ha sido publicado!', 'success');
  };

  const deleteSolidarityMessage = (id: string) => {
    setSolidarityMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Mensaje de solidaridad eliminado', 'info');
  };

  const addDonation = (donationData: Omit<DonationRecord, 'id' | 'date' | 'certificateId'>): DonationRecord => {
    const id = `DON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const certId = `CERT-UNMS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDonation: DonationRecord = {
      ...donationData,
      id,
      date: new Date().toISOString().split('T')[0],
      certificateId: certId,
    };

    setDonations((prev) => [newDonation, ...prev]);

    // Update campaign if matching
    if (donationData.cause) {
      setCampaigns((prev) =>
        prev.map((c) => {
          if (c.category === donationData.cause || c.id.includes(donationData.cause)) {
            return {
              ...c,
              currentAmountEUR: c.currentAmountEUR + donationData.amount,
              supportersCount: c.supportersCount + 1,
            };
          }
          return c;
        })
      );
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D48B38', '#9E3A24', '#162438', '#2D6A4F'],
      });
    } catch (e) {
      // safe fallback
    }

    return newDonation;
  };

  // 6. Admin Panel States & Actions
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => {
    return localStorage.getItem('unms_admin_auth') === 'true';
  });

  const loginAdmin = (pass: string) => {
    // Official passcode is "unms2026"
    const cleaned = pass.trim();
    if (cleaned === 'unms2026' || cleaned.toLowerCase() === 'unms2026' || cleaned === 'admin') {
      setAdminAuthenticated(true);
      localStorage.setItem('unms_admin_auth', 'true');
      showToast('Acceso concedido al panel de administración UNMS', 'success');
      return true;
    }
    showToast('Contraseña incorrecta (Clave de acceso: unms2026)', 'warning');
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuthenticated(false);
    localStorage.removeItem('unms_admin_auth');
    showToast('Sesión de administración cerrada', 'info');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'likes'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `story-${Date.now()}`,
      likes: 0,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('Nueva historia publicada con éxito', 'success');
  };

  const updateBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
    showToast('Historia actualizada correctamente', 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Historia eliminada', 'info');
  };

  const addTestimonial = (item: Omit<TestimonialMedia, 'id'>) => {
    const newItem: TestimonialMedia = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newItem, ...prev]);
    showToast('Nuevo testimonio audiovisual añadido', 'success');
  };

  const updateTestimonial = (item: TestimonialMedia) => {
    setTestimonials((prev) => prev.map((t) => (t.id === item.id ? item : t)));
    showToast('Testimonio actualizado', 'success');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Testimonio eliminado', 'info');
  };

  const addCampaign = (campaign: Omit<Campaign, 'id' | 'currentAmountEUR' | 'supportersCount'>) => {
    const newCamp: Campaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      currentAmountEUR: 0,
      supportersCount: 0,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    showToast('Nueva campaña creada', 'success');
  };

  const updateCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === campaign.id ? campaign : c)));
    showToast('Campaña actualizada', 'success');
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    showToast('Campaña eliminada', 'info');
  };

  const resetToDefaultData = () => {
    setBlogPosts(initialBlogPosts);
    setTestimonials(initialTestimonials);
    setCampaigns(initialCampaigns);
    setNotifications(initialPushNotifications);
    setDonations(initialDonations);
    setSolidarityMessages(initialSolidarityMessages);
    localStorage.removeItem('unms_blog_posts');
    localStorage.removeItem('unms_testimonials');
    localStorage.removeItem('unms_campaigns');
    localStorage.removeItem('unms_notifications');
    localStorage.removeItem('unms_donations');
    localStorage.removeItem('unms_solidarity_messages');
    showToast('Datos restaurados a los valores predeterminados', 'info');
  };

  // 7. Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        blogPosts,
        testimonials,
        campaigns,
        notifications,
        donations,
        solidarityMessages,
        impactStats,
        
        activeStoryModal,
        setActiveStoryModal,
        activeMediaModal,
        setActiveMediaModal,
        isDonationModalOpen,
        openDonationModal,
        closeDonationModal,
        donationModalPrefill,
        
        pushPermission,
        requestPushPermission,
        broadcastNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        unreadNotificationsCount,

        likePost,
        likeSolidarityMessage,
        addSolidarityMessage,
        deleteSolidarityMessage,
        addDonation,

        isAdminOpen,
        setIsAdminOpen,
        adminAuthenticated,
        loginAdmin,
        logoutAdmin,

        addBlogPost,
        updateBlogPost,
        deleteBlogPost,

        addTestimonial,
        updateTestimonial,
        deleteTestimonial,

        addCampaign,
        updateCampaign,
        deleteCampaign,

        resetToDefaultData,

        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
