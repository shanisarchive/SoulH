import React, { useState } from 'react';
import { FileText, Download, Share2, AlertCircle } from 'lucide-react';
import { useHealthReport } from '../../hooks/useHealthReport';

const HealthReport = () => {
  const [generating, setGenerating] = useState(false);
  const { generateReport, report } = useHealthReport();

  const handleGenerateReport = async () => {
    setGenerating(true);
    await generateReport();
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Report</h1>
            <p className="text-gray-600 mt-1">
              WHO-standard comprehensive health analysis
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              onClick={() => {/* Implement share functionality */}}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
              onClick={() => {/* Implement download functionality */}}
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {report ? (
          <div className="space-y-6">
            {/* Physical Health Section */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Physical Health</h2>
              <div className="grid grid-cols-2 gap-4">
                {report.physicalMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{metric.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </span>
                      <span className={`text-sm ${
                        metric.status === 'good' ? 'text-green-600' :
                        metric.status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mental Health Section */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mental Health</h2>
              <div className="space-y-4">
                {report.mentalHealthInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{insight.title}</p>
                      <p className="text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="border rounded-lg p-6 bg-rose-50">
              <h2 className="text-xl font-semibold text-rose-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-rose-500 mt-0.5" />
                    <p className="text-rose-800">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="w-full py-4 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {generating ? 'Generating Report...' : 'Generate Health Report'}
          </button>
        )}
      </div>
    </div>
  );
};