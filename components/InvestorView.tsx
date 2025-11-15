
import React, { useState, useCallback, useEffect } from 'react';
import { MOCK_FUNDS } from '../constants';
import { MutualFund } from '../types';
import FundCard from './FundCard';
import PerformanceChart from './PerformanceChart';
import LoadingSpinner from './LoadingSpinner';
import { generateFundAnalysis } from '../services/geminiService';
import { ArrowPathIcon } from './icons';

const FundDetails: React.FC<{ fund: MutualFund; onBack: () => void }> = ({ fund, onBack }) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAnalysis = useCallback(async () => {
        setLoading(true);
        const result = await generateFundAnalysis(fund);
        setAnalysis(result);
        setLoading(false);
    }, [fund]);

    useEffect(() => {
        fetchAnalysis();
    }, [fetchAnalysis]);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-fade-in">
            <button onClick={onBack} className="mb-4 text-brand-primary hover:underline">
                &larr; Back to all funds
            </button>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">{fund.name}</h2>
                    <p className="text-md text-slate-500">{fund.symbol} &bull; {fund.category}</p>
                </div>
                <div className="text-left lg:text-right mt-4 lg:mt-0">
                    <p className="text-sm text-slate-500">Net Asset Value (NAV)</p>
                    <p className="text-3xl font-bold text-slate-800">${fund.nav.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-center">
                <div className="bg-slate-50 p-3 rounded-lg"><span className="block text-sm text-slate-500">YTD Return</span><span className={`font-bold text-lg ${fund.ytdReturn >= 0 ? 'text-brand-accent' : 'text-brand-danger'}`}>{fund.ytdReturn.toFixed(2)}%</span></div>
                <div className="bg-slate-50 p-3 rounded-lg"><span className="block text-sm text-slate-500">Expense Ratio</span><span className="font-bold text-lg text-slate-800">{fund.expenseRatio}%</span></div>
                <div className="bg-slate-50 p-3 rounded-lg"><span className="block text-sm text-slate-500">Risk Level</span><span className="font-bold text-lg text-slate-800">{fund.riskLevel}</span></div>
            </div>

            <h3 className="text-xl font-bold text-brand-dark mb-2">Performance History</h3>
            <PerformanceChart data={fund.performanceHistory} />

            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-brand-dark">Gemini AI Analysis</h3>
                    <button onClick={fetchAnalysis} disabled={loading} className="p-2 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {loading ? <LoadingSpinner /> : (
                    <div className="prose prose-blue max-w-none bg-brand-light p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }}></div>
                )}
            </div>
        </div>
    );
};


const InvestorView = () => {
    const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);

    if (selectedFund) {
        return <FundDetails fund={selectedFund} onBack={() => setSelectedFund(null)} />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Explore Mutual Funds</h2>
            <p className="text-slate-600 mb-6">Select a fund to view detailed information and AI-powered analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_FUNDS.map(fund => (
                    <FundCard key={fund.id} fund={fund} onSelect={setSelectedFund} />
                ))}
            </div>
        </div>
    );
};

export default InvestorView;
