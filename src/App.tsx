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
import { AnimatePresence } from 'motion/react';

const MainLayout: React.FC = () => {
  const { activeStoryModal, setActiveStoryModal, activeMediaModal, setActiveMediaModal } = useApp();

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
