import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { CASE_STUDIES } from '../data/marketingData';

interface CaseStudiesProps {
  onOpenConsultationModal: (category?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultationModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '외식업 / 맛집', '뷰티 / 에스테틱', '피트니스 / PT', '이커머스 / 쇼핑몰'];

  const filteredCases =
    selectedCategory === '전체'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="case-studies" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>실제 집행 데이터로 증명하는 성과</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            숫자로 말하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">버터캣 고객 성공 사례</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            동일한 예산이라도 타겟과 채널 설계에 따라 결과는 완전히 달라집니다. 업종별 실제 매출 성장 지표를 확인하세요.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-extrabold ring-2 ring-emerald-600'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/60 rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between hover:border-emerald-400 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group"
            >
              <div>
                {/* Category & Services tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {item.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.serviceUsed.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Name & Case Title */}
                <div className="text-xs text-slate-500 font-semibold mb-1">{item.clientName}</div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.summary}</p>

                {/* Before & After Metrics Box */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">도입 전 상태</span>
                    <span className="text-slate-700 font-semibold">{item.beforeMetric}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 text-xs sm:text-sm">
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" /> 도입 후 성과
                    </span>
                    <div className="text-right">
                      <span className="text-slate-900 font-black">{item.afterMetric}</span>
                      <span className="ml-2 font-black text-emerald-600 text-sm sm:text-base">
                        ({item.growthRate})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom footer: key action & CTA */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.duration}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-700 font-semibold truncate">{item.keyAction}</span>
                </div>
                <button
                  onClick={() => onOpenConsultationModal(item.category)}
                  className="inline-flex items-center gap-1 text-emerald-700 font-extrabold hover:text-emerald-800 hover:underline underline-offset-2 shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  <span>유사 사례 진단 신청</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner in Vibrant Fresh Gradient */}
        <div className="mt-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xl shadow-blue-500/20 text-white">
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              다음 성공 사례의 주인공은 대표님의 비즈니스입니다
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              현재 상권과 경쟁사 노출 순위를 1:1로 정밀 분석하여 맞춤 로드맵을 무료로 설계해 드립니다.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultationModal()}
            className="mt-5 sm:mt-0 px-7 py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs sm:text-sm shadow-lg whitespace-nowrap transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            내 매장 무료 분석 신청하기
          </button>
        </div>
      </div>
    </section>
  );
};
