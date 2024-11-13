import * as tf from '@tensorflow/tfjs';

export const classifyReport = async (text) => {
  const input = tokenizer.encode(text);
  const prediction = model.predict(tf.tensor([input]));
  return prediction > 0.5 ? 'Medical Report' : 'Not a Medical Report';
};

export const extractEntities = async (text) => {
  // Regex patterns for medical conditions
  const conditions = text.match(
    /(diabetes|hypertension|asthma|anemia|arthritis|coronary artery disease|cancer|depression|obesity|stroke|COPD|heart disease|hyperthyroidism|hypothyroidism|tuberculosis)/gi
  );

  // Regex patterns for vital signs
  const vitalSigns = text.match(
    /(blood pressure|heart rate|pulse rate|oxygen saturation|respiratory rate|body temperature|glucose level|blood sugar|cholesterol|hemoglobin|hematocrit|platelet count|white blood cell count|WBC|RBC|bilirubin|creatinine|urea|albumin|lipase|amylase|calcium level|sodium level|potassium level)/gi
  );

  // Pattern for numeric values associated with vital signs (e.g., "Blood Pressure: 120/80 mmHg")
  const values = text.match(
    /(\b\d{1,3}\/\d{1,3}\s*mmHg\b|\b\d{2,3}\s*bpm\b|\b\d{2,3}%|\b\d{1,3}\.\d{1,2}\s*mg\/dL\b|\b\d{1,3}\.\d{1,2}\s*g\/dL\b|\b\d{1,3}\.\d{1,2}\s*mmol\/L\b)/gi
  );

  return {
    conditions: conditions ? Array.from(new Set(conditions)) : [],
    vitalSigns: vitalSigns ? Array.from(new Set(vitalSigns)) : [],
    values: values ? Array.from(new Set(values)) : [],
  };
};
