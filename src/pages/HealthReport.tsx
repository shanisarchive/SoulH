import React, { useState } from 'react';
import { FileText, Download, Share2, AlertCircle } from 'lucide-react';
import WellnessReport from '../components/report/WellnessReport';
import WellbeingReport from '../components/report/WellbeingReport';
import ReportSummary from '../components/report/ReportSummary';

const HealthReport = () => {
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Report</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive analysis of your health data
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WellnessReport />
            <WellbeingReport />
          </div>
          <div className="lg:col-span-1">
            <ReportSummary onGenerate={handleGenerateReport} generating={generating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;