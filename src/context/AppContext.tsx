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

const loadLocalList = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as T[] : fallback;
  } catch {
    return fallback;
  }
};

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
    return loadLocalList('unms_blog_posts', initialBlogPosts);
  });

  const [testimonials, setTestimonials] = useState<TestimonialMedia[]>(() => {
    // Upgrade previously cached demo entries without replacing custom media.
    return loadLocalList('unms_testimonials', initialTestimonials).map((item) => {
      const sample = initialTestimonials.find((entry) => entry.id === item.id);
      if (!sample) return item;
      if (item.type === 'video' && !item.mediaUrl && item.speaker === 'Testimonio ilustrativo') {
        return { ...item, title: sample.title, duration: sample.duration, mediaUrl: sample.mediaUrl };
      }
      if (item.type === 'audio' && !item.mediaUrl && item.id === 'test-podcast-poesia-oral' && item.speaker === 'Colectivo cultural (ejemplo)') {
        return { ...sample };
      }
      if (item.type === 'photo_story' && !item.photoUrls?.length && item.id === 'test-fotoensayo-cooperativas') {
        return { ...item, title: sample.title, duration: sample.duration, photoUrls: sample.photoUrls };
      }
      return item;
    });
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    return loadLocalList('unms_campaigns', initialCampaigns);
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    return loadLocalList('unms_notifications', initialPushNotifications);
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    return loadLocalList('unms_donations', initialDonations);
  });

  const [solidarityMessages, setSolidarityMessages] = useState<SolidarityMessage[]>(() => {
    return loadLocalList('unms_solidarity_messages', initialSolidarityMessages);
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
  useEffect(() => {
    const openLinkedStory = () => {
      const prefix = '#historia-';
      if (!window.location.hash.startsWith(prefix)) return;
      const story = blogPosts.find(item => item.id === decodeURIComponent(window.location.hash.slice(prefix.length)));
      if (story) setActiveStoryModal(story);
    };
    openLinkedStory();
    window.addEventListener('hashchange', openLinkedStory);
    return () => window.removeEventListener('hashchange', openLinkedStory);
  }, [blogPosts]);
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
  const pushPermission: 'default' | 'granted' | 'denied' = 'default';

  const requestPushPermission = async (): Promise<boolean> => {
    showToast('Las notificaciones push no están configuradas en esta propuesta.', 'info');
    return false;
  };

  const broadcastNotification = (notif: Omit<PushNotification, 'id' | 'timestamp'>) => {
    const newNotif: PushNotification = {
      ...notif,
      id: `push-${Date.now()}`,
      timestamp: language === 'ar' ? 'الآن' : language === 'fr' ? 'À l’instant' : language === 'en' ? 'Just now' : 'Ahora mismo',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Vista previa local: ${notif.title[language] || notif.title.es}`, 'info');
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
    showToast('Mensaje agregado a esta vista previa en tu navegador.', 'success');
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
  // The editorial panel is an interactive, browser-local prototype.
  const [adminAuthenticated] = useState(true);

  const loginAdmin = (_pass: string) => true;

  const logoutAdmin = () => {
    setIsAdminOpen(false);
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'likes'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `story-${Date.now()}`,
      likes: 0,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('Historia agregada a esta vista previa local.', 'success');
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
