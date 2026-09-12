import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Search,
  Filter,
  X,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ExternalLink,
  Layers,
  Cpu,
  Cloud,
  Code2
} from 'lucide-react';
import { ALL_PROJECTS } from '../data';
import { Project } from '../types';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsPageProps {
  onNavigateHome: () => void;
  onOpenRFP: () => void;
  initialSelectedProjectId?: string | null;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigateHome,
  onOpenRFP,
  initialSelectedProjectId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialSelectedProjectId) {
      const found = ALL_PROJECTS.find((p) => p.id === initialSelectedProjectId);
      if (found) {
        setSelectedProject(found);
      }
    }
  }, [initialSelectedProjectId]);

  const categories = [
    { id: 'all', label: 'تمامی پروژه‌ها' },
    { id: 'سامانه دیجیتال شرکتی', label: 'سامانه‌های شرکتی' },
    { id: 'نرم‌افزار سازمانی', label: 'نرم‌افزار سازمانی' },
    { id: 'هوش مصنوعی و داده‌کاوی', label: 'هوش مصنوعی' },
    { id: 'زیرساخت ابری', label: 'زیرساخت ابری' },
    { id: 'یکپارچه‌سازی سازمانی', label: 'یکپارچه‌سازی و گذرگاه داده' },
    { id: 'امنیت و پدافند غیرعامل', label: 'امنیت و پدافند غیرعامل' }
  ];

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      project.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      project.clientType.toLowerCase().includes(query) ||
      project.techTags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-vazir selection:bg-sky-100 selection:text-[#0062BD]">
      {/* Header / Navbar */}
      <Navbar
        activeSection="projects"
        onNavigate={(section) => {
          if (section === 'projects') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onNavigateHome();
          }
        }}
        onOpenRFP={onOpenRFP}
      />

      <main className="pt-24 pb-20">
        {/* Top Hero Section */}
        <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
          {/* Grid Background Overlay */}
          <div className="absolute inset-0 opacity-10 bg-enterprise-grid pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
            {/* Breadcrumb & Back */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/80">
              <div className="flex items-center space-x-2 space-x-reverse text-xs text-slate-400 font-bold">
                <button
                  onClick={onNavigateHome}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  صفحه اصلی
                </button>
                <span>/</span>
                <span className="text-[#00D2FF]">کاتالوگ پروژه‌ها و دستاوردهای ملی</span>
              </div>

              <button
                onClick={onNavigateHome}
                id="back-to-home-btn"
                className="inline-flex items-center space-x-2 space-x-reverse bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-sm text-xs font-bold transition-colors cursor-pointer border border-slate-700"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                <span>بازگشت به صفحه اصلی</span>
              </button>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3.5 py-1 bg-blue-500/10 text-[#00D2FF] text-xs font-bold border-r-3 border-[#00D2FF] mb-4">
                <span>شناسنامه فنی و کارنامه عملیاتی</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
                پروژه‌های کلان و سامانه‌های بومی
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                مروری جامع بر پروژه‌ها و زیرساخت‌های نرم‌افزاری اجرا شده توسط این مجموعه مهندسی. کلیه سامانه‌ها با رعایت دقیق الزامات مدیریت داده، معماری Zero-Trust و پایداری ۹۹٫۹۹۹٪ تحویل گردیده‌اند.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search Bar Section */}
        <section className="bg-slate-50 border-b border-slate-200 py-6 sticky top-[68px] z-30 shadow-2xs backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      id={`filter-cat-${cat.id}`}
                      className={`whitespace-nowrap px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0062BD] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px] sm:min-w-[320px]">
                <input
                  type="text"
                  placeholder="جستجو در پروژه‌ها، فناوری‌ها و صنایع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-sm bg-white border border-slate-300 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0062BD] shadow-2xs"
                  id="project-search-input"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Cards Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 text-xs font-bold text-slate-600">
            <span>
              نمایش <strong className="text-slate-900 font-sans">{filteredProjects.length}</strong> پروژه از کاتالوگ رسمی
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[#0062BD] hover:underline cursor-pointer"
              >
                پاک‌سازی فیلترها
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-sm border border-slate-200 p-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-black text-slate-800 mb-1">پروژه‌ای با مشخصات جستجو شده یافت نشد</h3>
              <p className="text-xs text-slate-500 mb-4">لطفاً عبارت دیگری را جستجو کرده یا فیلتر دسته‌بندی را تغییر دهید.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-[#0062BD] text-white px-5 py-2 rounded-sm text-xs font-bold"
              >
                مشاهده تمامی پروژه‌ها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  id={`project-item-${project.id}`}
                  className="group bg-white rounded-sm border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer text-right"
                >
                  <div>
                    {/* Project Header Image */}
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={project.imagePath}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Category Tag */}
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-sm border border-slate-200 shadow-2xs">
                        <span className="text-xs font-bold text-[#0062BD]">
                          {project.category}
                        </span>
                      </div>

                      {/* Status Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center space-x-1 space-x-reverse px-2.5 py-1 rounded-sm bg-emerald-700 text-white text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3 ml-1" />
                          <span>{project.status}</span>
                        </span>
                      </div>

                      {/* Client Type Tag */}
                      <div className="absolute bottom-3 right-4 left-4 text-xs font-bold text-slate-200 truncate text-right">
                        {project.clientType}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#0062BD] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Impact Highlight Box */}
                      <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-sm mb-5 text-xs text-slate-800 font-bold leading-relaxed flex items-start space-x-2 space-x-reverse">
                        <CheckCircle2 className="w-4 h-4 text-[#0062BD] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{project.keyImpact[0]}</span>
                      </div>

                      {/* Technology Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.techTags.map((tag, idx) => (
                          <span
                            key={idx}
                            dir="ltr"
                            className="text-xs font-medium px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-sans"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Button */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs font-bold text-[#0062BD] group-hover:text-[#004e9a]">
                    <span>مشاهده مطالعه موردی</span>
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Enterprise Inquiry Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-slate-900 rounded-sm p-8 sm:p-12 text-white border border-slate-800 text-right flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold text-[#00D2FF] mb-2 block">همکاری با دفتر مهندسی زیرساخت</span>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                درخواست بررسی فنی و استعلام پروژه (RFP)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                چنانچه نیازمند مشاوره معماری، استعلام هزینه یا ثبت پروپوزال برای پروژه‌های ملی یا سازمانی خود هستید، مشخصات پروژه خود را ارسال نمایید.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={onOpenRFP}
                id="projects-page-rfp-btn"
                className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-8 py-4 rounded-sm font-bold text-sm transition-colors shadow-lg cursor-pointer flex items-center space-x-2 space-x-reverse"
              >
                <span>ثبت درخواست پروپوزال (RFP)</span>
                <ArrowLeft className="w-4 h-4 mr-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Detail Modal / Drawer with Gallery */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenRFP={onOpenRFP}
      />

      {/* Footer */}
      <Footer
        onNavigate={(sec) => {
          onNavigateHome();
        }}
        onOpenRFP={onOpenRFP}
      />
    </div>
  );
};
