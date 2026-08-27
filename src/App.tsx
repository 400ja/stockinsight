import React, { useState, useEffect } from 'react';
import { StockAnalysisReport, SearchResult } from './types';
import { getStockAnalysis, getTrendingTickers } from './services/api';
import { Navbar } from './components/Navbar';
import { StockSearch } from './components/StockSearch';
import { StockHeader } from './components/StockHeader';
import { InvestmentSignalCard } from './components/InvestmentSignalCard';
import { ScoreBreakdown } from './components/ScoreBreakdown';
import { WhySection } from './components/WhySection';
import { StockChart } from './components/StockChart';
import { AnalystSentiment } from './components/AnalystSentiment';
import { NewsSentiment } from './components/NewsSentiment';
import { SmartMoneySection } from './components/SmartMoneySection';
import { RiskAnalysis } from './components/RiskAnalysis';
import { SourcesSection } from './components/SourcesSection';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { AnalysisLoadingProgress } from './components/AnalysisLoadingProgress';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import {
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [report, setReport] = useState<StockAnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trending, setTrending] = useState<SearchResult[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'MSFT']);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);

  // Load saved watchlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stock_insight_watchlist');
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Fetch trending stocks for the hero landing exploration
  useEffect(() => {
    getTrendingTickers().then((data) => setTrending(data)).catch(() => {});
  }, []);

  // Fetch stock analysis whenever selectedTicker changes
  const fetchAnalysis = async (ticker: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedTicker(ticker);

    try {
      const data = await getStockAnalysis(ticker);
      setReport(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || `Failed to analyze ${ticker}. Please check the symbol and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTicker = (ticker: string) => {
    if (!ticker) return;
    fetchAnalysis(ticker);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWatchlist = (ticker: string) => {
    const uppercase = ticker.toUpperCase();
    let updated: string[];
    if (watchlist.includes(uppercase)) {
      updated = watchlist.filter((t) => t !== uppercase);
    } else {
      updated = [...watchlist, uppercase];
    }
    setWatchlist(updated);
    try {
      localStorage.setItem('stock_insight_watchlist', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const isCurrentWatchlisted = selectedTicker
    ? watchlist.includes(selectedTicker.toUpperCase())
    : false;

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#E2E8F0] selection:bg-emerald-500/30 selection:text-emerald-300 font-sans flex flex-col justify-between">
      {/* Top Navigation */}
      <Navbar
        onSelectTicker={handleSelectTicker}
        currentTicker={selectedTicker || undefined}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onHomeClick={() => {
          setSelectedTicker(null);
          setReport(null);
          setError(null);
        }}
        isSearchingActive={!!report && !isLoading}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* State 1: Initial Landing Screen (No stock loaded) */}
        {!report && !isLoading && !error && (
          <div className="space-y-16 py-6 sm:py-12">
            {/* Hero Search Section */}
            <div className="space-y-6">
              <StockSearch onSelectTicker={handleSelectTicker} isLoading={isLoading} />
            </div>

            {/* Trending & Quick Explore Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between text-xs uppercase font-mono tracking-wider text-gray-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Featured Equity Research
                </span>
                <span>Click to analyze immediately</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {(trending.length > 0 ? trending : [
                  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', sector: 'Technology' },
                  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Technology' },
                  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Technology' },
                  { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical' },
                  { symbol: 'AMZN', name: 'Amazon.com, Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical' },
                  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', sector: 'Communication' },
                ]).map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleSelectTicker(stock.symbol)}
                    className="p-4 rounded-2xl bg-[#13151A] border border-gray-800 hover:border-emerald-500/50 hover:bg-[#1A1C23] transition-all text-left group shadow-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1C23] border border-gray-800 flex items-center justify-center font-mono font-bold text-sm text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30">
                        {stock.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-[#E2E8F0] group-hover:text-emerald-400 text-sm">
                          {stock.symbol}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-[160px]">
                          {stock.name}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* AI Scoring Architecture Pillars */}
            <div className="max-w-5xl mx-auto pt-8 border-t border-gray-800 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-[#E2E8F0]">
                  Institutional Multi-Evidence Scoring Engine
                </h3>
                <p className="text-xs text-gray-400 max-w-xl mx-auto">
                  Stock Insight combines quantitative balance sheet metrics with qualitative Wall Street intelligence, news sentiment, and risk analysis.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Fundamentals', weight: '25%', desc: 'Cash Flow, ROE, Debt & Margins' },
                  { name: 'Valuation', weight: '20%', desc: 'P/E, Forward Multiples & Peer Ratios' },
                  { name: 'Momentum', weight: '15%', desc: 'Revenue Growth & Guidance' },
                  { name: 'Analyst Sentiment', weight: '15%', desc: 'Wall St Consensus & Targets' },
                  { name: 'News Sentiment', weight: '15%', desc: 'Verified Developments & Media' },
                  { name: 'Risk Engine', weight: '10%', desc: 'Volatility, Solvency & Stress Tests' },
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#13151A] border border-gray-800 text-center space-y-1"
                  >
                    <div className="font-mono font-bold text-emerald-400 text-sm">{pillar.weight}</div>
                    <div className="font-bold text-xs text-gray-200">{pillar.name}</div>
                    <div className="text-[10px] text-gray-400 leading-tight pt-1">{pillar.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* State 2: Progressive Loading indicator */}
        {isLoading && selectedTicker && (
          <AnalysisLoadingProgress ticker={selectedTicker} />
        )}

        {/* State 3: Error View */}
        {error && !isLoading && (
          <div className="max-w-lg mx-auto my-12 p-6 rounded-2xl bg-rose-950/20 border border-rose-800/40 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h2 className="text-lg font-bold text-[#E2E8F0]">Unable to Complete Analysis</h2>
            <p className="text-xs text-gray-300 leading-relaxed">{error}</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => selectedTicker && handleSelectTicker(selectedTicker)}
                className="px-4 py-2 rounded-xl bg-[#1A1C23] hover:bg-[#232732] border border-gray-700 text-[#E2E8F0] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setSelectedTicker(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all"
              >
                <span>Search Another Ticker</span>
              </button>
            </div>
          </div>
        )}

        {/* State 4: Full Stock Insight Analysis Dashboard */}
        {report && !isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Compact Disclaimer */}
            <DisclaimerBanner compact={true} />

            {/* 1. Stock Header with price, change, company info, and quick stats */}
            <StockHeader
              quote={report.quote}
              isWatchlisted={isCurrentWatchlisted}
              onToggleWatchlist={() => selectedTicker && toggleWatchlist(selectedTicker)}
              onRefresh={() => selectedTicker && handleSelectTicker(selectedTicker)}
              isRefreshing={isLoading}
            />

            {/* 2. Primary Investment Signal Card (BUY / HOLD / SELL + Confidence Meter) */}
            <InvestmentSignalCard
              signal={report.recommendation.signal}
              confidence={report.recommendation.confidence}
              overallScore={report.recommendation.overallScore}
              verdictSummary={report.recommendation.verdictSummary}
              keyTakeaway={report.recommendation.keyTakeaway}
              conflictWarning={report.recommendation.conflictWarning}
            />

            {/* 3. Transparent 6-Pillar Score Breakdown */}
            <ScoreBreakdown
              categories={report.scoringCategories}
              overallScore={report.recommendation.overallScore}
            />

            {/* 4. "Why Stock Insight Says BUY / HOLD / SELL" with verifiable source citations */}
            <WhySection
              signal={report.recommendation.signal}
              factors={report.whyFactors}
              ticker={report.ticker}
            />

            {/* 5. Historical Price Performance & Multi-Period Returns (1D, 1W, 1M, 6M, 1Y, 5Y) */}
            <StockChart
              prices={report.historicalPrices}
              currentPrice={report.quote.price}
              currency={report.quote.currency}
              returns={report.returns}
              ticker={report.ticker}
            />

            {/* 6. Investor Sentiment & Smart Money (13F Filings, Institutional positioning) */}
            <SmartMoneySection
              smartMoney={report.smartMoney}
              ticker={report.ticker}
            />

            {/* 7. Wall Street Analyst Consensus & Price Targets */}
            <AnalystSentiment
              analystData={report.analystSentiment}
              currentPrice={report.quote.price}
            />

            {/* 8. Verified News & Market Sentiment */}
            <NewsSentiment
              news={report.news}
              ticker={report.ticker}
            />

            {/* 9. Key Investment Risks & Downside Scenarios */}
            <RiskAnalysis
              risks={report.risks}
              ticker={report.ticker}
            />

            {/* 10. Verifiable Research Sources & SEC Filings */}
            <SourcesSection sources={report.sources} />
          </div>
        )}
      </main>

      {/* Full Financial Disclaimer & Terminal Status Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 space-y-4">
        <DisclaimerBanner compact={false} />
        <div className="text-gray-500 font-mono flex flex-col sm:flex-row items-center justify-between text-xs pt-4 border-t border-gray-800/80 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>REAL-TIME DATA ENABLED</span>
          </div>
          <div>STOCK INSIGHT RESEARCH TERMINAL</div>
          <div>API VERSION 2.4.1</div>
        </div>
      </footer>

      {/* Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onSelectTicker={handleSelectTicker}
        onRemoveFromWatchlist={toggleWatchlist}
      />
    </div>
  );
}
