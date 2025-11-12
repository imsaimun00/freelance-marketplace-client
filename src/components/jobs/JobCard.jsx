import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
    // Destructure job properties
    const { 
        _id, 
        employerEmail, 
        jobTitle, 
        jobCategory, 
        minPrice, 
        maxPrice, 
        postingDate, 
        deadline, 
        description 
    } = job;

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between"
            whileHover={{ y: -5 }}
        >
            <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-3">
                    {jobCategory}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={jobTitle}>
                    {jobTitle}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {description}
                </p>
                
                <div className="space-y-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Salary Range: <span className="text-green-600 dark:text-green-400 font-bold">${minPrice} - ${maxPrice}</span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Deadline: <span className="font-semibold text-red-500 dark:text-red-400">{formatDate(deadline)}</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        Posted On: {formatDate(postingDate)}
                    </p>
                </div>
            </div>

            {/* View Details Button */}
            <Link to={`/jobDetails/${_id}`} className="mt-6">
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                    View Details
                </button>
            </Link>
        </motion.div>
    );
};

export default JobCard;