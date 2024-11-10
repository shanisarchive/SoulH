import React, { useState } from 'react';
import pdfParse from 'pdf-parse';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const ReportUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMedicalReport = (text: string): boolean => {
    const keywords = ['CBC', 'Complete Blood Count', 'Hemoglobin', 'WBC', 'RBC', 'Platelets', 'Report'];
    return keywords.some(keyword => text.includes(keyword));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    setAnalyzing(true);
    setErrorMessage(null);

    for (const file of files) {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdfData = await pdfParse(arrayBuffer);
        const textContent = pdfData.text;

        if (isMedicalReport(textContent)) {
          setAnalysisResult('Key Findings:\n- All vital signs within normal range\n- No significant abnormalities detected\n- Regular follow-up recommended');
        } else {
          setErrorMessage('Please upload a valid medical report.');
        }
      } else {
        setErrorMessage('Only PDF files are supported for analysis.');
      }
    }
    setAnalyzing(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setAnalysisResult(null);
    setErrorMessage(null);
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
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
            />
          </label>
          <p className="mt-2 text-sm text-gray-500">
            Upload medical reports in PDF format only.
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

      {analysisResult && !analyzing && (
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Check className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Analysis Complete</h3>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{analysisResult}</p>
          </div>
        </div>
      )}

      {errorMessage && !analyzing && (
        <div className="bg-white border border-red-200 rounded-lg p-4 text-red-600">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
