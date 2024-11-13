import * as tf from '@tensorflow/tfjs';

export const classifyReport = async (text) => {
  const input = tokenizer.encode(text);
  const prediction = model.predict(tf.tensor([input]));
  return prediction > 0.5 ? 'Medical Report' : 'Not a Medical Report';
};

export const extractEntities = async (text) => {
  const conditions = text.match(/(diabetes|hypertension|etc)/gi);
  const vitalSigns = text.match(/(blood pressure|heart rate|glucose)/gi);

  return { conditions, vitalSigns };
};

