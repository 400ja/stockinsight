import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div id="disclaimer-banner-compact" className="flex items-center gap-2 px-3.5 py-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span>
          <strong>Important:</strong> Stock Insight provides AI-generated research and is not financial advice. Investment decisions involve risk; past performance does not guarantee future results.
        </span>
      </div>
    );
  }

  return (
    <footer id="disclaimer-banner-full" className="mt-12 py-6 px-6 rounded-2xl bg-[#13151A] border border-gray-800 text-gray-400 text-xs leading-relaxed">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-gray-200 uppercase tracking-wider text-[11px]">Financial Disclaimer & Risk Notice</h4>
          <p>
            Stock Insight provides AI-generated research and is not financial advice. Investment decisions involve risk, and past performance does not guarantee future results.
            All ratings, confidence scores, and synthesis metrics are generated for educational and analytical purposes using available market data and algorithms.
            Always conduct independent research or consult a licensed fiduciary financial advisor before making investment commitments.
          </p>
        </div>
      </div>
    </footer>
  );
};
