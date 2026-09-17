import React from 'react';
import { MapPin, BookOpen, Instagram, Youtube, Globe, ArrowRight, Check, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { SERVICES_DATA } from '../data/marketingData';
import { ServiceId } from '../types';

interface ServiceOverviewProps {
  onSelectServiceTab: (id: ServiceId) => void;
  onOpenConsultationModal: (serviceId?: string) => void;
}

export const ServiceOverview: React.FC<ServiceOverviewProps> = ({
  onSelectServiceTab,
  onOpenConsultationModal
}) => {
  const getServiceStyling = (id: ServiceId) => {
    switch (id) {
      case 'naver-place':
        return {
          icon: <MapPin className="w-6 h-6 text-emerald-600" />,
          iconBg: 'bg-emerald-50 border-emerald-200',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          hoverBorder: 'hover:border-emerald-400 hover:shadow-emerald-500/10',
          accentText: 'text-emerald-700',
        };
      case 'naver-blog':
        return {
          icon: <BookOpen className="w-6 h-6 text-green-600" />,
          iconBg: 'bg-green-50 border-green-200',
          badgeClass: 'bg-green-50 text-green-700 border-green-200',
          hoverBorder: 'hover:border-green-400 hover:shadow-green-500/10',
          accentText: 'text-green-700',
        };
      case 'instagram':
        return {
          icon: <Instagram className="w-6 h-6 text-rose-600" />,
          iconBg: 'bg-rose-50 border-rose-200',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
          hoverBorder: 'hover:border-rose-400 hover:shadow-rose-500/10',
          accentText: 'text-rose-700',
        };
      case 'google-youtube':
        return {
          icon: <Youtube className="w-6 h-6 text-red-600" />,
          iconBg: 'bg-red-50 border-red-200',
          badgeClass: 'bg-red-50 text-red-700 border-red-200',
          hoverBorder: 'hover:border-red-400 hover:shadow-red-500/10',
          accentText: 'text-red-700',
        };
      case 'website':
        return {
          icon: <Globe className="w-6 h-6 text-indigo-600" />,
          iconBg: 'bg-indigo-50 border-indigo-200',
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          hoverBorder: 'hover:border-indigo-400 hover:shadow-indigo-500/10',
          accentText: 'text-indigo-700',
        };
    }
  };

  return (
    <section id="services-overview" className="py-24 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>버터캣 5대 핵심 광고 취급 상품</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            고객의 검색부터 구매까지,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              빈틈없는 5대 마케팅 솔루션
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            사업장 위치 지도 검색부터 포털 신뢰 리뷰, 감각적인 SNS 릴스, 구매 의도 높은 구글 검색,
            그리고 신뢰의 정점인 가성비 반응형 홈페이지까지 원스톱으로 관리해 드립니다.
          </p>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const style = getServiceStyling(service.id);
            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md shadow-slate-200/50 hover:shadow-xl ${style.hoverBorder} ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Header with icon & badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl border ${style.iconBg} shadow-2xs`}>
                      {style.icon}
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${style.badgeClass}`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title and descriptions */}
                  <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
                    {service.title}
                  </h3>
                  <p className={`text-xs font-bold ${style.accentText} mb-3`}>
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-7 border-t border-slate-100 pt-5">
                    {service.highlightPoints.slice(0, 3).map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom buttons */}
                <div className="pt-5 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectServiceTab(service.id)}
                    className="flex-1 py-3 px-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/90 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>실행 전략 상세</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenConsultationModal(service.id)}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all whitespace-nowrap shadow-sm shadow-blue-500/20 cursor-pointer"
                  >
                    상담 신청
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Strategy Recommendation Card in Fresh Sky/Indigo gradient */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-3xl p-7 flex flex-col justify-between shadow-xl shadow-blue-600/20">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-white/20 text-white backdrop-blur-xs">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 uppercase tracking-wide">
                  무료 맞춤 컨설팅
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                내 업종에 딱 맞는 최적의 광고 믹스
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                어떤 채널을 어떻게 조합해야 불필요한 광고비 지출 없이 실제 방문과 매출로 이어질까요? 전문 마케팅 디렉터가 1:1 맞춤 로드맵을 무료로 작성해 드립니다.
              </p>
              <div className="space-y-2.5 text-xs text-white/95 font-medium mb-7 bg-white/10 rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>외식·카페:</strong> 플레이스 지도 + 블로그 체험단 집중</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>뷰티·피트니스:</strong> 인스타 릴스 + 가성비 모바일 랜딩</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span><strong>B2B·전문직:</strong> 구글 검색광고 + 네이버 브랜드 블로그</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenConsultationModal()}
              className="w-full py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>1분 만에 맞춤 포트폴리오 추천받기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
