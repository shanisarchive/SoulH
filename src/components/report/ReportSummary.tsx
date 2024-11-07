import React from 'react';
import { FileText, RefreshCw } from 'lucide-react';

interface ReportSummaryProps {
  generating: boolean;
  onGenerate: () => void;
}

const ReportSummary = ({ generating, onGenerate }: ReportSummaryProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
        <button
          onClick={onGenerate}
          disabled={generating}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
          <span>{generating ? 'Generating...' : 'Refresh'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Overall Health Score</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-rose-500"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 56}`,
                    strokeDashoffset: `${2 * Math.PI * 56 * (1 - 0.85)}`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '64px 64px'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">85</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Key Achievements</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-green-500" />
                <span>Consistent exercise routine</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-green-500" />
                <span>Improved sleep quality</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-green-500" />
                <span>Regular mindfulness practice</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-rose-500" />
                <span>Increase water intake</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-rose-500" />
                <span>Add strength training</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-rose-500" />
                <span>Practice deep breathing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;