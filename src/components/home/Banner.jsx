import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white py-20 md:py-32 transition-colors duration-300">
            <motion.div 
                className="container mx-auto px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="text-5xl md:text-7xl font-extrabold mb-4"
                    variants={itemVariants}
                >
                    Your Next <span className="text-yellow-300 dark:text-blue-400">Freelance</span> Job Awaits
                </motion.h1>
                <motion.p 
                    className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    Connect with top employers and skilled freelancers for Web Development, Digital Marketing, Graphics Design, and more.
                </motion.p>
                <motion.div 
                    className="flex justify-center space-x-4"
                    variants={itemVariants}
                >
                    <Link to="/allJobs">
                        <motion.button
                            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg text-lg shadow-xl hover:bg-gray-100 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Jobs
                        </motion.button>
                    </Link>
                    <Link to="/register">
                         <motion.button
                            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg text-lg shadow-xl hover:bg-white hover:text-blue-600 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Banner;