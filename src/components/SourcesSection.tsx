import React from 'react';
import { ExternalLink, Database, BookOpen, FileCheck, ShieldCheck } from 'lucide-react';

interface SourcesSectionProps {
  sources: {
    title: string;
    url?: string;
    provider: string;
    type: string;
  }[];
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({ sources }) => {
  return (
    <div id="sources-section-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">Research Sources & Disclosures</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Verifiable public data feeds, SEC regulatory filings, and institutional consensus datasets
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit-Ready Citations</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sources.map((source, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#1A1C23] border border-gray-800 flex flex-col justify-between space-y-2 text-xs"
          >
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#13151A] text-gray-300 border border-gray-800">
                {source.type}
              </span>
              <h3 className="font-semibold text-gray-200 mt-2 text-xs leading-snug">
                {source.title}
              </h3>
            </div>

            <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
              <span className="truncate">{source.provider}</span>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
