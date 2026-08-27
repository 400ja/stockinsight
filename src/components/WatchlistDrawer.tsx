import React from 'react';
import { X, Star, ArrowRight, Trash2, TrendingUp } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onSelectTicker: (ticker: string) => void;
  onRemoveFromWatchlist: (ticker: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onSelectTicker,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0B0E]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13151A] border-l border-gray-800 p-6 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h2 className="text-lg font-bold text-[#E2E8F0] font-sans">Saved Watchlist</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-[#1A1C23]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-6 space-y-2.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
              {watchlist.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  <Star className="w-8 h-8 text-gray-600 mx-auto mb-2 opacity-50" />
                  <p>Your watchlist is currently empty.</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click the star icon on any stock header to save it here.
                  </p>
                </div>
              ) : (
                watchlist.map((ticker) => (
                  <div
                    key={ticker}
                    className="p-3.5 rounded-xl bg-[#1A1C23] border border-gray-800 hover:border-gray-700 flex items-center justify-between gap-3 group transition-all"
                  >
                    <button
                      onClick={() => {
                        onSelectTicker(ticker);
                        onClose();
                      }}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#13151A] border border-gray-800 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 group-hover:border-emerald-500/50">
                        {ticker.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-[#E2E8F0] group-hover:text-emerald-400 text-sm">
                          {ticker}
                        </div>
                        <div className="text-[11px] text-gray-400">Public Equity</div>
                      </div>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onSelectTicker(ticker);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#13151A] hover:bg-emerald-500 hover:text-black text-gray-300 border border-gray-800 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <span>Analyze</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWatchlist(ticker)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-[#13151A]"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 text-[11px] text-gray-500 text-center font-mono">
            Watchlist items are securely persisted in your local browser state.
          </div>
        </div>
      </div>
    </div>
  );
};
