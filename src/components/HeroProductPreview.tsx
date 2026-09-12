import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Shield,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';

interface ProjectDisplayMeta {
  shortLabel: string;
  sublabel: string;
  techBadge: string;
  domainUrl: string;
  statusText: string;
}

const PROJECT_META_MAP: Record<string, ProjectDisplayMeta> = {
  'project-rasad': {
    shortLabel: 'سامانه رصد',
    sublabel: 'پایش زنده ناوگان',
    techBadge: 'GPS / IoT',
    domainUrl: 'fleet.monitoring.internal',
    statusText: 'عملیاتی و برخط'
  },
  'project-hsse-ai': {
    shortLabel: 'HSSE.AI',
    sublabel: 'ایمنی و بینایی ماشین',
    techBadge: 'Computer Vision',
    domainUrl: 'hsse-ai.vision.internal',
    statusText: 'عملیاتی سازمانی'
  },
  'project-lms': {
    shortLabel: 'LMS سازمانی',
    sublabel: 'آموزش و کلاس مجازی',
    techBadge: 'Cloud LMS',
    domainUrl: 'lms.enterprise.internal',
    statusText: 'بهره‌برداری فعال'
  },
  'project-estedad': {
    shortLabel: 'استعدادیابی',
    sublabel: 'سنجش و هدایت شغلی',
    techBadge: 'EdTech / AI',
    domainUrl: 'talent.assessment.platform',
    statusText: 'برخط کشوری'
  },
  'project-dama': {
    shortLabel: 'زیرساخت داما',
    sublabel: 'خوشه پردازش هوش مصنوعی',
    techBadge: 'GPU Cluster',
    domainUrl: 'dama.ai-infra.internal',
    statusText: 'پایپ‌لاین فعال'
  }
};

interface HeroProductPreviewProps {
  onExploreProjects: () => void;
  onSelectProject?: (project: Project) => void;
}

