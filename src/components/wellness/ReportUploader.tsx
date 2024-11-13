import React, { useState } from 'react';
import { extractTextFromPDF } from '../../services/ocr';
import { classifyReport, extractEntities } from '../../services/nlp';

const ReportUploader = () => {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    try {
      const text = await extractTextFromPDF(file);
      const classification = await classifyReport(text);

      if (classification !== 'Medical Report') {
        setError('Uploaded file is not a medical report.');
        return;
      }

      const entities = await extractEntities(text);
      setAnalysis(entities);
      setError('');
    } catch (err) {
      setError('An error occurred during analysis.');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
      {error && <div className="error">{error}</div>}
      {analysis && (
        <div>
          <h2>Analysis Complete</h2>
          <p>{JSON.stringify(analysis, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
