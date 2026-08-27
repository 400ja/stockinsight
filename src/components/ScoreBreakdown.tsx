import React, { useState } from 'react';
import { CategoryScore } from '../types';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface ScoreBreakdownProps {
  categories: CategoryScore[];
  overallScore: number;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ categories, overallScore }) => {
  const [expandedId, setExpandedId] = useState<string | null>(categories[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 55) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getBarColor = (score: number) => {
    if (score >= 75) return 'bg-emerald-500';
    if (score >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div id="scoring-breakdown-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-6">
      {/* Section Header matching Sleek theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#1A1C23] text-emerald-400 border border-gray-800">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">Transparent AI Scoring Model</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Weighted quantitative synthesis across 6 fundamental and market pillars
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#1A1C23] border border-gray-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-gray-500 font-semibold">Aggregated Score</div>
            <div className="text-lg font-mono font-bold text-[#E2E8F0]">
              {overallScore}<span className="text-gray-500 text-xs">/100</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-emerald-400 text-sm">
            {overallScore >= 75 ? 'A' : overallScore >= 60 ? 'B' : 'C'}
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const isExpanded = expandedId === cat.id;
          const scoreBadge = getScoreColor(cat.score);
          const barBg = getBarColor(cat.score);
          const weightPercent = Math.round(cat.weight * 100);

          return (
            <div
              key={cat.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-[#1A1C23] border-gray-700 shadow-md'
                  : 'bg-[#1A1C23]/60 border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Category summary banner */}
              <button
                onClick={() => toggleExpand(cat.id)}
                className="w-full p-4 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${scoreBadge}`}>
                    {cat.score}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#E2E8F0] text-sm sm:text-base">
                        {cat.name}
                      </span>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#13151A] text-gray-300 border border-gray-800">
                        {weightPercent}% Weight
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:inline-block">
                        • {cat.rating}
                      </span>
                    </div>

                    <div className="w-full max-w-md bg-[#13151A] h-1.5 rounded-full mt-2 overflow-hidden border border-gray-800/80">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barBg}`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-xs font-mono hidden md:inline">
                    {isExpanded ? 'Hide Evidence' : 'Inspect Metrics'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expandable detailed metrics & benchmarks */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-gray-800 space-y-4">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium bg-[#13151A] p-3.5 rounded-xl border border-gray-800">
                    {cat.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {cat.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-[#13151A] border border-gray-800 space-y-1"
                      >
                        <div className="text-[11px] text-gray-400 font-medium">{metric.label}</div>
                        <div className="font-mono font-bold text-[#E2E8F0] text-sm flex items-center justify-between">
                          <span>{metric.value}</span>
                          {metric.status === 'positive' && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Favorable" />
                          )}
                          {metric.status === 'negative' && (
                            <span className="w-2 h-2 rounded-full bg-rose-400" title="Unfavorable" />
                          )}
                          {metric.status === 'neutral' && (
                            <span className="w-2 h-2 rounded-full bg-amber-400" title="Neutral" />
                          )}
                        </div>
                        {metric.benchmark && (
                          <div className="text-[10px] text-gray-400">
                            vs. {metric.benchmark}
                          </div>
                        )}
                        {metric.source && (
                          <div className="text-[10px] text-gray-400 truncate">
                            Source: {metric.source}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
