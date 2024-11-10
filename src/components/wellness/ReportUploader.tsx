import React, { useState } from 'react';
import pdf from 'pdf-parse';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const ReportUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ isValid: boolean; content?: string; message?: string; summary?: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
    setAnalyzing(true);

    // Process each file asynchronously
    for (const file of files) {
      const result = await analyzePDF(file);
      setAnalysisResult(result);
    }
    
    setAnalyzing(false);
  };

  const analyzePDF = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = await pdf(Buffer.from(arrayBuffer));
      const text = data.text;

      // Check if the PDF contains keywords related to a medical report
      if (text.match(/medical report|diagnosis|patient|treatment|prescription|results|findings|observations/gi)) {
        const summary = generateSummary(text); // Generate a summary based on extracted text
        return {
          isValid: true,
          content: text,
          summary,
        };
      } else {
        return {
          isValid: false,
          message: 'Please upload a valid medical report.',
        };
      }
    } catch (error) {
      console.error("Error parsing PDF:", error);
      return {
        isValid: false,
        message: 'Failed to analyze the PDF. Please try a different file.',
      };
    }
  };

  const generateSummary = (text: string) => {
    // Sample function to generate a summary based on keywords in the medical report
    const findings = text.match(/findings:([\s\S]*?)(?:\n|$)/i);
    const recommendations = text.match(/recommendations:([\s\S]*?)(?:\n|$)/i);
    const summary = `
      Key Findings: ${findings ? findings[1].trim() : 'Not available'}.
      Recommendations: ${recommendations ? recommendations[1].trim() : 'Not available'}.
    `;
    return summary;
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setAnalysisResult(null);
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

      {analysisResult && (
        <div className={`bg-white border rounded-lg p-6 ${analysisResult.isValid ? 'border-green-200' : 'border-red-200'}`}>
          {analysisResult.isValid ? (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <Check className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Analysis Complete</h3>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">Key Findings:</p>
                <p className="text-green-700 mt-2 whitespace-pre-line">{analysisResult.summary}</p>
              </div>
            </>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Invalid Report</h3>
              </div>
              <p className="text-red-700">{analysisResult.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
