import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactStats } from './components/ImpactStats';
import { ActionPillars } from './components/ActionPillars';
import { BlogSection } from './components/BlogSection';
import { StoryDetailModal } from './components/StoryDetailModal';
import { AudiovisualGallery } from './components/AudiovisualGallery';
import { MediaDetailModal } from './components/MediaDetailModal';
import { SocialCampaignHub } from './components/SocialCampaignHub';
import { DonationSystem } from './components/DonationSystem';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeStoryModal, setActiveStoryModal, activeMediaModal, setActiveMediaModal, toast, isRTL } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-stone-900 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ImpactStats />
        <ActionPillars />
        <BlogSection />
        <AudiovisualGallery />
        <SocialCampaignHub />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <DonationSystem />
      <AdminPanel />

      {/* Global Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 ${
              isRTL ? 'left-6' : 'right-6'
            } z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border text-sm font-semibold max-w-md ${
              toast.type === 'success'
                ? 'bg-stone-900/95 text-emerald-300 border-emerald-500/40 shadow-emerald-950/20'
                : toast.type === 'warning'
                ? 'bg-stone-900/95 text-amber-300 border-amber-500/40 shadow-amber-950/20'
                : 'bg-stone-900/95 text-sky-300 border-sky-500/40 shadow-sky-950/20'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
            {(!toast.type || toast.type === 'info') && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            <span className="leading-snug text-stone-100">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStoryModal && (
          <StoryDetailModal
            story={activeStoryModal}
            onClose={() => setActiveStoryModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeMediaModal && (
          <MediaDetailModal
            media={activeMediaModal}
            onClose={() => setActiveMediaModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
