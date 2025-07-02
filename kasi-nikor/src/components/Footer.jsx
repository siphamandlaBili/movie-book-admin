import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import BlurCircle from './BlurCircle';

const Footer = ({ 
  companyInfo = {
    name: "Kasi-nikor",
    description: "Bringing movies and entertainment to your neighborhood",
    year: new Date().getFullYear()
  },
  links = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", url: "/" },
        { name: "Movies", url: "/movies" },
        { name: "Shows", url: "/shows" },
        { name: "About", url: "/about" }
      ]
    },
    {
      title: "Support",
      items: [
        { name: "Contact", url: "/contact" },
        { name: "FAQs", url: "/faqs" },
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" }
      ]
    }
  ],
  contactInfo = {
    email: "info@kasi-nikor.com",
    phone: "+27 123 456 7890",
    address: "123 Cinema Street, Johannesburg, SA 2000"
  },
  socialMedia = [
    { icon: <FaFacebook />, url: "#", name: "Facebook" },
    { icon: <FaTwitter />, url: "#", name: "Twitter" },
    { icon: <FaInstagram />, url: "#", name: "Instagram" },
    { icon: <FaLinkedin />, url: "#", name: "LinkedIn" },
    { icon: <FaYoutube />, url: "#", name: "YouTube" }
  ],
  showNewsletter = true
}) => {
  return (
    <footer className="relative overflow-hidden text-white pt-16 pb-8 bg-gradient-to-b from-gray-900 to-black">
      <BlurCircle top='-10%' right='10%' size="lg" opacity="30" />
      <BlurCircle bottom='-60%' left='-12%' size="xl" opacity="20" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="mb-16 text-center">
            <h3 className="text-xl font-bold mb-4">Stay Updated with New Releases</h3>
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary flex-grow"
              />
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{companyInfo.name}</h3>
            <p className="text-gray-400 mb-6">{companyInfo.description}</p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-xl transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{links[0].title}</h4>
            <ul className="space-y-3">
              {links[0].items.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.url} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{links[1].title}</h4>
            <ul className="space-y-3">
              {links[1].items.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.url} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdEmail className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <MdPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <MdLocationOn className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center mb-4 md:mb-0">
            &copy; {companyInfo.year} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {links[1].items.map((item, index) => (
              <a 
                key={index} 
                href={item.url} 
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;