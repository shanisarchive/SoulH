import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="text-white/60 text-sm">
            Powered by WHO API for trusted global health insights
          </div>
          
          <div className="text-white/60 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} Soul Health. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
