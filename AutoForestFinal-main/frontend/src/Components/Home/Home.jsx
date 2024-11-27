import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://teamzelus.com/wp-content/uploads/2023/05/AI-in-Construction-2-1.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="flex flex-col items-center justify-center h-full text-white pt-12">
          <motion.h1
            className="text-5xl font-bold leading-tight text-center mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FEA-AI:Integrating ML Models with FEA Analysis and Report Generation
          </motion.h1>
          <motion.p
            className="text-lg max-w-lg text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Finite Element Analysis with Machine Learning Models.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn More
          </motion.a>
        </div>
      </div>

      {/* Problem Statement and Objectives Section */}
      <div className="flex justify-center mt-16 space-x-8">
        {/* Problem Statement Card */}
        <div className="relative w-1/2 flex justify-center">
          <img
            src="/blob.svg"
            alt="Problem Statement"
            className="w-10/12 h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
            <div className="max-w-xs">
              <motion.h2
                className="text-4xl font-bold mb-4 text-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Problem Statement
              </motion.h2>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
              This project aims at learning & developing an ML-based surrogate model to estimate strain and deformation in a sample structure, reducing reliance on computationally intensive FEA. ​
              </p>
            </div>
          </div>
        </div>

        {/* Objectives Card */}
        <div className="relative w-1/2 flex justify-center">
          <img
            src="/blob2.svg"
            alt="Objectives"
            className="w-10/12 h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
            <div className="max-w-xs">
              <motion.h2
                className="text-4xl font-bold mb-4 text-gray-800 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Objectives
              </motion.h2>
              <ul className="text-lg text-gray-700 list-disc list-inside text-left">
              <li>Develop an ML-based model to enhance FEA's predictive accuracy for mechanical systems.</li>
<li>Reduce computational cost and time compared to traditional FEA.</li>
<li>Address underfitting and overfitting by optimizing hyperparameters and using robust validation.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
