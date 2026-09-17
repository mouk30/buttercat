import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Award,
  Users,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Sparkles,
  MapPin,
  Flame,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { copyAndOpenKakaoChat } from '../utils/kakaoFormat';

// Case-specific data sets
type IndustryCaseKey = 'restaurant' | 'clinic' | 'beauty' | 'fitness';

interface CaseInfo {
  id: IndustryCaseKey;
  name: string;
  category: string;
  location: string;
  period: string;
  mainKeywords: string[];
  initialRank: number;
  finalRank: number;
  revenueBefore: number; // in 10,000 KRW
  revenueAfter: number;
  growthRate: number; // %
  trafficGrowth: number; // %
  summary: string;
}

const CASES_DATA: Record<IndustryCaseKey, CaseInfo> = {
  restaurant: {
    id: 'restaurant',
    name: '강남 프리미엄 숯불 화로구이',
    category: '요식업 / 맛집',
    location: '서울 강남구 역삼동',
    period: '집행 8주 차',
    mainKeywords: ['강남역 삼겹살', '강남 회식장소', '역삼동 고기집'],
    initialRank: 38,
    finalRank: 1,
    revenueBefore: 3200,
    revenueAfter: 8900,
    growthRate: 178,
    trafficGrowth: 340,
    summary: '플레이스 저장하기 3,800건 돌파 및 주말 전 타임 예약 마감 달성'
  },
  clinic: {
    id: 'clinic',
    name: '서초 리프팅·안티에이징 피부과의원',
    category: '병원 / 의료',
    location: '서울 서초구 서초동',
    period: '집행 12주 차',
    mainKeywords: ['강남 피부과 추천', '서초동 리프팅', '양재역 피부과'],
    initialRank: 44,
    finalRank: 2,
    revenueBefore: 5400,
    revenueAfter: 14200,
    growthRate: 163,
    trafficGrowth: 280,
    summary: '신환 문의 월 42건에서 195건으로 폭증, 비급여 시술 예약 3주 대기'
  },
  beauty: {
    id: 'beauty',
    name: '홍대 프리미엄 맨즈/우먼 헤어살롱',
    category: '뷰티 / 헤어',
    location: '서울 마포구 서교동',
    period: '집행 6주 차',
    mainKeywords: ['홍대 미용실', '홍대 레이어드컷', '연남동 헤어샵'],
    initialRank: 29,
    finalRank: 1,
    revenueBefore: 1800,
    revenueAfter: 4850,
    growthRate: 169,
    trafficGrowth: 410,
    summary: '네이버 예약률 1위 배지 획득, 디자이너 5인 전원 주말 풀부킹'
  },
  fitness: {
    id: 'fitness',
    name: '판교 1:1 재활 & 프리미엄 PT·필라테스',
    category: '피트니스 / 레저',
    location: '경기 성남시 분당구 삼평동',
    period: '집행 10주 차',
    mainKeywords: ['판교 PT', '판교 필라테스', '삼평동 헬스장'],
    initialRank: 32,
    finalRank: 1,
    revenueBefore: 2100,
    revenueAfter: 6100,
    growthRate: 190,
    trafficGrowth: 320,
    summary: '체험 수업 등록 전환율 78% 기록, 오픈 3개월 만에 흑자 전환'
  }
};

