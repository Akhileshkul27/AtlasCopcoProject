import React from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: "Info",
      items: ["Formats", "Compression", "Pricing", "FAQ", "Status", "Policy"],
    },
    {
      title: "Getting Started",
      items: ["Introduction", "Themes", "Documentation", "Usages", "Elements", "Global"],
    },
    {
      title: "Resources",
      items: ["API", "Form Validation", "Accessibility", "Marketplace", "Visibility", "Community"],
    },
  ];

  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <Typography variant="h6" color="white" className="mb-4 font-semibold text-lg">
                {section.title}
              </Typography>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-2">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <Typography variant="h6" color="white" className="mb-4 font-semibold text-lg">
              Newsletter
            </Typography>
            <Typography color="gray" className="mb-4 text-white text-lg">
              Subscribe to our newsletter for a weekly dose of news, updates, helpful tips, and exclusive offers.
            </Typography>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="!border-white focus:!border-white"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <Button color="white" size="sm" className="ml-2 text-gray-700">
                SUBSCRIBE
              </Button>
            </div>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;