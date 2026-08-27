import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, History, X, ArrowRight, Building2 } from 'lucide-react';
import { searchTickers } from '../services/api';
import { SearchResult } from '../types';

interface StockSearchProps {
  onSelectTicker: (ticker: string) => void;
  isLoading?: boolean;
  currentTicker?: string;
  isCompact?: boolean;
}

const POPULAR_CHIPS = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'META', 'AMD'];

export const StockSearch: React.FC<StockSearchProps> = ({
  onSelectTicker,
  isLoading = false,
  currentTicker = '',
  isCompact = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stock_insight_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const saveRecentSearch = (ticker: string) => {
    const uppercase = ticker.toUpperCase();
    const updated = [uppercase, ...recentSearches.filter((s) => s !== uppercase)].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('stock_insight_recent_searches', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Keyboard shortcut listener ('/' or 'Cmd+K' to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch suggestions with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await searchTickers(query);
      setSuggestions(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = query.trim().toUpperCase();
    if (target) {
      saveRecentSearch(target);
      onSelectTicker(target);
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  const handleSelect = (ticker: string) => {
    saveRecentSearch(ticker);
    onSelectTicker(ticker);
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const removeRecent = (ticker: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== ticker);
    setRecentSearches(updated);
    try {
      localStorage.setItem('stock_insight_recent_searches', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }
  };

  if (isCompact) {
    return (
      <div ref={wrapperRef} className="relative w-full max-w-md">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            id="compact-stock-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search ticker (e.g. NVDA, AAPL)..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-[#1A1C23] border border-gray-700/80 rounded-lg text-[#E2E8F0] placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 text-gray-400 hover:text-gray-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {isOpen && (suggestions.length > 0 || recentSearches.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1.5 py-2 bg-[#13151A] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <button
                  key={item.symbol}
                  onClick={() => handleSelect(item.symbol)}
                  className="w-full px-3.5 py-2 text-left hover:bg-[#1A1C23] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-emerald-400 text-sm group-hover:text-emerald-300">
                      {item.symbol}
                    </span>
                    <span className="text-xs text-gray-300 truncate max-w-[200px]">{item.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1A1C23] text-gray-400 border border-gray-800">
                    {item.exchange}
                  </span>
                </button>
              ))
            ) : (
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Recent Searches
                </div>
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelect(s)}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-[#1A1C23] flex items-center justify-between text-xs text-gray-300"
                  >
                    <span className="font-mono font-semibold text-gray-200">{s}</span>
                    <X
                      className="w-3 h-3 text-gray-500 hover:text-rose-400"
                      onClick={(e) => removeRecent(s, e)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto text-center">
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E2E8F0] tracking-tight">
          What stock are you researching?
        </h1>
        <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
          Enter any public company ticker for synthesized fundamental analysis, analyst consensus, news sentiment, and Buy / Hold / Sell scoring.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mt-6">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            id="hero-stock-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search a ticker, e.g. NVDA, AAPL, MSFT, TSLA..."
            className="w-full pl-12 pr-28 py-4 text-base sm:text-lg bg-[#1A1C23] border border-gray-700/80 rounded-2xl text-[#E2E8F0] placeholder:text-gray-500 shadow-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Analyze</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {isOpen && (suggestions.length > 0 || recentSearches.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-[#13151A] border border-gray-800 rounded-2xl shadow-2xl z-50 text-left overflow-hidden max-h-96 overflow-y-auto">
            {suggestions.length > 0 ? (
              <div>
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Search Results
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item.symbol}
                    onClick={() => handleSelect(item.symbol)}
                    className="w-full px-4 py-2.5 hover:bg-[#1A1C23] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1C23] border border-gray-800 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 group-hover:border-emerald-500/50">
                        {item.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-[#E2E8F0] group-hover:text-emerald-400 text-sm">
                          {item.symbol}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-[280px] sm:max-w-[360px]">
                          {item.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">{item.sector}</span>
                      <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded bg-[#1A1C23] text-gray-400 border border-gray-800">
                        {item.exchange}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}

            {recentSearches.length > 0 && (
              <div className={suggestions.length > 0 ? 'mt-2 pt-2 border-t border-gray-800' : ''}>
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> Recent Researches
                  </span>
                </div>
                <div className="px-3 py-1 flex flex-wrap gap-1.5">
                  {recentSearches.map((s) => (
                    <span
                      key={s}
                      onClick={() => handleSelect(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1C23] hover:bg-[#232732] border border-gray-800 text-xs font-mono font-bold text-gray-200 cursor-pointer transition-colors"
                    >
                      {s}
                      <X
                        className="w-3 h-3 text-gray-400 hover:text-rose-400"
                        onClick={(e) => removeRecent(s, e)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>

      {/* Popular exploration chips */}
      <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs">
        <span className="text-gray-500 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Popular:
        </span>
        {POPULAR_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => handleSelect(chip)}
            className="px-2.5 py-1 rounded-lg bg-[#1A1C23] hover:bg-[#232732] border border-gray-800 font-mono font-bold text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
