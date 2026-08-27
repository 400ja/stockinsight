import React from 'react';
import { WhyFactor, SignalType } from '../types';
import { ExternalLink, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhySectionProps {
  signal: SignalType;
  factors: WhyFactor[];
  ticker: string;
}

export const WhySection: React.FC<WhySectionProps> = ({ signal, factors, ticker }) => {
  const getHeadingText = () => {
    switch (signal) {
      case 'BUY':
        return `WHY BUY?`;
      case 'SELL':
        return `WHY SELL?`;
      case 'HOLD':
      default:
        return `WHY HOLD?`;
    }
  };

  const getThemeColor = () => {
    switch (signal) {
      case 'BUY':
        return {
          textColor: 'text-emerald-400',
          dotColor: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
      case 'SELL':
        return {
          textColor: 'text-rose-400',
          dotColor: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]',
          badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        };
      case 'HOLD':
      default:
        return {
          textColor: 'text-amber-400',
          dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
    }
  };

  const theme = getThemeColor();

  return (
    <div id="why-section-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-5">
      {/* Header matching Sleek theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${theme.textColor}`}>
            <span className={`w-2 h-2 rounded-full ${theme.dotColor}`} />
            {getHeadingText()}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Empirical drivers and verified catalyst breakdown for {ticker}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Factual & Sourced</span>
        </div>
      </div>

      {/* Sleek factor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#1A1C23] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${theme.dotColor}`} />
                  <h4 className="font-bold text-sm text-[#E2E8F0] leading-snug">
                    {factor.title}
                  </h4>
                </div>

                {factor.metricHighlight && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border flex-shrink-0 ${theme.badgeBg}`}>
                    {factor.metricHighlight}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pl-4 font-normal">
                {factor.description}
              </p>
            </div>

            {/* Verifiable Source Footer */}
            <div className="pt-2.5 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-500 pl-4">
              <span className="truncate">
                Source: <strong className="text-gray-400 font-medium">{factor.source || 'SEC Filings'}</strong>
              </span>
              {factor.sourceUrl && (
                <a
                  href={factor.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
