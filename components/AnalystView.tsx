
import React, { useState, useCallback, useEffect } from 'react';
import { generateMarketTrendAnalysis } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { ArrowPathIcon } from './icons';

const AnalystView = () => {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAnalysis = useCallback(async () => {
        setLoading(true);
        const result = await generateMarketTrendAnalysis();
        setAnalysis(result);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Data Analyst Workspace</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-brand-dark">Market Trend Analysis (via Google Search)</h3>
                    <button 
                        onClick={fetchAnalysis} 
                        disabled={loading}
                        className="p-2 rounded-full hover:bg-slate-200 disabled:opacity-50"
                    >
                        <ArrowPathIcon className={`w-6 h-6 text-brand-primary ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                <p className="text-slate-600 mb-4">
                    AI-generated summary of current market trends using real-time data from Google Search.
                </p>

                {loading ? <LoadingSpinner /> : (
                    <div className="prose prose-blue max-w-none bg-brand-light p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }}></div>
                )}
            </div>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Update Fund Performance Data</h3>
                <p className="text-slate-600 mb-4">This section would contain tools for analysts to upload and process new fund performance data.</p>
                <button className="bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors">
                    Upload New Data
                </button>
            </div>
        </div>
    );
};

export default AnalystView;
