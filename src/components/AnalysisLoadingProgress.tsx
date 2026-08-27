import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react';

interface AnalysisLoadingProgressProps {
  ticker: string;
}

const STEPS = [
  { id: 1, label: 'Fetching real-time market data & price charts', short: 'Market Data' },
  { id: 2, label: 'Synthesizing financial statements & fundamental metrics', short: 'Fundamentals' },
  { id: 3, label: 'Aggregating Wall Street consensus & analyst price targets', short: 'Analyst Sentiment' },
  { id: 4, label: 'Evaluating recent news sentiment & industry developments', short: 'News Sentiment' },
  { id: 5, label: 'Executing multi-factor AI research & institutional analysis', short: 'AI Research' },
  { id: 6, label: 'Computing confidence score & final Buy/Hold/Sell recommendation', short: 'Final Recommendation' },
];

export const AnalysisLoadingProgress: React.FC<AnalysisLoadingProgressProps> = ({ ticker }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="analysis-loading-card" className="w-full max-w-xl mx-auto my-12 p-8 rounded-2xl bg-[#13151A] border border-gray-800 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5 animate-spin text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#E2E8F0] flex items-center gap-2 font-sans">
              Analyzing <span className="text-emerald-400 font-mono tracking-wide">{ticker.toUpperCase()}</span>
            </h2>
            <p className="text-xs text-gray-400">Synthesizing multiple forms of financial evidence</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1C23] border border-gray-800 text-xs font-mono text-emerald-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Step {currentStepIndex + 1} of 6</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#1A1C23] border border-emerald-500/30 translate-x-1 shadow-sm'
                  : isDone
                  ? 'bg-[#1A1C23]/40 text-gray-400 border border-transparent'
                  : 'text-gray-600 opacity-60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                )}
                <span className={`text-sm font-medium ${isCurrent ? 'text-[#E2E8F0] font-semibold' : isDone ? 'text-gray-300' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                isDone ? 'text-emerald-400 bg-emerald-500/10' : isCurrent ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-600'
              }`}>
                {step.short}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <div className="w-full bg-[#1A1C23] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-2.5">
          Evaluating SEC filings, Wall Street consensus, historical multiples, and risk factors
        </p>
      </div>
    </div>
  );
};
