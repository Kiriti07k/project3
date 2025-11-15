
import React from 'react';
import { UserGroupIcon, DocumentTextIcon, ChartBarIcon } from './icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-brand-light p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-brand-dark">{value}</p>
        </div>
    </div>
);

const AdminView = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Active Users" value="1,284" icon={<UserGroupIcon className="w-8 h-8 text-brand-primary" />} />
                <StatCard title="Funds Tracked" value="152" icon={<ChartBarIcon className="w-8 h-8 text-brand-primary" />} />
                <StatCard title="Content Updates Today" value="8" icon={<DocumentTextIcon className="w-8 h-8 text-brand-primary" />} />
            </div>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Recent Activities</h3>
                <ul className="space-y-3">
                    <li className="p-3 bg-slate-50 rounded-lg">User 'john.doe' viewed <strong>VFIAX</strong> details.</li>
                    <li className="p-3 bg-slate-50 rounded-lg">Financial Advisor 'jane.smith' published a new article on "Diversification".</li>
                    <li className="p-3 bg-slate-50 rounded-lg">Data Analyst 'data.team' updated performance data for <strong>VBTLX</strong>.</li>
                    <li className="p-3 bg-slate-50 rounded-lg">New user 'new.investor' signed up.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminView;
