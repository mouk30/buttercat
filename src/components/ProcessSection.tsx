import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { PROCESS_STEPS } from '../data/marketingData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 inline-block mb-3 shadow-2xs">
            실패 없는 5단계 프로세스
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            체계적인 데이터 기반 마케팅 워크플로우
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            주먹구구식 광고 집행은 예산 낭비일 뿐입니다. 정밀 분석부터 사후 리포트까지 1:1 전담 디렉터가 밀착 리드합니다.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-blue-400 transition-all duration-300 shadow-md shadow-slate-200/50 hover:shadow-xl group"
            >
              <div>
                {/* Step Number */}
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-3 tracking-tighter">
                  {step.step}
                </div>

                <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{step.description}</p>
              </div>

              {/* Step details checklist */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-700 font-medium">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-700 shadow-lg shadow-slate-200/40">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 block text-sm sm:text-base">
                투명하고 안전한 100% 클린 가이드라인 준수
              </span>
              <span className="text-slate-500 text-xs sm:text-sm">
                불법 매크로 및 어뷰징 0%! 네이버·구글·메타의 최신 공식 알고리즘 가이드라인을 철저히 준수합니다.
              </span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 whitespace-nowrap shadow-2xs">
            클린 마케팅 인증
          </div>
        </div>
      </div>
    </section>
  );
};
