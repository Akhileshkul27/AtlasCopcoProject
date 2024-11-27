import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from "../logo.webp";

function NavbarWithSolidBackground() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    "Home",
    "LSTM",
    "Xgboost",
    "CNN",
    "Random Forest",
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      {navItems.map((item) => (
        <Typography
          key={item}
          as="li"
          variant="small"
          color="white"
          className="p-1 font-semibold text-lg"
        >
          <Link
            to={`/${item.toLowerCase()}`} // Use Link for internal routing
            className="flex items-center px-4 py-2 bg-transparent border border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white hover:text-[#205A28] hover:shadow-lg"
          >
            {item}
          </Link>
        </Typography>
      ))}
      {/* Button to open MapPage in a new tab */}
      {/* <Typography as="li" variant="small" color="white">
        <button
          onClick={() => window.open('/mappage', '_blank')} // Opens MapPage in a new tab
          className="flex items-center px-4 py-3 font-bold bg-transparent border border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white hover:text-[#205A28] hover:shadow-lg"
        >
          Open Map
        </button>
      </Typography> */}
    </ul>
  );

  return (
    <div className="relative overflow-hidden">
      <Navbar className="sticky top-0 z-10 h-max max-w-full bg-[#205A28] px-4 py-3 lg:px-8 lg:py-4 shadow-md transition-shadow duration-500">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Brand Logo"
              className="h-12 w-12 rounded-full mr-3 transform transition-transform hover:scale-105 duration-300"
            />
            <Typography
              as="span"
              variant="h5"
              color="white"
              className="font-extrabold tracking-wide"
            >
            FEA-AI
            </Typography>
          </Link>

          <div className="hidden lg:flex justify-center w-full">{navList}</div>

          <IconButton
            variant="text"
            className="lg:hidden text-white hover:bg-white hover:text-[#205A28] rounded-full transition-all duration-300"
            onClick={() => setOpenNav(!openNav)}
            aria-label="Toggle Navigation" // Add aria-label for accessibility
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <div className="flex flex-col items-center space-y-2 pb-4">
            {navList}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarWithSolidBackground;
