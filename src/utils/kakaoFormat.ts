import { AGENCY_INFO } from '../data/marketingData';

export interface ConsultationPayload {
  companyName: string;
  contactName: string;
  phone: string;
  industry?: string;
  selectedServices?: string[];
  budgetRange?: string;
  websiteUrl?: string;
  inquiryDetails?: string;
}

export function formatConsultationForKakao(data: ConsultationPayload): string {
  const serviceLabels = data.selectedServices && data.selectedServices.length > 0
    ? data.selectedServices.join(', ')
    : '맞춤 종합 진단';

  return `[🐱 버터캣 마케팅 1:1 상담 신청서]
━━━━━━━━━━━━━━━━━━━━
• 업체명(상호): ${data.companyName || '미입력'}
• 담당자: ${data.contactName || '미입력'}
• 연락처: ${data.phone || '미입력'}
• 업종: ${data.industry || '기타'}
• 희망 광고상품: ${serviceLabels}
${data.budgetRange ? `• 예상 월 예산: ${data.budgetRange}` : ''}
${data.websiteUrl ? `• 플레이스/웹사이트: ${data.websiteUrl}` : ''}
${data.inquiryDetails ? `• 문의/고민 내용: ${data.inquiryDetails}` : ''}
━━━━━━━━━━━━━━━━━━━━
※ 위 내용으로 빠른 1위 상권 분석 및 견적 안내 부탁드립니다!`;
}

export async function copyAndOpenKakaoChat(data: ConsultationPayload): Promise<boolean> {
  const text = formatConsultationForKakao(data);
  let copied = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copied = true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  } catch (e) {
    console.warn('Clipboard write failed, proceeding to open chat', e);
  }

  // Open Kakao Open Chat
  window.open(AGENCY_INFO.kakaoOpenChatUrl, '_blank', 'noopener,noreferrer');
  return copied;
}
