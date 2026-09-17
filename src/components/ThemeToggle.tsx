import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'segmented' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  className = ''
}) => {
  const { theme, toggleTheme, setTheme, isSoftDark } = useTheme();

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 transition-colors ${className}`}
        role="group"
        aria-label="화면 테마 선택"
      >
        <button
          type="button"
          onClick={() => setTheme('bright')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            !isSoftDark
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-pressed={!isSoftDark}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>밝은 모드</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('soft-dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isSoftDark
              ? 'bg-slate-700 text-amber-300 shadow-sm border border-slate-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-pressed={isSoftDark}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span>소프트 야간</span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
          isSoftDark
            ? 'bg-slate-800/90 text-amber-300 border-slate-700 hover:bg-slate-750 hover:border-amber-400/40 shadow-xs'
            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900 shadow-xs'
        } ${className}`}
        title={isSoftDark ? '밝은 모드로 전환 (현재: 소프트 야간)' : '소프트 야간 모드로 전환 (현재: 밝은 모드)'}
        aria-label={isSoftDark ? '밝은 모드로 전환' : '소프트 야간 모드로 전환'}
      >
        {isSoftDark ? (
          <Moon className="w-4 h-4 text-indigo-300 animate-in spin-in-12 duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 animate-in spin-in-12 duration-300" />
        )}
      </button>
    );
  }

  // Default 'button' with label and gentle badge
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-xs active:scale-95 ${
        isSoftDark
          ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-400/50 hover:bg-slate-750'
          : 'bg-slate-100/90 text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 hover:text-slate-900'
      } ${className}`}
      title="클릭하여 밝은 모드 / 소프트 야간 모드를 전환합니다"
      aria-label="화면 테마 전환"
    >
      <div className="relative flex items-center justify-center">
        {isSoftDark ? (
          <div className="flex items-center gap-1 text-indigo-300">
            <Moon className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-extrabold text-indigo-200">소프트 야간</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-700">
            <Sun className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
            <span className="text-[11px] font-extrabold text-slate-800">밝은 모드</span>
          </div>
        )}
      </div>

      <span
        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border transition-colors ${
          isSoftDark
            ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
            : 'bg-amber-100/80 text-amber-800 border-amber-300/80'
        }`}
      >
        {isSoftDark ? '눈 편한 모드' : '기본'}
      </span>
    </button>
  );
};
