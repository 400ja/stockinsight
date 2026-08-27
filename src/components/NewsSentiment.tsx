import React from 'react';
import { NewsItem } from '../types';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus, Clock, ShieldAlert } from 'lucide-react';

interface NewsSentimentProps {
  news: NewsItem[];
  ticker: string;
}

export const NewsSentiment: React.FC<NewsSentimentProps> = ({ news, ticker }) => {
  const getSentimentTag = (sentiment: 'Bullish' | 'Neutral' | 'Bearish') => {
    switch (sentiment) {
      case 'Bullish':
        return {
          icon: TrendingUp,
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          label: 'Bullish Catalyst',
        };
      case 'Bearish':
        return {
          icon: TrendingDown,
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          label: 'Bearish Headwind',
        };
      case 'Neutral':
      default:
        return {
          icon: Minus,
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          label: 'Neutral Context',
        };
    }
  };

  return (
    <div id="news-sentiment-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Newspaper className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">News & Market Sentiment</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Real-time verified media coverage, regulatory filings, and earnings development reports
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>Recent News Weighted</span>
        </div>
      </div>

      {/* News Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => {
          const sentiment = getSentimentTag(item.sentiment);
          const SentimentIcon = sentiment.icon;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#1A1C23] border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 ${sentiment.bg}`}>
                    <SentimentIcon className="w-3 h-3" />
                    {sentiment.label}
                  </span>

                  <span className="text-[10px] text-gray-400 font-mono">
                    {item.publishedAt}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#E2E8F0] leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                <span className="font-semibold text-gray-300 truncate max-w-[150px]">
                  {item.publisher}
                </span>

                {item.url && item.url !== '#' ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#13151A] text-gray-400 border border-gray-800">
                    {item.importance} Impact
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
