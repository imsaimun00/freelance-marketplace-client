import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900 p-4">
            <motion.h1 
                className="text-9xl font-extrabold text-red-600 dark:text-red-500 mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>
            <motion.h2 
                className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Page Not Found
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                Sorry! The page you are looking for may have been deleted or its address has changed.
            </p>
            <Link to="/">
                <motion.button 
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Homepage
                </motion.button>
            </Link>
        </div>
    );
};

export default ErrorPage;