import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  CheckSquare,
  Square,
  Building,
  Target,
  Send,
  MessageCircle
} from 'lucide-react';
import { INDUSTRY_OPTIONS, SERVICES_DATA } from '../data/marketingData';
import { ServiceId } from '../types';
import { copyAndOpenKakaoChat } from '../utils/kakaoFormat';

interface EstimateCalculatorProps {
  onApplyEstimate: (data: {
    industry: string;
    services: ServiceId[];
    estimatedMonthly: number;
    estimatedOnetime: number;
    summary: string;
  }) => void;
}

const MARKETING_GOALS = [
  { id: 'offline-footfall', label: '신규 오프라인 매장 방문 및 길찾기 증대', icon: 'MapPin' },
  { id: 'search-dominance', label: '네이버 상위 1~3위 검색 점유율 확보', icon: 'Search' },
  { id: 'review-trust', label: '영수증 및 블로그 체험단 실리뷰 축적', icon: 'Star' },
  { id: 'sns-viral', label: '인스타그램 릴스 & 숏폼 바이럴 확산', icon: 'Share2' },
  { id: 'website-conversion', label: '가성비 고전환 반응형 홈페이지 구축', icon: 'Globe' }
];

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ onApplyEstimate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [selectedGoal, setSelectedGoal] = useState(MARKETING_GOALS[0].id);
  const [selectedServices, setSelectedServices] = useState<Record<ServiceId, boolean>>({
    'naver-place': true,
    'naver-blog': true,
    'instagram': false,
    'google-youtube': false,
    'website': false
  });

  const toggleService = (id: ServiceId) => {
    setSelectedServices((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    setSelectedIndustry(INDUSTRY_OPTIONS[0]);
    setSelectedGoal(MARKETING_GOALS[0].id);
    setSelectedServices({
      'naver-place': true,
      'naver-blog': true,
      'instagram': false,
      'google-youtube': false,
      'website': false
    });
  };

  const activeServices = (Object.keys(selectedServices) as ServiceId[]).filter(
    (id) => selectedServices[id]
  );

  const handleApply = () => {
    const selectedServiceNames = activeServices
      .map((id) => SERVICES_DATA.find((s) => s.id === id)?.title || id)
      .join(', ');

    const goalLabel = MARKETING_GOALS.find((g) => g.id === selectedGoal)?.label || '';
    const summaryText = `[${selectedIndustry}] 목표: ${goalLabel} | 관심채널: ${selectedServiceNames}`;

    onApplyEstimate({
      industry: selectedIndustry,
      services: activeServices,
      estimatedMonthly: 0,
      estimatedOnetime: 0,
      summary: summaryText
    });
  };

  const handleSendEstimateViaKakao = async () => {
    const selectedServiceNames = activeServices.map(
      (id) => SERVICES_DATA.find((s) => s.id === id)?.title || id
    );
    const goalLabel = MARKETING_GOALS.find((g) => g.id === selectedGoal)?.label || '';

    await copyAndOpenKakaoChat({
      companyName: '가견적 상담 희망 고객',
      contactName: '카카오톡 문의',
      phone: '카카오톡 실시간 대화',
      industry: selectedIndustry,
      selectedServices: selectedServiceNames,
      inquiryDetails: `마케팅 목표: ${goalLabel}\n선택 채널: ${selectedServiceNames.join(', ')}`
    });
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>1:1 맞춤 마케팅 전략 진단</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            내 업종과 목표에 꼭 맞는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              최적의 마케팅 채널 진단 가이드
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            비효율적인 일방적 광고 대신, 상권과 주 고객층의 행동 패턴을 고려한 가장 강력한 마케팅 조합을 확인해 보세요.
          </p>
        </div>

        {/* Planner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Selections (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
            {/* 1. Industry Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                1. 대표님의 사업 업종을 선택해 주세요
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INDUSTRY_OPTIONS.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all truncate cursor-pointer ${
                      selectedIndustry === ind
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Marketing Goal */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                2. 현재 가장 집중하고 싶은 마케팅 목표
              </label>
              <div className="space-y-2">
                {MARKETING_GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedGoal === goal.id
                        ? 'bg-blue-50 text-blue-800 border-2 border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{goal.label}</span>
                    {selectedGoal === goal.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Preferred Services Checkbox */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  3. 관심 있는 광고 채널 (복수 선택)
                </label>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 초기화
                </button>
              </div>

              <div className="space-y-2.5">
                {SERVICES_DATA.map((service) => {
                  const isChecked = selectedServices[service.id];
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-blue-50/40 border-blue-400 shadow-2xs'
                          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                        <div>
                          <span className="text-sm font-extrabold text-slate-900">
                            {service.title}
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {service.shortDesc}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0 hidden sm:inline">
                        {service.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Summary & Free Consultation Action (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/50 sticky top-28">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">맞춤 진단 리포트 요약</h3>
                <p className="text-xs text-slate-500 font-medium">선택하신 조건에 기반한 최적화 구성</p>
              </div>
            </div>

            {/* Summary card */}
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-500 mb-1">선택 업종</div>
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{selectedIndustry}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-500 mb-1">선택된 관심 채널 ({activeServices.length}개)</div>
                {activeServices.length === 0 ? (
                  <p className="text-xs text-rose-500 font-medium">최소 1개 이상의 광고 채널을 선택해 주세요.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {activeServices.map((id) => {
                      const item = SERVICES_DATA.find((s) => s.id === id);
                      return (
                        <span
                          key={id}
                          className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-blue-700 shadow-2xs"
                        >
                          {item?.title}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>버터캣 1:1 맞춤 진단 무료 혜택</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>• 인근 경쟁사 노출 순위 및 키워드 난이도 무료 분석</li>
                  <li>• 광고주의 실질 목표에 맞춘 1:1 최적 채널 믹스 제안</li>
                  <li>• 불필요한 비용 없는 1개월 단위 자유 계약 지원</li>
                </ul>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleSendEstimateViaKakao}
                disabled={activeServices.length === 0}
                className="w-full py-4 rounded-2xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] font-black text-sm shadow-xl shadow-amber-500/15 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4 text-[#3C1E1E]" />
                <span>카카오톡 오픈채팅으로 이 견적 바로 문의 (추천)</span>
              </button>

              <button
                onClick={handleApply}
                disabled={activeServices.length === 0}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>선택 조건으로 웹 상담 신청서 작성하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-3 font-medium">
              * 오픈채팅 문의 시 계산된 관심 채널과 업종 정보가 자동 복사되어 바로 전송하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
