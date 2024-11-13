import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import pdfParse from 'pdf-parse';

const ReportUploader: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<string | null>(null);
  const [isMedicalReport, setIsMedicalReport] = useState<boolean | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);

    setAnalyzing(true);
    const results = await analyzeFiles(files);
    setAnalysisResults(results);
    setAnalyzing(false);
  };

  const analyzeFiles = async (files: File[]) => {
    for (const file of files) {
      if (file.type === 'application/pdf') {
        try {
          const data = await file.arrayBuffer();
          const parsedData = await pdfParse(data);

          // Ensure text content is parsed
          if (!parsedData.text) {
            return "Error: Could not extract text from PDF. Please check the file format.";
          }

          // Improved medical report check
          const isMedical = improvedMedicalReportCheck(parsedData.text);
          setIsMedicalReport(isMedical);

          if (isMedical) {
            // Perform further analysis if it's a medical report
            const analysis = analyzeMedicalContent(parsedData.text);
            return analysis;
          } else {
            return "This file does not appear to be a medical report.";
          }
        } catch (error) {
          console.error("Error parsing PDF:", error);
          return "Error analyzing the file.";
        }
      } else {
        return "Only PDF files are supported.";
      }
    }
  };

  const improvedMedicalReportCheck = (text: string) => {
    const medicalKeywords = [
      'blood pressure', 'heart rate', 'diagnosis', 'treatment', 'symptoms', 
      'prescription', 'test result', 'imaging', 'ECG', 'cholesterol', 'hemoglobin'
    ];
    const medicalSections = [
      'Lab Results', 'Diagnostic Imaging', 'Assessment', 'Prescription', 'Medication'
    ];

    // Check for multiple keywords and sections
    const keywordMatchCount = medicalKeywords.filter(keyword => text.toLowerCase().includes(keyword)).length;
    const sectionMatchCount = medicalSections.filter(section => text.toLowerCase().includes(section.toLowerCase())).length;

    // Require 3+ keyword matches and 1+ section match
    return keywordMatchCount >= 3 && sectionMatchCount >= 1;
  };

  const analyzeMedicalContent = (text: string) => {
    const diseaseDatabase = [
      { disease: 'Hypertension', symptoms: ['high blood pressure', 'headache', 'dizziness'] },
      { disease: 'Diabetes', symptoms: ['high blood sugar', 'thirst', 'frequent urination'] },
      // Add more disease-symptom mappings as needed
    ];

    const detectedConditions = diseaseDatabase
      .filter(disease => disease.symptoms.some(symptom => text.toLowerCase().includes(symptom)))
      .map(disease => disease.disease);

    if (detectedConditions.length > 0) {
      return `Analysis Complete\n\nKey Findings:\n- Possible conditions: ${detectedConditions.join(', ')}\n- Follow-up recommended based on findings.`;
    } else {
      return "No specific conditions matched. Regular monitoring recommended.";
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setIsMedicalReport(null);
    setAnalysisResults(null);
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

      {analysisResults && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Analysis Complete</h3>
          <p className="text-gray-700 whitespace-pre-line">{analysisResults}</p>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
