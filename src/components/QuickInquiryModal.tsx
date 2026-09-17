import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Building, User, Phone, Sparkles } from 'lucide-react';
import { SERVICES_DATA, INDUSTRY_OPTIONS, AGENCY_INFO } from '../data/marketingData';
import { ServiceId } from '../types';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultIndustry?: string;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  defaultIndustry
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState(defaultIndustry || INDUSTRY_OPTIONS[0]);
  const [selectedService, setSelectedService] = useState<ServiceId>('naver-place');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultService) {
      const match = SERVICES_DATA.find((s) => s.id === defaultService || s.title === defaultService);
      if (match) setSelectedService(match.id);
    }
  }, [defaultService]);

  useEffect(() => {
    if (defaultIndustry) {
      setIndustry(defaultIndustry);
    }
  }, [defaultIndustry]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) {
      alert('필수 정보를 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Save locally
      try {
        const existing = JSON.parse(localStorage.getItem('buttercat_inquiries') || localStorage.getItem('storyn_inquiries') || '[]');
        const newRecord = {
          id: `MODAL-${Date.now().toString().slice(-5)}`,
          companyName,
          contactName,
          phone,
          industry,
          selectedServices: [selectedService],
          inquiryDetails: notes,
          submittedAt: new Date().toLocaleString('ko-KR'),
          status: '접수완료'
        };
        localStorage.setItem('buttercat_inquiries', JSON.stringify([newRecord, ...existing]));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">상담 접수가 완료되었습니다!</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
              담당 디렉터가 <strong>{companyName}</strong>의 온라인 노출 현황을 분석하여 남겨주신 연락처(<strong>{phone}</strong>)로 신속히 답변드리겠습니다.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-blue-500/20"
            >
              확인
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-100 border-2 border-amber-300 shadow-sm shrink-0">
                <img
                  src="/images/buttercat_logo.jpg"
                  alt="버터캣"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black text-amber-900 bg-amber-200/90 border border-amber-300 px-2 py-0.5 rounded-full">
                    💧 눈물 뚝! 맞춤 솔루션
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  버터캣 1:1 무료 상권 진단
                </h3>
                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                  대표님의 업종과 지역에 맞춰 실시간 1위 노출 전략을 제시해 드립니다.
                </p>
              </div>
            </div>

            {/* Instant Kakao Open Chat Option */}
            <div className="mb-4">
              <a
                href={AGENCY_INFO.kakaoOpenChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#FEE500] hover:bg-[#edd400] text-[#3C1E1E] font-black text-xs flex items-center justify-between shadow-2xs hover:shadow-xs transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>양식 작성 없이 카톡으로 즉시 상담하기</span>
                </span>
                <span className="text-[11px] font-extrabold underline underline-offset-2">
                  오픈채팅 연결 &rarr;
                </span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    업체명/상호 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="상호명 입력"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    담당자명 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="담당자명 입력"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  연락처(휴대폰) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    관심 광고 상품
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as ServiceId)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    업종
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    {INDUSTRY_OPTIONS.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  문의 내용 (선택)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 플레이스 상위 노출 및 홈페이지 제작 견적 문의드립니다."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <p className="text-[10px] text-slate-500 font-medium">
                * 입력해주신 정보는 상담 및 맞춤 견적 안내 목적으로만 안전하게 사용됩니다.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>전송 중...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>무료 진단 신청 완료</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