// Weekly Ranking Trend Data
const RANKING_TRENDS: Record<IndustryCaseKey, Array<{ week: string; rank: number; saves: number; calls: number }>> = {
  restaurant: [
    { week: '시작 전', rank: 38, saves: 42, calls: 28 },
    { week: '2주차', rank: 26, saves: 140, calls: 65 },
    { week: '4주차', rank: 14, saves: 480, calls: 160 },
    { week: '6주차', rank: 5, saves: 1250, calls: 390 },
    { week: '8주차', rank: 1, saves: 3840, calls: 920 },
    { week: '현재 (유지)', rank: 1, saves: 4920, calls: 1140 }
  ],
  clinic: [
    { week: '시작 전', rank: 44, saves: 25, calls: 35 },
    { week: '2주차', rank: 31, saves: 88, calls: 72 },
    { week: '4주차', rank: 18, saves: 290, calls: 145 },
    { week: '6주차', rank: 8, saves: 710, calls: 290 },
    { week: '8주차', rank: 3, saves: 1420, calls: 510 },
    { week: '현재 (유지)', rank: 2, saves: 2180, calls: 680 }
  ],
  beauty: [
    { week: '시작 전', rank: 29, saves: 55, calls: 40 },
    { week: '2주차', rank: 19, saves: 180, calls: 95 },
    { week: '4주차', rank: 9, saves: 590, calls: 230 },
    { week: '6주차', rank: 3, saves: 1380, calls: 460 },
    { week: '8주차', rank: 1, saves: 2950, calls: 890 },
    { week: '현재 (유지)', rank: 1, saves: 3600, calls: 1050 }
  ],
  fitness: [
    { week: '시작 전', rank: 32, saves: 30, calls: 18 },
    { week: '2주차', rank: 21, saves: 95, calls: 52 },
    { week: '4주차', rank: 11, saves: 340, calls: 120 },
    { week: '6주차', rank: 4, saves: 890, calls: 280 },
    { week: '8주차', rank: 2, saves: 1820, calls: 470 },
    { week: '현재 (유지)', rank: 1, saves: 2450, calls: 610 }
  ]
};

// Monthly Revenue & Customer Footfall Data
const MONTHLY_REVENUE_TRENDS: Record<
  IndustryCaseKey,
  Array<{ month: string; revenue: number; adCost: number; netProfit: number }>
> = {
  restaurant: [
    { month: '집행 전', revenue: 3200, adCost: 0, netProfit: 960 },
    { month: '1개월차', revenue: 4600, adCost: 120, netProfit: 1420 },
    { month: '2개월차', revenue: 6800, adCost: 120, netProfit: 2340 },
    { month: '3개월차', revenue: 8900, adCost: 120, netProfit: 3280 },
    { month: '4개월차 (안정기)', revenue: 9400, adCost: 120, netProfit: 3520 }
  ],
  clinic: [
    { month: '집행 전', revenue: 5400, adCost: 0, netProfit: 1890 },
    { month: '1개월차', revenue: 7800, adCost: 200, netProfit: 2950 },
    { month: '2개월차', revenue: 11200, adCost: 200, netProfit: 4680 },
    { month: '3개월차', revenue: 14200, adCost: 200, netProfit: 6250 },
    { month: '4개월차 (안정기)', revenue: 15600, adCost: 200, netProfit: 7100 }
  ],
  beauty: [
    { month: '집행 전', revenue: 1800, adCost: 0, netProfit: 630 },
    { month: '1개월차', revenue: 2650, adCost: 80, netProfit: 1020 },
    { month: '2개월차', revenue: 3900, adCost: 80, netProfit: 1650 },
    { month: '3개월차', revenue: 4850, adCost: 80, netProfit: 2180 },
    { month: '4개월차 (안정기)', revenue: 5200, adCost: 80, netProfit: 2390 }
  ],
  fitness: [
    { month: '집행 전', revenue: 2100, adCost: 0, netProfit: 720 },
    { month: '1개월차', revenue: 3300, adCost: 100, netProfit: 1310 },
    { month: '2개월차', revenue: 4900, adCost: 100, netProfit: 2150 },
    { month: '3개월차', revenue: 6100, adCost: 100, netProfit: 2820 },
    { month: '4개월차 (안정기)', revenue: 6700, adCost: 100, netProfit: 3180 }
  ]
};

// Cross-Industry Aggregated ROAS data
const INDUSTRY_ROAS_DATA = [
  { industry: '맛집 / 요식업', roas: 680, placeRate: 96, label: '6.8배 매출' },
  { industry: '병원 / 의료', roas: 740, placeRate: 94, label: '7.4배 매출' },
  { industry: '뷰티 / 헤어살롱', roas: 580, placeRate: 95, label: '5.8배 매출' },
  { industry: '피트니스 / 체육', roas: 520, placeRate: 92, label: '5.2배 매출' },
  { industry: '생활 / 소상공인', roas: 490, placeRate: 91, label: '4.9배 매출' }
];

