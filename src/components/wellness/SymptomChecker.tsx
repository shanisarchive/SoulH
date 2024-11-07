import React, { useState } from 'react';
import { Search, Plus, X, AlertCircle } from 'lucide-react';
import { useSymptomChecker } from '../../hooks/useSymptomChecker';

const SymptomChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    analysis,
    analyzing,
    commonSymptoms,
    analyzeSymptoms
  } = useSymptomChecker();

  const filteredSymptoms = commonSymptoms.filter(
    symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSymptoms.includes(symptom)
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {searchTerm && filteredSymptoms.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => {
                addSymptom(symptom);
                setSearchTerm('');
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <span>{symptom}</span>
              <Plus className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {selectedSymptoms.map((symptom) => (
          <div
            key={symptom}
            className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full flex items-center"
          >
            <span>{symptom}</span>
            <button
              onClick={() => removeSymptom(symptom)}
              className="ml-2 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {selectedSymptoms.length > 0 && !analysis && (
        <button
          onClick={analyzeSymptoms}
          disabled={analyzing}
          className="w-full py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          {analyzing ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      )}

      {analyzing && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing your symptoms...</p>
        </div>
      )}

      {analysis && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium mb-2">
                Possible Conditions:
              </p>
              {analysis.conditions.map((condition, index) => (
                <div key={index} className="flex items-start space-x-3 mt-2">
                  <AlertCircle className={`h-5 w-5 ${
                    condition.probability > 0.7 ? 'text-red-500' :
                    condition.probability > 0.4 ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {condition.name} ({Math.round(condition.probability * 100)}% match)
                    </p>
                    <p className="text-sm text-gray-600">{condition.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-500 italic">
              Note: This is an AI-powered analysis and should not replace professional medical advice.
              Please consult a healthcare provider for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;