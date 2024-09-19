// src/DiabetesPrediction.js
import React, { useState } from 'react';
import './DiabetesPrediction.css';

const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: '',
  });

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await fetch('https://diabetes-prediction-machine-learning-tj5e.onrender.com/predict', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://diabetes-prediction-machine-learning-tj5e.onrender.com/predict' 
        },
        body: JSON.stringify({
          pregnancies: Number(formData.Pregnancies),
          glucose: Number(formData.Glucose),
          bloodPressure: Number(formData.BloodPressure),
          skinThickness: Number(formData.SkinThickness),
          insulin: Number(formData.Insulin),
          bmi: Number(formData.BMI),
          diabetesPedigreeFunction: Number(formData.DiabetesPedigreeFunction),
          age: Number(formData.Age),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      setResult('An error occurred: ' + error.message);
    } finally {
      setLoading(false); // Reset loading state after fetch completes
    }
  };

  return (
    <div className="container">
      <h2>Diabetes Prediction System</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="input-group" key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Predict'}
        </button>
      </form>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default DiabetesPrediction;
