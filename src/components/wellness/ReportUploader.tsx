import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import pdfParse from 'pdf-parse';

const ReportUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);
    setAnalysisResult(null);
    setUploadedFiles([...uploadedFiles, ...files]);
    setAnalyzing(true);

    for (const file of files) {
      if (file.type !== 'application/pdf') {
        setError("Only PDF files are allowed.");
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const text = await pdfParse(arrayBuffer);

        if (isMedicalReport(text)) {
          const reportAnalysis = analyzeMedicalReport(text);
          setAnalysisResult(reportAnalysis);
          saveToLocalDatabase(file.name, reportAnalysis);
        } else {
          setError("Invalid report. Please upload a valid medical report.");
        }
      } catch (err) {
        setError("Failed to process the PDF. Please try again.");
      }
    }

    setAnalyzing(false);
  };

  const isMedicalReport = (text: string): boolean => {
    // Look for medical keywords commonly found in medical reports
    const medicalKeywords = [
      "Haemoglobin", "RBC", "WBC", "Glomerular Filtration Rate", 
      "Electrolytes", "Uric Acid", "Creatinine", "Chlorides", 
      "Sodium", "Potassium"
    ];

    return medicalKeywords.some(keyword => text.includes(keyword));
  };

  const analyzeMedicalReport = (text: string): string => {
    // Dummy analysis: Look for values and provide a sample summary
    const findings = [];
    if (text.includes("Haemoglobin")) findings.push("Haemoglobin within range.");
    if (text.includes("RBC")) findings.push("RBC levels are adequate.");
    if (text.includes("WBC")) findings.push("WBC count normal.");

    return findings.length > 0 ? findings.join("\n") : "No abnormalities detected.";
  };

  const saveToLocalDatabase = (fileName: string, reportAnalysis: string) => {
    const currentReports = JSON.parse(localStorage.getItem("reports") || "[]");
    const newReport = { fileName, analysis: reportAnalysis, date: new Date().toISOString() };
    localStorage.setItem("reports", JSON.stringify([...currentReports, newReport]));
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
            <div key={index} className="bg-white border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-gray-600">
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
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">Key Findings:</p>
              <p className="text-green-700">{analysisResult}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