export const HeroProductPreview: React.FC<HeroProductPreviewProps> = ({
  onExploreProjects,
  onSelectProject
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const projects = PROJECTS_DATA;
  const totalProjects = projects.length;

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Auto-rotation timer (4.5 seconds per slide)
  useEffect(() => {
    if (isHovered || isFocused || isUserPaused || prefersReducedMotion) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [goToNext, isHovered, isFocused, isUserPaused, prefersReducedMotion]);

  const activeProject = projects[currentIndex];
  const meta = PROJECT_META_MAP[activeProject.id] || {
    shortLabel: activeProject.title,
    sublabel: activeProject.category,
    techBadge: activeProject.techTags[0] || 'Enterprise',
    domainUrl: 'system.enterprise.internal',
    statusText: activeProject.status
  };

  // Keyboard navigation for tab list
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextIndex = (index + 1) % totalProjects;
      setCurrentIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const prevIndex = (index - 1 + totalProjects) % totalProjects;
      setCurrentIndex(prevIndex);
      tabRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(totalProjects - 1);
      tabRefs.current[totalProjects - 1]?.focus();
    }
  };

  const handleProjectClick = () => {
    if (onSelectProject) {
      onSelectProject(activeProject);
    } else {
      onExploreProjects();
    }
  };

  return (
    <div
      role="region"
      aria-roledescriptor="carousel"
      aria-label="ویترین پروژه‌های شاخص سازمانی"
      className="relative w-full max-w-2xl mx-auto lg:max-w-none font-vazir"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Screen Reader Live Region for Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        نمایش {activeProject.title}، پروژه {currentIndex + 1} از {totalProjects}
      </div>

      {/* 1. Interactive 5-Project Tab Selector */}
      <div
        role="tablist"
        aria-label="فهرست سامانه‌های شاخص"
        className="flex items-center p-1.5 bg-slate-100/95 rounded-t-lg border-t border-x border-slate-200/90 gap-1 overflow-x-auto select-none no-scrollbar"
      >
        {projects.map((proj, idx) => {
          const isActive = idx === currentIndex;
          const pMeta = PROJECT_META_MAP[proj.id] || {
            shortLabel: proj.title,
            sublabel: proj.category,
            techBadge: proj.techTags[0] || 'Tech',
            domainUrl: '',
            statusText: ''
          };

          return (
            <button
              key={proj.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              role="tab"
              id={`hero-tab-${proj.id}`}
              aria-selected={isActive}
              aria-controls={`hero-panel-${proj.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setCurrentIndex(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={`flex-1 min-w-[100px] sm:min-w-0 flex items-center justify-between py-2 px-2.5 sm:px-3 rounded-md text-right transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0062BD] ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center space-x-1.5 space-x-reverse min-w-0">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                    isActive ? 'bg-[#0062BD]' : 'bg-slate-300'
                  }`}
                />
                <span className="text-xs sm:text-sm font-black block truncate leading-tight">
                  {pMeta.shortLabel}
                </span>
              </div>

              <span
                dir="ltr"
                className={`hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-sm font-sans shrink-0 font-bold ${
                  isActive
                    ? 'bg-blue-50 text-[#0062BD] border border-blue-100'
                    : 'bg-slate-200/70 text-slate-600'
                }`}
              >
                {pMeta.techBadge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Main Enterprise Window Frame */}
      <div
        role="tabpanel"
        id={`hero-panel-${activeProject.id}`}
        aria-labelledby={`hero-tab-${activeProject.id}`}
        className="bg-white border-x border-b border-slate-200/90 rounded-b-lg shadow-xl overflow-hidden"
      >
        {/* Browser Chrome Header */}
        <div className="bg-slate-100/90 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 select-none">
          {/* Left: Window Control Buttons & Carousel Controls */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Window control dots */}
            <div className="flex items-center space-x-1.5" dir="ltr">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
            </div>

            {/* Prev / Next Navigation Arrows */}
            <div className="flex items-center space-x-1 space-x-reverse pr-2 border-r border-slate-200">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="پروژه قبلی"
                className="p-1 rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#0062BD]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="پروژه بعدی"
                className="p-1 rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#0062BD]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pause / Play Toggle */}
              <button
                type="button"
                onClick={() => setIsUserPaused((prev) => !prev)}
                aria-label={isUserPaused ? 'ادامه چرخش خودکار ویترین' : 'توقف چرخش خودکار ویترین'}
                className="p-1 rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#0062BD]"
              >
                {isUserPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Center: Secure Environment Address Bar */}
          <div
            className="flex items-center space-x-1.5 space-x-reverse bg-white px-3 py-1 rounded-sm border border-slate-200 text-xs font-sans text-slate-600 max-w-[210px] sm:max-w-xs truncate"
            dir="ltr"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate text-slate-700 font-medium">{meta.domainUrl}</span>
          </div>

          {/* Right: Live Operational Status Tag */}
          <div className="flex items-center space-x-1.5 space-x-reverse shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">
              {meta.statusText}
            </span>
          </div>
        </div>

        {/* 3. Real Screenshot Preview Stage */}
        <div
          className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden group cursor-pointer"
          onClick={handleProjectClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProjectClick();
            }
          }}
          aria-label={`مشاهده مطالعه موردی سامانه ${activeProject.title}`}
        >
          <img
            key={activeProject.id}
            src={activeProject.imagePath}
            alt={`اسکرین‌شات محیط کاربری واقعی ${activeProject.title}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />

          {/* Screen Overlay on Hover */}
          <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <span className="inline-flex items-center space-x-2 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-4 py-2 rounded-sm text-xs font-bold shadow-lg transition-transform transform translate-y-1 group-hover:translate-y-0">
              <span>مشاهده مطالعه موردی و معماری سامانه</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </span>
          </div>

          {/* Slide Indicator Dots (Overlay at top-left) */}
          <div
            className="absolute top-3 right-3 flex items-center space-x-1.5 space-x-reverse bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-700/80"
            dir="ltr"
          >
            {projects.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`برو به پروژه ${dotIdx + 1}`}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-5 bg-[#0062BD]'
                    : 'bg-slate-400/60 hover:bg-white'
                }`}
              />
            ))}
          </div>

          {/* Watermark Label */}
          <div className="absolute bottom-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-sm border border-slate-700/80 font-bold pointer-events-none">
            نمایش مستند رابط کاربری سامانه
          </div>
        </div>

        {/* 4. Feature Highlights Footer Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
          <div className="min-w-0">
            <div className="flex items-center space-x-2 space-x-reverse mb-0.5">
              <span className="text-xs font-bold text-[#0062BD]">
                {activeProject.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-bold truncate">
                {activeProject.clientType}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug truncate">
              {activeProject.title}
            </h3>
          </div>

          {/* Tech Tags / Action Button */}
          <div className="flex items-center space-x-2 space-x-reverse shrink-0">
            <div className="hidden sm:flex flex-wrap items-center gap-1.5">
              {activeProject.techTags.slice(0, 3).map((feat, idx) => (
                <span
                  key={idx}
                  dir="ltr"
                  className="inline-flex items-center text-[11px] font-sans font-medium px-2 py-0.5 rounded-sm bg-white text-slate-700 border border-slate-200 shadow-2xs"
                >
                  {feat}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleProjectClick}
              className="inline-flex items-center space-x-1.5 space-x-reverse bg-white hover:bg-slate-100 text-[#0062BD] border border-blue-200 px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer"
            >
              <span>مطالعه موردی</span>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
