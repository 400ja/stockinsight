import React from 'react';
import { SignalType } from '../types';
import { Sparkles, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InvestmentSignalCardProps {
  signal: SignalType;
  confidence: number;
  overallScore: number;
  verdictSummary: string;
  keyTakeaway: string;
  conflictWarning?: string | null;
}

export const InvestmentSignalCard: React.FC<InvestmentSignalCardProps> = ({
  signal,
  confidence,
  overallScore,
  verdictSummary,
  keyTakeaway,
  conflictWarning,
}) => {
  const clampedConfidence = Math.min(100, Math.max(0, confidence));
  const strokeDashoffset = 283 - (283 * clampedConfidence) / 100;

  const getSignalConfig = (sig: SignalType) => {
    switch (sig) {
      case 'BUY':
        return {
          label: 'BUY',
          badgeText: 'BULLISH CONVICTION',
          textColor: 'text-emerald-500',
          textColorLight: 'text-emerald-400',
          borderColor: 'border-emerald-500/20',
          shadowColor: 'shadow-emerald-500/5',
          blurBg: 'bg-emerald-500/5',
          barColor: 'bg-emerald-500',
          pillBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          gaugeColor: '#10b981',
        };
      case 'SELL':
        return {
          label: 'SELL',
          badgeText: 'BEARISH CAUTION',
          textColor: 'text-rose-500',
          textColorLight: 'text-rose-400',
          borderColor: 'border-rose-500/20',
          shadowColor: 'shadow-rose-500/5',
          blurBg: 'bg-rose-500/5',
          barColor: 'bg-rose-500',
          pillBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          gaugeColor: '#f43f5e',
        };
      case 'HOLD':
      default:
        return {
          label: 'HOLD',
          badgeText: 'NEUTRAL STANCE',
          textColor: 'text-amber-500',
          textColorLight: 'text-amber-400',
          borderColor: 'border-amber-500/20',
          shadowColor: 'shadow-amber-500/5',
          blurBg: 'bg-amber-500/5',
          barColor: 'bg-amber-500',
          pillBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          gaugeColor: '#f59e0b',
        };
    }
  };

  const config = getSignalConfig(signal);

  return (
    <div
      id="investment-signal-card"
      className="p-6 sm:p-7 rounded-2xl bg-[#13151A] border border-gray-800 shadow-2xl relative overflow-hidden"
    >
      {/* Background ambient accent matching Sleek Interface theme */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 ${config.blurBg} rounded-full blur-3xl pointer-events-none`} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: AI Recommendation Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm bg-[#1A1C23] text-gray-300 border-gray-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Stock Insight AI Recommendation
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${config.pillBg}`}>
              {config.badgeText}
            </span>
          </div>

          <div className="flex items-baseline gap-4 pt-1">
            <div className="text-left">
              <div className="text-xs uppercase font-mono text-gray-500 font-semibold tracking-wider">Scoring Model Synthesizer</div>
              <div className="text-3xl font-mono font-bold text-[#E2E8F0] mt-0.5">
                {overallScore}<span className="text-gray-500 text-sm font-normal">/100</span>
              </div>
            </div>

            <div className="border-l border-gray-800 pl-4 text-xs text-gray-400">
              <div className="text-gray-500 uppercase font-mono text-[10px] tracking-wider font-semibold">Primary Factor</div>
              <div className="font-semibold text-gray-200 mt-0.5 line-clamp-1">{keyTakeaway}</div>
            </div>
          </div>

          {/* AI Explanation Sentence */}
          <div className="p-4 rounded-xl bg-[#1A1C23] border border-gray-800 text-gray-200 text-sm sm:text-base leading-relaxed">
            <p className="font-medium">
              "{verdictSummary}"
            </p>
          </div>

          {/* Conflict Warning if quantitative score conflicts with qualitative risks */}
          {conflictWarning && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-200">Risk Assessment Flag: </strong>
                {conflictWarning}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Prominent Signal Card matching the Sleek theme */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`w-full text-center bg-[#1A1C23] p-6 rounded-xl border ${config.borderColor} shadow-2xl ${config.shadowColor} space-y-4`}>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                Investment Signal
              </p>
              <div className={`text-5xl sm:text-6xl font-black ${config.textColor} tracking-tight my-2`}>
                {config.label}
              </div>
            </div>

            {/* Confidence Bar & Percentage */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-32 h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${config.barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${clampedConfidence}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${config.textColorLight} font-mono`}>
                  {confidence}% Confidence
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono">
                Statistical Conviction Rating
              </p>
            </div>

            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-evidence synthesis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
