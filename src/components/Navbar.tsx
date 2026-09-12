import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, ChevronLeft } from 'lucide-react';
import { NavigationItem } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRFP: () => void;
}

const NAV_ITEMS: NavigationItem[] = [
  { id: 'hero', label: 'خانه', href: '#hero' },
  { id: 'overview', label: 'درباره ما', href: '#overview' },
  { id: 'capabilities', label: 'توانمندی‌ها', href: '#capabilities' },
  { id: 'projects', label: 'پروژه‌ها', href: '#projects' },
  { id: 'industries', label: 'صنایع', href: '#industries' },
  { id: 'tech-stack', label: 'فناوری‌ها', href: '#tech-stack' },
  { id: 'process', label: 'فرآیند کار', href: '#process' },
  { id: 'contact', label: 'تماس با ما', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenRFP
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-vazir">
        <div className="flex items-center justify-between">
          {/* Brand Logo - DTSAI Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center focus:outline-none group cursor-pointer shrink-0 transition-opacity hover:opacity-90"
            aria-label="صفحه اصلی"
            id="brand-logo-btn"
          >
            <Logo variant="full" className="h-8 sm:h-9 md:h-11 lg:h-12" lightBackground={true} />
          </button>

          {/* Desktop Navigation Links - Generous Balanced Spacing */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12 space-x-reverse">
            {NAV_ITEMS.slice(0, 7).map((item) => {
              const isActive = activeSection === item.id;
              // Add extra distinct horizontal spacing specifically before 'process' (after 'tech-stack')
              const isProcess = item.id === 'process';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`text-sm font-bold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isProcess ? 'mr-6 xl:mr-10' : ''
                  } ${
                    isActive
                      ? 'text-[#0062BD] border-b-2 border-[#0062BD] pb-0.5'
                      : 'text-slate-700 hover:text-[#0062BD]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onOpenRFP}
              id="start-project-btn"
              className="px-6 py-2.5 bg-[#0062BD] hover:bg-[#004e9a] text-white text-sm font-bold rounded-sm transition-colors cursor-pointer flex items-center space-x-2 space-x-reverse shadow-xs"
            >
              <span>شروع همکاری</span>
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="منوی سایت"
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200 font-vazir">
          <div className="flex flex-col space-y-1 pt-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-bold text-right ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-[#0062BD]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRFP();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-5 py-3 rounded-sm font-bold text-sm transition-colors cursor-pointer"
            >
              <span>شروع همکاری و درخواست مشاوره</span>
              <ArrowLeft className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
