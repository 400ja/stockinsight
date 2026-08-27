import React from 'react';
import { SmartMoneyInsight } from '../types';
import { Landmark, TrendingUp, TrendingDown, Minus, ShieldCheck, Building, Users } from 'lucide-react';

interface SmartMoneySectionProps {
  smartMoney: SmartMoneyInsight;
  ticker: string;
}

export const SmartMoneySection: React.FC<SmartMoneySectionProps> = ({ smartMoney, ticker }) => {
  const getSentimentBadge = (sentiment: 'Bullish' | 'Neutral' | 'Bearish') => {
    switch (sentiment) {
      case 'Bullish':
        return {
          icon: TrendingUp,
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/20',
          bgColor: 'bg-emerald-500/10',
          label: 'Bullish Consensus',
        };
      case 'Bearish':
        return {
          icon: TrendingDown,
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/20',
          bgColor: 'bg-rose-500/10',
          label: 'Bearish Stance',
        };
      case 'Neutral':
      default:
        return {
          icon: Minus,
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/20',
          bgColor: 'bg-amber-500/10',
          label: 'Neutral Positioning',
        };
    }
  };

  const sentimentCfg = getSentimentBadge(smartMoney.overallSentiment);
  const SentimentIcon = sentimentCfg.icon;

  return (
    <div id="smart-money-section-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-6">
      {/* Header matching Sleek theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Landmark className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">Investor Sentiment & Smart Money</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Publicly disclosed 13F filings, institutional allocation patterns, and institutional research
          </p>
        </div>

        {/* Overall Institutional Signal */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${sentimentCfg.bgColor} ${sentimentCfg.borderColor}`}>
          <SentimentIcon className={`w-4 h-4 ${sentimentCfg.textColor}`} />
          <span className={`text-xs font-mono font-bold uppercase tracking-wide ${sentimentCfg.textColor}`}>
            {sentimentCfg.label}
          </span>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="p-4 rounded-xl bg-[#1A1C23] border border-gray-800 text-gray-300 text-sm leading-relaxed">
        <p>{smartMoney.summary}</p>
        <div className="mt-3 flex items-center gap-4 text-xs font-mono text-gray-400">
          {smartMoney.institutionalOwnershipPercent !== null && (
            <span>
              Institutional Ownership: <strong className="text-gray-200">{smartMoney.institutionalOwnershipPercent}%</strong>
            </span>
          )}
          <span>•</span>
          <span>
            13F Trend: <strong className="text-emerald-400">{smartMoney.institutionalTrend}</strong>
          </span>
        </div>
      </div>

      {/* Grid: Key Holders & Manager Perspectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Major Public Institutional Holdings */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-mono font-bold text-gray-400 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-gray-500" /> Prominent Institutional Holders (13F Filings)
          </div>
          <div className="space-y-2">
            {smartMoney.keyHolders.map((holder, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1A1C23] border border-gray-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-[#E2E8F0]">{holder.institution}</div>
                  <div className="text-gray-400 text-[11px] mt-0.5">
                    {holder.sharesHeld ? `Holdings: ${holder.sharesHeld}` : 'Institutional Float'}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold text-gray-300">{holder.positionChange}</div>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-bold ${
                    holder.sentiment === 'Bullish'
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : holder.sentiment === 'Bearish'
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-amber-400 bg-amber-500/10'
                  }`}>
                    {holder.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Research & Management Perspectives */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-mono font-bold text-gray-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gray-500" /> Research & Institutional Perspectives
          </div>
          <div className="space-y-2">
            {smartMoney.notablePerspectives.map((persp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1A1C23] border border-gray-800 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E2E8F0]">{persp.sourceOrManager}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#13151A] text-gray-300 border border-gray-800">
                    {persp.verdict}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  {persp.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Public data declaration notice */}
      <div className="pt-2 text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Derived strictly from public SEC Form 13F quarterly disclosures and verified research.</span>
      </div>
    </div>
  );
};
