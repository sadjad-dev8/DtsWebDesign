import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChevronLeft,
  X,
  ExternalLink
} from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenRFP: () => void;
  onNavigateProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenRFP,
  onNavigateProjects
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Show featured projects from catalog
  const featuredProjects = PROJECTS_DATA;

  return (
    <section id="projects" className="py-24 bg-white border-b border-slate-200/80 font-vazir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-right">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3.5 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD] mb-4">
              <span>پروژه‌های کلان کاتالوگ شرکت</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 font-vazir">
              پروژه‌های شاخص اجرا شده
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              مروری بر برترین سامانه‌ها و زیرساخت‌های مهندسی شده بومی برای وزارتخانه‌ها، نهادها و صنایع کشور.
            </p>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse shrink-0">
            <button
              onClick={onNavigateProjects}
              id="goto-all-projects-btn"
              className="inline-flex items-center space-x-2 space-x-reverse bg-white hover:bg-slate-50 text-[#0062BD] border-2 border-[#0062BD] px-6 py-3 rounded-sm font-bold text-sm transition-all shadow-2xs cursor-pointer"
            >
              <span>مشاهده تمامی پروژه‌ها</span>
              <ChevronLeft className="w-4 h-4 mr-1" />
            </button>
          </div>
        </div>

        {/* Project Cards Grid - 3 Strongest PDF Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              id={`project-card-${project.id}`}
              className="group bg-white rounded-sm border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image & Status Badge Header */}
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

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {project.status.includes('بهره‌برداری') || project.status === 'Completed' ? (
                      <span className="inline-flex items-center space-x-1 space-x-reverse px-2.5 py-1 rounded-sm bg-emerald-600 text-white text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>اجرا شده</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 space-x-reverse px-2.5 py-1 rounded-sm bg-blue-600 text-white text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>در حال استقرار</span>
                      </span>
                    )}
                  </div>

                  {/* Client Type Overlay */}
                  <div className="absolute bottom-3 right-4 left-4 text-xs font-bold text-slate-200 truncate text-right">
                    {project.clientType}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 text-right">
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#0062BD] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techTags.slice(0, 4).map((tag, idx) => (
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

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs font-bold text-[#0062BD] group-hover:text-[#004e9a]">
                <span>مشاهده مطالعه موردی</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Banner */}
        <div className="bg-slate-50 rounded-sm p-8 border border-slate-200 text-right flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              بررسی تمامی پروژه‌ها و راهکارهای تخصصی مجموعه ما
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              جهت مشاهده جزئیات کامل پروژه‌های سامانه رصد، LMS، استعدادیابی آنلاین، زیرساخت هوش مصنوعی داما و سامانه پایش ایمنی HSSE.AI به صفحه پروژه‌ها مراجعه فرمایید.
            </p>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse shrink-0">
            <button
              onClick={onNavigateProjects}
              id="view-all-projects-bottom-btn"
              className="bg-[#0062BD] hover:bg-[#004e9a] text-white px-7 py-3.5 rounded-sm font-bold text-sm transition-all duration-200 shadow-2xs cursor-pointer inline-flex items-center space-x-2 space-x-reverse"
            >
              <span>مشاهده تمامی پروژه‌ها</span>
              <ChevronLeft className="w-4 h-4 mr-1" />
            </button>
            <button
              onClick={onOpenRFP}
              id="request-proposal-btn"
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-5 py-3.5 rounded-sm font-bold text-sm transition-colors cursor-pointer"
            >
              درخواست جلسه و پروپوزال (RFP)
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenRFP={onOpenRFP}
      />
    </section>
  );
};
