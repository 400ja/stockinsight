import React from 'react';
import { Activity, Star, Sparkles, TrendingUp, Search, Info } from 'lucide-react';
import { StockSearch } from './StockSearch';

interface NavbarProps {
  onSelectTicker: (ticker: string) => void;
  currentTicker?: string;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onHomeClick: () => void;
  isSearchingActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectTicker,
  currentTicker,
  watchlistCount,
  onOpenWatchlist,
  onHomeClick,
  isSearchingActive = false,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0B0E]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title matching Sleek Interface theme */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3.5 text-left group flex-shrink-0"
        >
          <div className="bg-emerald-500 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-black text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform">
            SI
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg tracking-tight text-[#E2E8F0] flex items-center gap-1.5 font-sans">
              <span>STOCK</span>
              <span className="text-emerald-400">INSIGHT</span>
            </div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden sm:block">
              AI Equity Research Terminal
            </div>
          </div>
        </button>

        {/* Compact Search Bar in Header when active */}
        {isSearchingActive && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <StockSearch
              onSelectTicker={onSelectTicker}
              currentTicker={currentTicker}
              isCompact={true}
            />
          </div>
        )}

        {/* Right side actions: Watchlist & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Market Feed</p>
            <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Live Connected
            </p>
          </div>

          <button
            onClick={onOpenWatchlist}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1A1C23] hover:bg-[#232732] border border-gray-700/80 text-xs font-medium text-[#E2E8F0] transition-colors shadow-sm"
          >
            <Star className={`w-4 h-4 ${watchlistCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/30">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
