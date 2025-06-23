import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import BlurCircle from './BlurCircle';

const Footer = ({ 
  companyInfo = {
    name: "Kasi-nikor",
    description: "bringing movies and entertainment to your neighborhood",
    logo: null, // or provide a logo component
    year: new Date().getFullYear()
  },
  links = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Services", url: "/services" },
        { name: "Contact", url: "/contact" }
      ]
    },
    {
      title: "Legal",
      items: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" }
      ]
    }
  ],
  contactInfo = {
    email: "info@yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94000"
  },
  socialMedia = [
    { icon: <FaFacebook />, url: "https://facebook.com/yourcompany" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourcompany" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourcompany" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/company/yourcompany" },
    { icon: <FaYoutube />, url: "https://youtube.com/yourcompany" }
  ],
  showNewsletter = true,
  customElements = null
}) => {
  return (
    <footer className=" text-white pt-12 p-30 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 lg:px-8">
      <BlurCircle top='-10%' right='10%' size="lg" opacity="30" />
      <BlurCircle bottom='-60%' left='-12%' size="xl" opacity="20" />
           {/* Newsletter */}
        {showNewsletter && (
          <div className="mb-8 w-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded  text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              {companyInfo.logo && (
                <div className="mr-4">
                  {companyInfo.logo}
                </div>
              )}
              <h3 className="text-2xl font-bold">{companyInfo.name}</h3>
            </div>
            <p className="text-gray-400 mb-4">{companyInfo.description}</p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-xl transition-colors"
                  aria-label={`${companyInfo.name} on ${social.icon.type.displayName}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

       

        {/* Custom Elements */}
        {customElements && (
          <div className="mb-8">
            {customElements}
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {companyInfo.year} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;