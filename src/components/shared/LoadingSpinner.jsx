import React from 'react';
import { motion } from 'framer-motion'; 

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <motion.div
                className="w-16 h-16 border-4 border-dashed rounded-full border-blue-600 animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <p className="text-xl font-medium ml-4 text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;