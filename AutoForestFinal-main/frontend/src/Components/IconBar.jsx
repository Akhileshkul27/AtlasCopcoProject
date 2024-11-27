import React, { useState } from "react";
import { FaFileAlt, FaGlobe, FaCog, FaWrench, FaDesktop, FaChevronDown } from "react-icons/fa";
import BatteryGauge from 'react-battery-gauge';

const RippleButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`transition-transform transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <span className="flex flex-col items-center text-center">{children}</span>
    </button>
  );
};

function IconBar({ onViewWavepoints, onViewFlightData }) {
  const batteryLevel = 75;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const startButtonClass = "bg-green-500 text-white p-2 rounded hover:bg-green-400 transition-colors";
  const stopButtonClass = "bg-red-500 text-white p-2 rounded hover:bg-red-400 transition-colors";

  return (
    <div className="bg-black p-2 flex justify-between items-center">
      <div className="flex items-center text-white mr-4">
        <BatteryGauge 
          value={batteryLevel} 
          size={100}
          animated={true}
          charging={false}
        />
        <span className="ml-2 text-sm">{batteryLevel}%</span>
      </div>

      <div className="flex justify-around items-center space-x-4 flex-grow">
        <RippleButton className="flex flex-col items-center text-white focus:outline-none" onClick={onViewFlightData}>
          <FaFileAlt className="h-8 w-8 text-green-400" />
          <span>Flight Data</span>
        </RippleButton>

        <RippleButton className="flex flex-col items-center text-white focus:outline-none" onClick={onViewWavepoints}>
          <FaGlobe className="h-8 w-8 text-green-400" />
          <span>View Wavepoints</span>
        </RippleButton>

        <div className="relative">
          <RippleButton className="flex flex-col items-center text-white focus:outline-none" onClick={toggleDropdown}>
            <FaCog className="h-8 w-8 text-green-400" />
            <span>Initial Setup</span>
            <FaChevronDown className="h-4 w-4 text-green-400" />
          </RippleButton>
          {dropdownOpen && (
            <div className="absolute flex flex-col space-y-1 left-0 mt-1 w-40 bg-gray-800 rounded shadow-lg z-50 p-1"> {/* Adjusted z-index */}
              <button className={startButtonClass}>Start</button>
              <button className={stopButtonClass}>Stop</button>
            </div>
          )}
        </div>

        <RippleButton className="flex flex-col items-center text-white focus:outline-none">
          <FaDesktop className="h-8 w-8 text-green-400" />
          <span>Simulation</span>
        </RippleButton>

        <RippleButton className="flex flex-col items-center text-white focus:outline-none">
          <FaWrench className="h-8 w-8 text-green-400" />
          <span>Connect</span>
        </RippleButton>
      </div>
    </div>
  );
}

export default IconBar;
