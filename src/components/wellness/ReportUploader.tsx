import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const ReportUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    setAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => setAnalyzing(false), 2000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
              Upload Reports
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.png,.doc,.docx"
              multiple
              onChange={handleFileUpload}
            />
          </label>
          <p className="mt-2 text-sm text-gray-500">
            Upload medical reports, test results, or prescriptions
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                <AlertCircle className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {analyzing && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing reports...</p>
        </div>
      )}

      {uploadedFiles.length > 0 && !analyzing && (
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Check className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Analysis Complete</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">Key Findings:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-green-700">
                <li>All vital signs within normal range</li>
                <li>No significant abnormalities detected</li>
                <li>Regular follow-up recommended</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
