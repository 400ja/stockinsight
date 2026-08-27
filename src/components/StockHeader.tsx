import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Star, Activity, DollarSign, Layers } from 'lucide-react';
import { StockQuote } from '../types';

interface StockHeaderProps {
  quote: StockQuote;
  isWatchlisted: boolean;
  onToggleWatchlist: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  quote,
  isWatchlisted,
  onToggleWatchlist,
  onRefresh,
  isRefreshing = false,
}) => {
  const isPositive = quote.change >= 0;

  const formatMarketCap = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatVolume = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div id="stock-header-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Identity and ticker details matching Sleek Interface theme */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#1A1C23] border border-gray-800 flex items-center justify-center flex-shrink-0 shadow-inner">
            <span className="font-mono font-black text-xl tracking-tight text-emerald-400">
              {quote.ticker.slice(0, 3)}
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#E2E8F0] tracking-tight font-sans">
                {quote.name}
              </h1>
              <span className="text-gray-500 font-mono text-xl font-semibold">
                {quote.ticker}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#1A1C23] text-gray-300 border border-gray-800">
                {quote.exchange}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {quote.sector}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" /> Updated {quote.lastUpdated}
              </span>
              <span className="text-gray-700">•</span>
              <span>Industry: <strong className="text-gray-300">{quote.industry}</strong></span>
              <span className="text-gray-700">•</span>
              <span>Currency: <strong className="text-gray-300 font-mono">{quote.currency}</strong></span>
            </div>
          </div>
        </div>

        {/* Middle/Right: Live Price and Change */}
        <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-800">
          <div className="text-left lg:text-right">
            <div className="flex items-baseline lg:justify-end gap-3">
              <span className="text-4xl sm:text-5xl font-light text-[#E2E8F0] tracking-tight">
                ${quote.price.toFixed(2)}
              </span>
              <span className={`text-base sm:text-lg font-medium flex items-center gap-0.5 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPositive ? '+' : ''}${quote.change.toFixed(2)} ({isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">Real-time composite quotation</div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleWatchlist}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`p-3 rounded-xl border transition-all ${
                isWatchlisted
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-[#1A1C23] hover:bg-[#232732] border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              <Star className={`w-5 h-5 ${isWatchlisted ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick stats ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-gray-800 text-xs">
        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">Market Cap</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-sm mt-1">
            {formatMarketCap(quote.marketCap)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">Day Range</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-xs mt-1">
            ${quote.dayLow.toFixed(2)} - ${quote.dayHigh.toFixed(2)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">52-Week Range</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-xs mt-1">
            ${quote.yearLow.toFixed(2)} - ${quote.yearHigh.toFixed(2)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">Volume / Avg</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-xs mt-1">
            {formatVolume(quote.volume)} <span className="text-gray-500 font-normal">/ {formatVolume(quote.avgVolume)}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">Trailing P/E</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-sm mt-1">
            {quote.peRatio ? `${quote.peRatio.toFixed(1)}x` : 'Data unavailable'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-gray-500 uppercase text-[10px] font-semibold tracking-wider">Beta (Volatility)</div>
          <div className="font-mono font-bold text-[#E2E8F0] text-sm mt-1">
            {quote.beta ? quote.beta.toFixed(2) : '1.00'}
          </div>
        </div>
      </div>
    </div>
  );
};
