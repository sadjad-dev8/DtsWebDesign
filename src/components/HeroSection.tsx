import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Server, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { HeroProductPreview } from './HeroProductPreview';
import { Project } from '../types';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onContactTeam: () => void;
  onStartProject: () => void;
  onSelectProject?: (project: Project) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onContactTeam,
  onSelectProject
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas animation for abstract enterprise network topology
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create interconnected network nodes
    const nodeCount = Math.min(Math.floor(width / 32), 40);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      isHub?: boolean;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: i % 7 === 0 ? 4 : 2,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        isHub: i % 7 === 0
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines in background
      ctx.strokeStyle = 'rgba(0, 98, 189, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes & connection lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            if (node.isHub || nodeB.isHub) {
              ctx.strokeStyle = `rgba(0, 210, 255, ${alpha * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(0, 98, 189, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);

        if (node.isHub) {
          ctx.fillStyle = '#00D2FF';
          ctx.shadowColor = 'rgba(0, 210, 255, 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#0062BD';
          ctx.shadowColor = 'rgba(0, 98, 189, 0.3)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white border-b border-slate-100 font-vazir">
      {/* Background Abstract Topology Canvas (Subtle Supporting Visual Layer) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Decorative subtle ambient blur highlights */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced Split Composition (Desktop 2-Column, Mobile Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column: Corporate Messaging & CTA Hierarchy */}
          <div className="lg:col-span-6 text-right">
            {/* Eyebrow Capability Statement */}
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#0062BD] text-xs font-bold border-r-3 border-[#0062BD] mb-5 shadow-2xs">
              <span>شرکت مهندسی نرم‌افزار و زیرساخت هوش مصنوعی</span>
            </div>

            {/* Main Tangible B2B Capability Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.25] mb-5 font-vazir tracking-tight">
              طراحی و استقرار سامانه‌های کلان نرم‌افزاری،{' '}
              <span className="text-[#0062BD]">هوش مصنوعی</span> و{' '}
              <span className="text-[#0062BD]">پایش صنعتی</span>
            </h1>

            {/* Evidence-Supported Value Proposition Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              معماری، پیاده‌سازی و استقرار سامانه‌های سازمانی، پلتفرم‌های هوش مصنوعی، زیرساخت‌های ابری و راهکارهای پایش هوشمند؛ با تکیه بر تجربه پروژه‌های واقعی و زیرساخت‌های قابل استقرار در محیط‌های سازمانی.
            </p>

            {/* Clear CTA Hierarchy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary Dominant CTA */}
              <button
                onClick={onExploreProjects}
                id="hero-explore-projects-btn"
                className="inline-flex items-center justify-center space-x-2 space-x-reverse bg-[#0062BD] hover:bg-[#004e9a] text-white px-7 py-3.5 rounded-sm font-bold text-base transition-colors shadow-sm cursor-pointer"
              >
                <span>بررسی پروژه‌ها و دمو</span>
                <ArrowLeft className="w-5 h-5 mr-1" />
              </button>

              {/* Secondary Subordinate CTA */}
              <button
                onClick={onContactTeam}
                id="hero-contact-team-btn"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-7 py-3.5 rounded-sm font-bold text-base transition-colors cursor-pointer"
              >
                <span>درخواست جلسه فنی</span>
              </button>
            </div>
          </div>

          {/* Left Column: Authentic Product Preview Showcase */}
          <div className="lg:col-span-6 w-full">
            <HeroProductPreview
              onExploreProjects={onExploreProjects}
              onSelectProject={onSelectProject}
            />
          </div>
        </div>

        {/* Compact Trust Highlights Bar (Balanced Foundation) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
          <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50/80 border border-slate-200/80">
            <CheckCircle2 className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                <span dir="ltr" className="font-sans inline-block">ISO 27001</span> و پدافند
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">امنیت سازمانی و شرکتی</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50/80 border border-slate-200/80">
            <Server className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                ابر اختصاصی <span dir="ltr" className="font-sans inline-block">Zero-Trust</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">شبکه‌های ایزوله <span dir="ltr" className="font-sans inline-block">(Air-Gap)</span></p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50/80 border border-slate-200/80">
            <Cpu className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                پایداری <span dir="ltr" className="inline-block font-sans">۹۹٫۹۹۹٪</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">سطح سرویس حیاتی <span dir="ltr" className="font-sans inline-block">SLA</span></p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-sm bg-slate-50/80 border border-slate-200/80">
            <Globe className="w-5 h-5 text-[#0062BD] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                <span dir="ltr" className="inline-block font-sans">+۱۰۰</span> سامانه ملی
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">استقرار در سطح کشوری</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

