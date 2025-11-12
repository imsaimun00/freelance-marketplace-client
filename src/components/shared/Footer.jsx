import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 transition-colors duration-300 border-t border-gray-200 dark:border-gray-700">
            <aside>
                {/* Logo/Heading */}
                <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 transition duration-300">
                    Freelance <span className="text-gray-800 dark:text-white">Hub</span>
                </h3>
                <p className="font-semibold text-sm mt-2">
                    A reliable online marketplace.
                </p>
                
                {/* Copyright Text */}
                <p className="text-xs mt-4">
                    Copyright © {new Date().getFullYear()} - All right reserved.
                </p>
            </aside> 
            <nav>
                <div className="grid grid-flow-col gap-4">
                    {/* Social Media Links */}
                    <a href="#" className="text-2xl hover:text-blue-600 transition-colors duration-300"><FaXTwitter /></a>
                    <a href="#" className="text-2xl hover:text-blue-600 transition-colors duration-300"><FaLinkedin /></a>
                    <a href="#" className="text-2xl hover:text-blue-600 transition-colors duration-300"><FaFacebook /></a>
                    <a href="#" className="text-2xl hover:text-blue-600 transition-colors duration-300"><FaInstagram /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;