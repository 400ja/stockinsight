import React from 'react';
import { AnalystRatingData } from '../types';
import { Users, Target, ArrowUpRight, ArrowDownRight, Award, History } from 'lucide-react';

interface AnalystSentimentProps {
  analystData: AnalystRatingData;
  currentPrice: number;
}

export const AnalystSentiment: React.FC<AnalystSentimentProps> = ({ analystData, currentPrice }) => {
  const total = analystData.totalAnalysts || (analystData.buyCount + analystData.holdCount + analystData.sellCount) || 1;
  const buyPct = Math.round((analystData.buyCount / total) * 100);
  const holdPct = Math.round((analystData.holdCount / total) * 100);
  const sellPct = Math.round((analystData.sellCount / total) * 100);

  const meanTarget = analystData.targetPriceMean;
  const impliedUpside = meanTarget
    ? Number((((meanTarget - currentPrice) / currentPrice) * 100).toFixed(1))
    : analystData.impliedUpsidePercent;

  const isUpsidePositive = impliedUpside !== null && impliedUpside >= 0;

  return (
    <div id="analyst-sentiment-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-6">
      {/* Header matching Sleek theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">Wall Street Analyst Consensus</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Ratings and price target models from {total} institutional research firms
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1A1C23] border border-gray-800 text-xs font-mono">
          <span className="text-gray-400">Consensus:</span>
          <span className="font-bold text-emerald-400">{analystData.consensusRating}</span>
        </div>
      </div>

      {/* Ratings distribution & Price target cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ratings distribution bar */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-[#1A1C23] border border-gray-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-gray-300">Ratings Breakdown ({total} Analysts)</span>
            <span className="text-emerald-400 font-semibold">{buyPct}% Buy / Overweight</span>
          </div>

          {/* Tri-color Consensus Bar */}
          <div className="w-full h-2.5 rounded-full flex overflow-hidden bg-gray-800">
            <div style={{ width: `${buyPct}%` }} className="bg-emerald-500 transition-all" title={`Buy: ${analystData.buyCount}`} />
            <div style={{ width: `${holdPct}%` }} className="bg-amber-500 transition-all" title={`Hold: ${analystData.holdCount}`} />
            <div style={{ width: `${sellPct}%` }} className="bg-rose-500 transition-all" title={`Sell: ${analystData.sellCount}`} />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
            <div className="p-2 rounded-lg bg-[#13151A] border border-gray-800">
              <div className="text-emerald-400 font-bold text-base">{analystData.buyCount}</div>
              <div className="text-gray-400 text-[11px]">Buy ({buyPct}%)</div>
            </div>
            <div className="p-2 rounded-lg bg-[#13151A] border border-gray-800">
              <div className="text-amber-400 font-bold text-base">{analystData.holdCount}</div>
              <div className="text-gray-400 text-[11px]">Hold ({holdPct}%)</div>
            </div>
            <div className="p-2 rounded-lg bg-[#13151A] border border-gray-800">
              <div className="text-rose-400 font-bold text-base">{analystData.sellCount}</div>
              <div className="text-gray-400 text-[11px]">Sell ({sellPct}%)</div>
            </div>
          </div>
        </div>

        {/* Right: Target Price Metrics */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-[#1A1C23] border border-gray-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-gray-300">12-Month Target Price Consensus</span>
            {impliedUpside !== null && (
              <span className={`font-bold flex items-center gap-0.5 ${isUpsidePositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isUpsidePositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {isUpsidePositive ? '+' : ''}{impliedUpside}% Implied Return
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-[#E2E8F0]">
              {meanTarget ? `$${meanTarget.toFixed(2)}` : 'Data unavailable'}
            </span>
            <span className="text-xs text-gray-400">average target</span>
          </div>

          {/* Low, Average, High price target range */}
          <div className="p-3 rounded-xl bg-[#13151A] border border-gray-800 flex justify-between text-xs font-mono">
            <div>
              <div className="text-gray-500 text-[10px]">Lowest Target</div>
              <div className="text-rose-400 font-bold">
                {analystData.targetPriceLow ? `$${analystData.targetPriceLow.toFixed(0)}` : 'Data unavailable'}
              </div>
            </div>
            <div className="text-center border-x border-gray-800 px-4">
              <div className="text-gray-500 text-[10px]">Current Price</div>
              <div className="text-gray-200 font-bold">${currentPrice.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-[10px]">Highest Target</div>
              <div className="text-emerald-400 font-bold">
                {analystData.targetPriceHigh ? `$${analystData.targetPriceHigh.toFixed(0)}` : 'Data unavailable'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyst Upgrades / Downgrades */}
      {analystData.recentChanges && analystData.recentChanges.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="text-xs uppercase font-mono font-bold text-gray-400 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-gray-500" /> Recent Wall Street Rating Actions
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {analystData.recentChanges.map((change, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1A1C23] border border-gray-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-200">{change.firm}</span>
                  <span className="text-[10px] text-gray-400">{change.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    change.action.includes('Upgrade') || change.action.includes('Raised')
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : change.action.includes('Downgrade') || change.action.includes('Lowered')
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {change.action}
                  </span>
                  <span className="font-mono text-gray-300 font-semibold">{change.rating}</span>
                </div>
                {change.targetPrice && (
                  <div className="text-[11px] font-mono text-gray-400">
                    Target: <strong className="text-gray-200">${change.targetPrice}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
