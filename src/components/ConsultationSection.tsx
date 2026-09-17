import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  Phone,
  Clock,
  ShieldCheck,
  Building,
  User,
  PhoneCall,
  Globe,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  AGENCY_INFO,
  INDUSTRY_OPTIONS,
  BUDGET_OPTIONS,
  SERVICES_DATA
} from '../data/marketingData';
import { ConsultationFormData, ServiceId, SubmittedInquiry } from '../types';

interface ConsultationSectionProps {
  initialService?: ServiceId;
  initialIndustry?: string;
  initialSummary?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialService,
  initialIndustry,
  initialSummary
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    websiteUrl: '',
    industry: initialIndustry || INDUSTRY_OPTIONS[0],
    selectedServices: initialService ? [initialService] : ['naver-place', 'naver-blog'],
    budgetRange: BUDGET_OPTIONS[1],
    inquiryDetails: initialSummary || '',
    agreedToPrivacy: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);
  const [showRecentInquiries, setShowRecentInquiries] = useState(false);

  // Sync external props if they change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: prev.selectedServices.includes(initialService)
          ? prev.selectedServices
          : [...prev.selectedServices, initialService]
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialIndustry) {
      setFormData((prev) => ({ ...prev, industry: initialIndustry }));
    }
  }, [initialIndustry]);

  useEffect(() => {
    if (initialSummary) {
      setFormData((prev) => ({
        ...prev,
        inquiryDetails: prev.inquiryDetails
          ? `${prev.inquiryDetails}\n${initialSummary}`
          : initialSummary
      }));
    }
  }, [initialSummary]);

  // Load saved local inquiries
  useEffect(() => {
    try {
      const saved = localStorage.getItem('buttercat_inquiries') || localStorage.getItem('storyn_inquiries');
      if (saved) {
        setSubmittedInquiries(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleService = (id: ServiceId) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== id)
          : [...prev.selectedServices, id]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      alert('업체명/상호를 입력해 주세요.');
      return;
    }
    if (!formData.contactName.trim()) {
      alert('담당자명을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }
    if (formData.selectedServices.length === 0) {
      alert('희망하시는 광고 상품을 1개 이상 선택해 주세요.');
      return;
    }
    if (!formData.agreedToPrivacy) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry: SubmittedInquiry = {
        ...formData,
        id: `INQ-${Date.now().toString().slice(-6)}`,
        submittedAt: new Date().toLocaleString('ko-KR'),
        status: '접수완료'
      };

      const updated = [newInquiry, ...submittedInquiries];
      setSubmittedInquiries(updated);
      try {
        localStorage.setItem('buttercat_inquiries', JSON.stringify(updated));
      } catch {
        // storage fallback
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      websiteUrl: '',
      industry: INDUSTRY_OPTIONS[0],
      selectedServices: ['naver-place'],
      budgetRange: BUDGET_OPTIONS[1],
      inquiryDetails: '',
      agreedToPrivacy: true
    });
    setIsSuccess(false);
  };

  return (
    <section id="consultation" className="py-24 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left info column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>1:1 무료 마케팅 컨설팅</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              매출 성장의 첫 걸음,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                무료 진단 & 상담 신청
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              신청서를 남겨주시면 담당 전문 디렉터가 대표님의 상권 및 경쟁사를 사전 분석한 후 24시간 이내(영업일 기준) 유선 또는 카카오톡으로 상세 진단 리포트를 전달해 드립니다.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">빠른 직통 전화상담</div>
                  <a
                    href={`tel:${AGENCY_INFO.hotline}`}
                    className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {AGENCY_INFO.hotline}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">상담 운영시간</div>
                  <div className="text-xs font-bold text-slate-800">
                    {AGENCY_INFO.consultationHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>강요나 무분별한 텔레마케팅 영업 전화는 절대 하지 않습니다.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>상담 시 타사 대비 예상 노출 순위 및 예상 ROAS를 무료 제시해 드립니다.</span>
              </div>
            </div>

            {/* Test submission review mode trigger */}
            {submittedInquiries.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowRecentInquiries(!showRecentInquiries)}
                  className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-4 cursor-pointer font-bold"
                >
                  {showRecentInquiries ? '접수 내역 닫기' : `최근 접수 내역 확인 (${submittedInquiries.length}건)`}
                </button>
              </div>
            )}
          </div>

          {/* Right Form column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative">
              {isSuccess ? (
                <div className="text-center py-12 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    무료 마케팅 상담 접수가 완료되었습니다!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                    담당 전담 마케팅 디렉터가 입력해 주신 정보(상호명: {formData.companyName})를 토대로 상권 분석을 진행한 후 빠르게 연락드리겠습니다.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto mb-8 text-left space-y-1.5 font-medium">
                    <div>
                      <strong className="text-slate-900">담당자:</strong> {formData.contactName} ({formData.phone})
                    </div>
                    <div>
                      <strong className="text-slate-900">선택 상품:</strong>{' '}
                      {formData.selectedServices.join(', ')}
                    </div>
                    <div>
                      <strong className="text-slate-900">업종:</strong> {formData.industry}
                    </div>
                  </div>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    추가 문의 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Company & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        업체명 / 상호 <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="예: 강남 맛집 본점 / 버터몰"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        담당자명 / 직책 <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) =>
                            setFormData({ ...formData, contactName: e.target.value })
                          }
                          placeholder="예: 홍길동 대표"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Website/Place URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        연락처(휴대폰) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="010-0000-0000"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        플레이스 지도 링크 또는 웹사이트 (선택)
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.websiteUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, websiteUrl: e.target.value })
                          }
                          placeholder="https://map.naver.com/... 또는 도메인"
                          className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Industry & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        업종 분류
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                      >
                        {INDUSTRY_OPTIONS.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        희망 월 광고 예산
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) =>
                          setFormData({ ...formData, budgetRange: e.target.value })
                        }
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                      >
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Desired Advertising Products (Checkbox array) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      희망 광고 취급 상품 (중복 선택 가능) <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES_DATA.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv.id);
                        return (
                          <button
                            type="button"
                            key={srv.id}
                            onClick={() => toggleService(srv.id)}
                            className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span className="truncate">{srv.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Inquiry message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      현재 고민이나 희망 목표 (상세히 적어주실수록 정확한 진단이 가능합니다)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.inquiryDetails}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryDetails: e.target.value })
                      }
                      placeholder="예: 강남역 부근 신규 고깃집 오픈 예정입니다. 플레이스 순위 올리기와 블로그 체험단 20팀 정도 함께 진행하고 싶습니다. 홈페이지는 아직 없습니다."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                  </div>

                  {/* Privacy Agreement */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.agreedToPrivacy}
                      onChange={(e) =>
                        setFormData({ ...formData, agreedToPrivacy: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="privacy" className="text-xs text-slate-600 font-medium">
                      [필수] 마케팅 상담 및 견적 안내를 위한 개인정보 수집 및 이용에 동의합니다.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        상담 신청 중...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>무료 마케팅 진단 & 견적 신청 완료하기</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Recent Inquiries Review Box */}
            {showRecentInquiries && submittedInquiries.length > 0 && (
              <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  브라우저 로컬 저장된 최근 접수 상담 내역
                </h4>
                <div className="space-y-2.5">
                  {submittedInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{inq.companyName}</span>
                          <span className="text-slate-500 font-medium">({inq.contactName} / {inq.phone})</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-slate-600 text-[11px] mt-0.5 font-medium">
                          {inq.industry} | {inq.selectedServices.join(', ')}
                        </div>
                      </div>
                      <span className="text-slate-400 text-[10px]">{inq.submittedAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
