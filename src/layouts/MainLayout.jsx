// src/layouts/MainLayout.jsx (FINAL DIAGNOSIS FIX)

import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
    return (
        // Added a distinct background color just for a visibility test
        <div className="flex flex-col min-h-screen bg-pink-100 dark:bg-gray-900 transition-colors duration-300"> 
            
            {/* 1. Navbar check: It contains complex components like ThemeToggle (which uses useAuth and useState) */}
            {/* 2. Footer check: It contains FaXTwitter icon */}

            <Navbar /> 

            {/* Main Content Area - Renders Home.jsx */}
            <main className="flex-grow">
                <Outlet /> 
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;