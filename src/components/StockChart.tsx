import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { HistoricalPricePoint, ReturnsData } from '../types';
import { TrendingUp, Calendar } from 'lucide-react';

interface StockChartProps {
  prices: HistoricalPricePoint[];
  currentPrice: number;
  currency?: string;
  returns: ReturnsData;
  ticker: string;
}

type Timeframe = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y';

export const StockChart: React.FC<StockChartProps> = ({
  prices,
  currentPrice,
  currency = 'USD',
  returns,
  ticker,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');

  // Filter historical data points based on selected timeframe
  const filteredData = useMemo(() => {
    if (!prices || prices.length === 0) return [];

    let sliceCount = prices.length;
    switch (timeframe) {
      case '1D':
        sliceCount = 2;
        break;
      case '1W':
        sliceCount = 5;
        break;
      case '1M':
        sliceCount = 21;
        break;
      case '6M':
        sliceCount = 126;
        break;
      case '1Y':
        sliceCount = 252;
        break;
      case '5Y':
        sliceCount = prices.length;
        break;
    }

    const data = prices.slice(Math.max(0, prices.length - sliceCount));
    return data;
  }, [prices, timeframe]);

  // Compute period return based on filtered data
  const periodReturn = useMemo(() => {
    if (filteredData.length < 2) return { diff: 0, percent: 0, isPositive: true };
    const first = filteredData[0].price;
    const last = filteredData[filteredData.length - 1].price;
    const diff = last - first;
    const percent = (diff / first) * 100;
    return {
      diff: Number(diff.toFixed(2)),
      percent: Number(percent.toFixed(2)),
      isPositive: diff >= 0,
    };
  }, [filteredData]);

  // Determine min and max for Y-Axis padding
  const { minPrice, maxPrice } = useMemo(() => {
    if (filteredData.length === 0) return { minPrice: 0, maxPrice: 100 };
    const vals = filteredData.map((d) => d.price);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const padding = (max - min) * 0.08 || 5;
    return {
      minPrice: Math.floor(Math.max(0, min - padding)),
      maxPrice: Math.ceil(max + padding),
    };
  }, [filteredData]);

  const isGreen = periodReturn.isPositive;
  const strokeColor = isGreen ? '#10b981' : '#f43f5e';
  const fillGradientId = isGreen ? 'greenChartGradient' : 'redChartGradient';

  const returnCards = [
    { label: '1-Day Return', val: returns.oneDay },
    { label: '1-Week Return', val: returns.oneWeek },
    { label: '1-Month Return', val: returns.oneMonth },
    { label: '6-Month Return', val: returns.sixMonths },
    { label: '1-Year Return', val: returns.oneYear },
    { label: '5-Year Return', val: returns.fiveYears },
  ];

  return (
    <div id="stock-chart-card" className="p-6 rounded-2xl bg-[#13151A] border border-gray-800 shadow-xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#1A1C23] text-emerald-400 border border-gray-800">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#E2E8F0] font-sans">Price Performance</h2>
          </div>

          <div className="flex items-center gap-2 mt-1 font-mono text-xs">
            <span className="text-gray-400">Period Change:</span>
            <span className={`font-bold flex items-center ${isGreen ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isGreen ? '+' : ''}${periodReturn.diff.toFixed(2)} ({isGreen ? '+' : ''}{periodReturn.percent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Timeframe Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1A1C23] border border-gray-800 self-start sm:self-auto">
          {(['1D', '1W', '1M', '6M', '1Y', '5Y'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                timeframe === tf
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-[#E2E8F0] hover:bg-gray-800/60'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="greenChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="redChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => {
                if (!val) return '';
                const parts = val.split('-');
                return parts.length >= 3 ? `${parts[1]}/${parts[2]}` : val;
              }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as HistoricalPricePoint;
                  return (
                    <div className="p-3 rounded-xl bg-[#1A1C23] border border-gray-700 shadow-2xl text-xs font-mono">
                      <div className="text-gray-400">{data.date}</div>
                      <div className="text-base font-bold text-[#E2E8F0] mt-0.5">
                        ${data.price.toFixed(2)}
                      </div>
                      {data.volume && (
                        <div className="text-[10px] text-gray-400 mt-1">
                          Vol: {(data.volume / 1e6).toFixed(2)}M
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${fillGradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Historical Performance Returns Grid (1D, 1W, 1M, 6M, 1Y, 5Y) */}
      <div>
        <div className="text-xs uppercase font-mono font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-500" /> Historical Performance Benchmarks
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {returnCards.map((item, idx) => {
            const val = item.val;
            const hasVal = val !== null && !isNaN(val);
            const isPos = hasVal && val >= 0;

            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#1A1C23] border border-gray-800 text-center"
              >
                <div className="text-[11px] text-gray-400 font-medium">{item.label}</div>
                <div className="font-mono font-bold text-sm sm:text-base mt-1 flex items-center justify-center gap-0.5">
                  {hasVal ? (
                    <span className={isPos ? 'text-emerald-400' : 'text-rose-400'}>
                      {isPos ? '+' : ''}{val.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs font-normal">Data unavailable</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
