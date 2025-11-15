
import React from 'react';
import { MutualFund } from '../types';

interface FundCardProps {
  fund: MutualFund;
  onSelect: (fund: MutualFund) => void;
}

const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
  switch (risk) {
    case 'Low': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'High': return 'bg-red-100 text-red-800';
  }
};

const FundCard: React.FC<FundCardProps> = ({ fund, onSelect }) => {
  const isPositiveReturn = fund.ytdReturn >= 0;

  return (
    <div 
      className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer flex flex-col justify-between"
      onClick={() => onSelect(fund)}
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-brand-primary">{fund.name}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRiskColor(fund.riskLevel)}`}>
            {fund.riskLevel}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-2">{fund.symbol} &bull; {fund.category}</p>
      </div>
      <div className="mt-4 flex justify-between items-baseline">
        <div>
          <p className="text-xs text-slate-500">NAV</p>
          <p className="text-2xl font-semibold text-slate-800">${fund.nav.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 text-right">YTD Return</p>
          <p className={`text-xl font-semibold ${isPositiveReturn ? 'text-brand-accent' : 'text-brand-danger'}`}>
            {isPositiveReturn ? '+' : ''}{fund.ytdReturn.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
