import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { Button, Paper, Typography, Box, TextField, CircularProgress } from '@mui/material';

const TreeCrown = () => {
  const [time, setTime] = useState('');
  const [force, setForce] = useState('');
  const [predictedDeformation, setPredictedDeformation] = useState(null);
  const [predictedStrain, setPredictedStrain] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Mock API request to simulate prediction logic
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve({ deformation: Math.random().toFixed(2), strain: Math.random().toFixed(2) }), 2000);
      });

      setPredictedDeformation(response.deformation);
      setPredictedStrain(response.strain);
    } catch (error) {
      setError("An error occurred while predicting deformation and strain.");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setTime('');
    setForce('');
    setPredictedDeformation(null);
    setPredictedStrain(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 drop-shadow-md text-center">
        Predict Deformation and Strain
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl flex flex-col items-center space-y-6">
        <div className="w-full grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="time" className="text-gray-700 font-medium">Time:</label>
            <input 
              type="number" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="force" className="text-gray-700 font-medium">Force:</label>
            <input 
              type="number" 
              value={force} 
              onChange={(e) => setForce(e.target.value)} 
              required 
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none shadow-sm"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>{loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Predict'}</span>
        </button>
        
        <button 
          type="button" 
          onClick={resetState} 
          className="w-full py-3 text-lg border-2 border-gray-300 hover:border-gray-500 text-gray-800 mt-4 rounded-lg"
        >
          Reset
        </button>
      </form>

      {error && (
        <div className="mt-6 text-red-600 font-semibold bg-red-100 p-4 rounded-lg border-l-4 border-red-500 w-full max-w-xl">
          {error}
        </div>
      )}

      {!loading && (predictedDeformation !== null || predictedStrain !== null) && (
        <div className="mt-6 bg-green-100 p-6 rounded-lg shadow-md w-full max-w-xl">
          <h2 className="text-xl font-bold text-green-700 mb-4">Prediction Results:</h2>
          {predictedDeformation !== null && (
            <p className="text-gray-700 font-medium">
              Deformation: <span className="font-semibold">{predictedDeformation}</span>
            </p>
          )}
          {predictedStrain !== null && (
            <p className="text-gray-700 font-medium">
              Strain: <span className="font-semibold">{predictedStrain}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeCrown;
