
import React, { useState, useCallback } from 'react';
import { generateEducationalArticle } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const AdvisorView = () => {
    const [topic, setTopic] = useState<string>('The Power of Compound Interest');
    const [article, setArticle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleGenerateArticle = useCallback(async () => {
        if (!topic) return;
        setLoading(true);
        const result = await generateEducationalArticle(topic);
        setArticle(result);
        setLoading(false);
    }, [topic]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Financial Advisor Hub</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Create Educational Content</h3>
                <p className="text-slate-600 mb-4">Enter a topic and use Gemini AI to generate a draft for an educational article.</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter article topic"
                        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                    />
                    <button
                        onClick={handleGenerateArticle}
                        disabled={loading || !topic}
                        className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate Article'}
                    </button>
                </div>
                
                {loading && <LoadingSpinner />}
                
                {article && !loading && (
                    <div className="mt-6 border-t pt-6">
                        <h4 className="text-lg font-bold text-brand-dark mb-2">Generated Article Draft</h4>
                         <div className="prose prose-blue max-w-none bg-brand-light p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: article.replace(/\n/g, '<br />') }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvisorView;
