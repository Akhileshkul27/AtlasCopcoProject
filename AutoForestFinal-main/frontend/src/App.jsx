import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import Router components
import './App.css';
import About from './Components/About/About';
import NavbarWithSolidBackground from './Components/Header/Header.jsx';
import Home from './Components/Home/Home'; // Import other components as needed
import TreeCrown from './Components/TreeCount/TreeCrown.jsx';
import Path from './Components/Path/Path.jsx';

// import Location from './Components/Location/Location.jsx';
import MapPage from './Components/MapComponent.jsx';  
import Location from './Components/Location/Location.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PredictDeformation from './Components/Path/Path.jsx';
import RandomForest from './Components/RoverData.jsx';


const App = () => {
  const location = useLocation(); 


  const showNavbar = location.pathname !== '/mappage';
  


  return (
    <div>

      {showNavbar && <NavbarWithSolidBackground />}
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Route */}
        <Route path="/home" element={<Home />} />
        <Route path="/LSTM" element={<TreeCrown />} />
        <Route path="/Xgboost" element={<PredictDeformation />} />
        <Route path="/CNN" element={<About />} />  {/* About Route */}
        <Route path="/Random Forest" element={<RandomForest />} />  {/* About Route */}
        <Route path="/mappage" element={<MapPage />} />  {/* New Route for MapPage */}
      </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
