import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import JobCard from '../components/jobs/JobCard'; 
import { motion } from 'framer-motion';
import { FaSort } from 'react-icons/fa';

const AllJobs = () => {
    const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
    const [page, setPage] = useState(1);

    // Fetch all jobs using TanStack Query
    // The query key changes when sortOrder changes, triggering a re-fetch
    const { data: jobs = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['allJobs', sortOrder], 
        queryFn: async () => {
            // Add sorting parameter to the API request
            const res = await axiosSecure.get(`/jobs?sort=${sortOrder}`);
            return res.data;
        }
    });

    const handleSort = () => {
        
        setSortOrder(prev => {
            if (prev === null) return 'asc';
            if (prev === 'asc') return 'desc';
            return null;
        });
    };
    
    // UI elements for loading and error
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-20">Failed to load jobs.</div>;
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
                All Available Jobs
            </h2>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                Explore thousands of tasks posted by verified employers across all categories.
            </p>

            {/* Sorting Control */}
            <div className="flex justify-end mb-6 max-w-7xl mx-auto">
                <button 
                    onClick={handleSort}
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                    <FaSort />
                    <span>Sort by Posting Date: 
                        {sortOrder === 'asc' ? ' Oldest First' : 
                         sortOrder === 'desc' ? ' Newest First' : ' Default'}
                    </span>
                </button>
            </div>

            {/* Jobs Grid */}
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {jobs.map(job => (
                        // We use the JobCard component created for the Home Page
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 dark:text-gray-400">No jobs found.</p>
                </div>
            )}

            {/* Pagination Placeholder */}
            {/* <div className="mt-10 flex justify-center">... Pagination here ...</div> */}
        </motion.div>
    );
};

export default AllJobs;