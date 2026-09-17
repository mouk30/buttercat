import React from 'react';
import {
  MapPin,
  BookOpen,
  Instagram,
  Youtube,
  Globe,
  Check,
  ArrowRight,
  TrendingUp,
  Star,
  Search,
  Sparkles,
  Layers,
  Users,
  Target,
  FileText,
  Video,
  Crosshair,
  PlayCircle,
  BarChart3,
  MousePointer,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../data/marketingData';
import { ServiceId } from '../types';

interface ServiceDetailSectionProps {
  activeTab: ServiceId;
  onTabChange: (id: ServiceId) => void;
  onSelectPackage: (serviceTitle: string, packageName: string) => void;
}

export const ServiceDetailSection: React.FC<ServiceDetailSectionProps> = ({
  activeTab,
  onTabChange,
  onSelectPackage
}) => {
  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const getServiceIcon = (id: ServiceId, className = 'w-5 h-5') => {
    switch (id) {
      case 'naver-place':
        return <MapPin className={className} />;
      case 'naver-blog':
        return <BookOpen className={className} />;
      case 'instagram':
        return <Instagram className={className} />;
      case 'google-youtube':
        return <Youtube className={className} />;
      case 'website':
        return <Globe className={className} />;
    }
  };

  const getStrategyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5 text-blue-600" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'Target':
        return <Target className="w-5 h-5 text-rose-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'Video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-pink-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-600" />;
      case 'Crosshair':
        return <Crosshair className="w-5 h-5 text-red-600" />;
      case 'PlayCircle':
        return <PlayCircle className="w-5 h-5 text-red-600" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'MousePointer':
        return <MousePointer className="w-5 h-5 text-violet-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="services-detail" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 inline-block mb-3 shadow-2xs">
            운영 광고 취급 상품 상세 플랜
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            상품별 실행 전략 및 맞춤 패키지
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            클릭 한 번으로 각 상품별 핵심 실행 전략, 기대 효과, 투명한 정가제 패키지를 확인하세요.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === activeTab;
            return (
              <button
                key={service.id}
                id={service.id}
                onClick={() => onTabChange(service.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.03]'
                    : 'bg-slate-50 text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 border border-slate-200/90 shadow-2xs'
                }`}
              >
                {getServiceIcon(
                  service.id,
                  isActive ? 'w-4 h-4 text-white' : 'w-4 h-4 text-slate-500'
                )}
                <span>{service.title}</span>
                {service.id === 'website' && (
                  <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-md">
                    가성비
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Main Content in Bright Pristine Surface */}
        <div className="bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          {/* Subtle colored backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* Service Banner Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  {getServiceIcon(currentService.id, 'w-6 h-6 text-blue-600')}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${currentService.badgeColor}`}
                >
                  {currentService.tag}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                {currentService.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
                {currentService.subtitle}
              </p>
            </div>

            {/* Expected Effect Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              {currentService.expectedEffects.map((eff, i) => (
                <div key={i} className="text-center px-1">
                  <div className="text-lg sm:text-2xl font-black text-blue-600 tracking-tight">
                    {eff.metric}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{eff.label}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{eff.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Strategies Grid */}
          <div className="py-10">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {currentService.title} 핵심 실행 전략 (3-Pillar)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentService.keyStrategies.map((strat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="p-3 rounded-xl bg-slate-50 w-fit mb-4 border border-slate-100 shadow-2xs">
                    {getStrategyIcon(strat.icon)}
                  </div>
                  <h5 className="text-base font-black text-slate-900 mb-2">{strat.title}</h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {strat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Points Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-12 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              버터캣 {currentService.title}만의 독보적 차별점
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentService.highlightPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tailored Consultation & Strategy Callout (Replacing static price packages) */}
          <div className="bg-white rounded-3xl border border-blue-200/90 p-8 sm:p-10 shadow-lg shadow-blue-500/5 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>업종 & 상권별 1:1 맞춤형 플랜</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                  {currentService.title}, 우리 매장/기업에 꼭 맞는 최적의 전략은?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  천편일률적인 고정 패키지 대신, 대표님의 지역 상권 난이도와 경쟁사 노출 현황을 정밀 분석하여 불필요한 비용 낭비 없는 1:1 맞춤형 실행 로드맵을 설계해 드립니다.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>상권 및 키워드 난이도 무료 사전 진단</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1개월 단위 유연한 집행 및 위약금 0원</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>전담 마케터 1:1 배정 & 주간 투명 리포트</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={() => onSelectPackage(currentService.title, '1:1 맞춤 진단')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{currentService.title} 무료 진단 신청</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-500 text-center font-medium">
                  * 24시간 이내 담당 디렉터가 직접 연락드립니다
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
