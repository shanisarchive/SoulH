import React, { useState } from 'react';
import { Camera, Upload, X, AlertCircle } from 'lucide-react';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';

const ImageAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { analyzing, results, analyzeImage } = useAIAnalysis();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center">
          {!selectedImage ? (
            <>
              <Camera className="h-12 w-12 text-gray-400 mb-4" />
              <label className="cursor-pointer">
                <span className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
                  Upload Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Upload a clear image for AI analysis
              </p>
            </>
          ) : (
            <div className="relative w-full max-w-md">
              <img
                src={selectedImage}
                alt="Analysis"
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {analyzing && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">AI analyzing image...</p>
        </div>
      )}

      {results && !analyzing && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
          <div className="space-y-4">
            {results.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertCircle className={`h-5 w-5 ${issue.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div>
                  <p className="font-medium text-gray-900">{issue.title}</p>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {results.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;