interface PerformanceMetricsDashboardProps {
  onOpenConsultationModal?: (serviceId?: string, industry?: string) => void;
}

export const PerformanceMetricsDashboard: React.FC<PerformanceMetricsDashboardProps> = ({
  onOpenConsultationModal
}) => {
  const [selectedCaseKey, setSelectedCaseKey] = useState<IndustryCaseKey>('restaurant');
  const [activeTab, setActiveTab] = useState<'ranking' | 'revenue' | 'roas'>('ranking');

  const currentCase = CASES_DATA[selectedCaseKey];
  const rankingData = RANKING_TRENDS[selectedCaseKey];
  const revenueData = MONTHLY_REVENUE_TRENDS[selectedCaseKey];

  const handleConsultThisCase = async () => {
    await copyAndOpenKakaoChat({
      companyName: `${currentCase.name} 유사 업종 문의`,
      contactName: '성과 지표 확인 고객',
      phone: '카카오톡 상담',
      industry: currentCase.category,
      selectedServices: ['네이버 플레이스 1위 노출', '블로그 체험단'],
      inquiryDetails: `성과 지표 대시보드 [${currentCase.name}] 사례를 보았습니다. 저희 매장도 비슷한 순위 상승 및 매출 증대 플랜 안내받고 싶습니다.`
    });
  };

  return (
    <section id="metrics-dashboard" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>실제 광고 집행 데이터 기반 검증</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            버터캣과 함께한 매장의 <span className="text-blue-600">진짜 성과 지표</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            말뿐인 마케팅이 아닙니다. 실제 500+ 파트너 매장의 네이버 플레이스 순위 변화와 매출 곡선을 투명하게 공개합니다.
          </p>
        </div>

        {/* 4 Core Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">네이버 1~3위 달성률</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              94.2<span className="text-lg text-blue-600">%</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-semibold">
              평균 18일 이내 1페이지 진입 완료
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">평균 월매출 성장률</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
              +284<span className="text-lg">%</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-semibold">
              집행 3개월 누적 기준 평균 성장
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">플레이스 저장 증가율</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              +820<span className="text-lg text-blue-600">%</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-semibold">
              방문 의향 고객(길찾기·전화) 급증
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">광고 연장 계약률</span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              96.8<span className="text-lg text-blue-600">%</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-semibold">
              단기 계약 후 자발적 장기 연장
            </div>
          </div>
        </div>

        {/* Dashboard Main Container */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">
          {/* Top Filter Bar: Industry Case Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/90 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  실사례 업종 선택
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                비슷한 업종을 클릭하여 실제 순위 상승 및 매출 곡선을 비교해 보세요.
              </p>
            </div>

            {/* Case Selection Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {(Object.keys(CASES_DATA) as IndustryCaseKey[]).map((key) => {
                const item = CASES_DATA[key];
                const isActive = selectedCaseKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCaseKey(key)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                    }`}
                  >
                    <span>{item.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Case Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-black">
                  {currentCase.category}
                </span>
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {currentCase.location}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {currentCase.period}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {currentCase.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                💡 {currentCase.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentCase.mainKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics Badge in Header */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <div className="text-center px-2">
                <div className="text-[10px] text-slate-500 font-bold mb-0.5">순위 변화</div>
                <div className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-center gap-1">
                  <span className="line-through text-slate-400 text-xs">{currentCase.initialRank}위</span>
                  <span className="text-blue-600 font-black">➔ {currentCase.finalRank}위</span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-[10px] text-slate-500 font-bold mb-0.5">월매출 변화</div>
                <div className="text-base sm:text-lg font-black text-emerald-600">
                  +{currentCase.growthRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Chart Type Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'ranking'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              📊 네이버 플레이스 순위 역전 추이 (1~8주차)
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'revenue'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              💰 월별 매출 & 순수익 성장 곡선
            </button>
            <button
              onClick={() => setActiveTab('roas')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'roas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              🎯 전 업종별 평균 ROAS (광고수익률) 비교
            </button>
          </div>

          {/* Chart Display Area */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs">
            {activeTab === 'ranking' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      네이버 플레이스 순위 상승 & 고객 반응 지표 (저장하기/전화)
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      * Y축 순위는 1위에 가까울수록 상단에 표시됩니다 (순위 역전 시뮬레이션)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <span className="w-3 h-1 bg-blue-600 rounded-full inline-block" /> 플레이스 순위 (위)
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-500">
                      <span className="w-3 h-1 bg-amber-500 rounded-full inline-block" /> 네이버 저장하기 (건)
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rankingData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
                      <YAxis
                        yAxisId="left"
                        reversed={true}
                        domain={[1, 50]}
                        tick={{ fontSize: 11, fill: '#2563eb' }}
                        tickFormatter={(v) => `${v}위`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 11, fill: '#f59e0b' }}
                        tickFormatter={(v) => `${v}건`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                        formatter={(value: any, name: any) => {
                          if (name === 'rank') return [`${value}위`, '플레이스 순위'];
                          if (name === 'saves') return [`${Number(value).toLocaleString()}건`, '플레이스 저장하기'];
                          if (name === 'calls') return [`${Number(value).toLocaleString()}건`, '전화/길찾기'];
                          return [value, name];
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="rank"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#2563eb' }}
                        activeDot={{ r: 8, stroke: '#1d4ed8', strokeWidth: 2 }}
                        name="rank"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="saves"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        strokeDasharray="4 4"
                        dot={{ r: 4, fill: '#f59e0b' }}
                        name="saves"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'revenue' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      월간 총매출 및 순수익 성장 추이 (단위: 만 원)
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      광고비 지출 대비 순수익이 가파르게 동반 상승하는 실제 데이터입니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <span className="w-3 h-3 bg-blue-600 rounded inline-block" /> 월 총매출
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="w-3 h-3 bg-emerald-500 rounded inline-block" /> 추정 순이익
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        tickFormatter={(v) => `${(v / 100).toFixed(0)}백만`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                        formatter={(value: any, name: any) => {
                          if (name === 'revenue') return [`${Number(value).toLocaleString()}만 원`, '월 총매출'];
                          if (name === 'netProfit') return [`${Number(value).toLocaleString()}만 원`, '추정 순이익'];
                          if (name === 'adCost') return [`${Number(value).toLocaleString()}만 원`, '월 광고비'];
                          return [value, name];
                        }}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} name="revenue" />
                      <Bar dataKey="netProfit" fill="#10b981" radius={[6, 6, 0, 0]} name="netProfit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'roas' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                      업종별 평균 광고 수익률(ROAS) & 플레이스 안착률
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      투자 광고비 100만 원 집행 시 평균 520만~740만 원의 실매출 창출 효과
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    <span>평균 ROAS: 620% 달성</span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={INDUSTRY_ROAS_DATA}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" domain={[0, 900]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                      <YAxis
                        dataKey="industry"
                        type="category"
                        tick={{ fontSize: 11, fontWeight: 'bold', fill: '#1e293b' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                        formatter={(value: any) => [`${value}% (투자비 대비 매출환산)`, '평균 ROAS']}
                      />
                      <Bar dataKey="roas" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Callout & Action */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50/60 to-yellow-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-amber-100 border-2 border-amber-300 shrink-0 shadow-2xs">
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="버터캣"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <span>🐱 버터캣의 약속: 데이터는 거짓말하지 않습니다</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
                  대표님의 매장도 2주 안에 순위 곡선을 바꿀 수 있습니다. 지금 실시간 상권 분석을 신청하세요.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleConsultThisCase}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-[#3C1E1E]" />
                <span>카톡 오픈채팅 상담</span>
              </button>
              <button
                onClick={() => {
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal('naver-place', currentCase.category);
                  }
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>무료 진단 신청</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
