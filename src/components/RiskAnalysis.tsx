import React from 'react';
import { RiskFactorItem } from '../types';
import { ShieldAlert, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';

interface RiskAnalysisProps {
  risks: RiskFactorItem[];
  ticker: string;
}

export const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ risks, ticker }) => {
  const getSeverityBadge = (severity: 'Low' | 'Moderate' | 'High') => {
    switch (severity) {
      case 'High':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Moderate':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Low':
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div id="risk-analysis-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-5">
      {/* Header matching Sleek theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            RISK FACTORS & DOWNSIDE SCENARIOS
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Qualitative and quantitative vulnerabilities evaluated for {ticker}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1C23] border border-gray-800 text-xs font-mono text-gray-400">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Stress-Testing Model</span>
        </div>
      </div>

      {/* Risks Grid with glowing amber bullets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((risk, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#1A1C23] border border-gray-800 hover:border-gray-700 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  {risk.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getSeverityBadge(risk.severity)}`}>
                  {risk.severity} Risk
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <h4 className="font-bold text-sm text-[#E2E8F0] leading-snug">
                  {risk.title}
                </h4>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pl-4">
                {risk.description}
              </p>
            </div>

            {risk.mitigant && (
              <div className="pt-2.5 border-t border-gray-800 pl-4 flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  <strong className="text-gray-300 font-medium">Mitigant: </strong>
                  {risk.mitigant}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
