import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompanyOverview } from './components/CompanyOverview';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { TrustSection } from './components/TrustSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectsPage } from './components/ProjectsPage';
import { IndustriesSection } from './components/IndustriesSection';
import { TechStackSection } from './components/TechStackSection';
import { StatsSection } from './components/StatsSection';
import { WorkProcessSection } from './components/WorkProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { RFPModal } from './components/RFPModal';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Project } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isRFPModalOpen, setIsRFPModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedHeroProject, setSelectedHeroProject] = useState<Project | null>(null);

  // Synchronize route state with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update active section on scroll when on homepage
  useEffect(() => {
    if (currentPath !== '/') return;

    const sectionIds = ['hero', 'overview', 'capabilities', 'projects', 'industries', 'tech-stack', 'process', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Navigate function supporting SPA routes (/ and /projects)
  const handleNavigate = (target: string) => {
    if (target === 'projects' || target === '/projects') {
      if (window.location.pathname !== '/projects') {
        window.history.pushState({}, '', '/projects');
      }
      setCurrentPath('/projects');
      setActiveSection('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Go to home page if currently on /projects
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }

    setActiveSection(target);
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const isProjectsPage = currentPath === '/projects';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-[#0062BD]">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={isProjectsPage ? 'projects' : activeSection}
        onNavigate={(sectionId) => handleNavigate(sectionId)}
        onOpenRFP={() => setIsRFPModalOpen(true)}
      />

      <main>
        {isProjectsPage ? (
          /* Standalone Projects Page (/projects) */
          <ProjectsPage
            onNavigateHome={(sectionId) => handleNavigate(sectionId || 'hero')}
            onOpenRFP={() => setIsRFPModalOpen(true)}
          />
        ) : (
          /* Homepage Layout */
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreProjects={() => handleNavigate('projects')}
              onContactTeam={() => setIsContactModalOpen(true)}
              onStartProject={() => setIsRFPModalOpen(true)}
              onSelectProject={(proj) => setSelectedHeroProject(proj)}
            />

            {/* 2. Company Overview */}
            <CompanyOverview />

            {/* 3. Key Capabilities */}
            <CapabilitiesSection />

            {/* 4. Why Organizations Trust Us */}
            <TrustSection />

            {/* 5. Featured Projects (From PDF Catalog) */}
            <ProjectsSection
              onOpenRFP={() => setIsRFPModalOpen(true)}
              onNavigateProjects={() => handleNavigate('projects')}
            />

            {/* 6. Industries We Serve */}
            <IndustriesSection />

            {/* 7. Technology Stack */}
            <TechStackSection />

            {/* 8. Statistics */}
            <StatsSection />

            {/* 9. Work Process */}
            <WorkProcessSection />

            {/* 10. Testimonials */}
            <TestimonialsSection />

            {/* 11. Final CTA */}
            <FinalCTASection
              onContactUs={() => setIsContactModalOpen(true)}
              onStartProject={() => setIsRFPModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(sectionId) => handleNavigate(sectionId)}
        onOpenRFP={() => setIsRFPModalOpen(true)}
      />

      {/* Interactive RFP Modal */}
      <RFPModal
        isOpen={isRFPModalOpen}
        onClose={() => setIsRFPModalOpen(false)}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Interactive Project Case Study Modal from Hero */}
      <ProjectDetailModal
        project={selectedHeroProject}
        onClose={() => setSelectedHeroProject(null)}
        onOpenRFP={() => {
          setSelectedHeroProject(null);
          setIsRFPModalOpen(true);
        }}
      />
    </div>
  );
}
