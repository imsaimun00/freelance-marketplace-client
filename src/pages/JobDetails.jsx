import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaDollarSign, FaCalendarAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    
    const { data: job = {}, isLoading, isError } = useQuery({
        queryKey: ['jobDetail', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/job/${id}`);
            return res.data;
        }
    });

    const {
        jobTitle,
        postedBy,
        jobCategory,
        description,
        coverImage,
        employerEmail,
        minPrice,
        maxPrice,
        deadline,
        postingDate,
    } = job;

    // Check if the current user is the employer
    const isEmployer = user?.email === employerEmail;

    const handleAcceptJob = () => {
        
        if (isEmployer) {
            toast.error("You cannot accept your own posted job.");
            return;
        }

        // Job Taker details
        const acceptedTask = {
            jobId: id,
            jobTitle,
            jobCategory,
            employerEmail,
            jobTakerEmail: user?.email,
            jobTakerName: user?.displayName,
            status: 'pending', // Initial status
            acceptanceDate: new Date().toISOString(),
        };

        
        axiosSecure.post('/accepted-tasks', acceptedTask)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Task accepted successfully! Check "My Accepted Tasks" page.');
                    navigate('/my-accepted-tasks'); 
                } else if (res.data.message === 'Already accepted') {
                    toast.error('You have already accepted this task.');
                } else {
                    toast.error('Failed to accept the task. Please try again.');
                }
            })
            .catch(error => {
                console.error("Error accepting job:", error);
                toast.error('Failed to accept task. Ensure you are logged in.');
            });
    };
    
    // Format date utility
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || !jobTitle) {
        return <div className="text-center text-red-500 py-20">Job details not found.</div>;
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                {/* Job Cover Image */}
                <div className="relative h-64 md:h-96 w-full">
                    <img 
                        src={coverImage || 'https://via.placeholder.com/1200x500?text=Job+Cover'} 
                        alt={jobTitle} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            {jobTitle}
                        </h1>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    {/* Job Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b pb-6 border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-blue-600 dark:text-blue-400 text-2xl" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posted By</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{postedBy}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaDollarSign className="text-green-600 dark:text-green-400 text-2xl" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Salary Range</p>
                                <p className="font-semibold text-gray-900 dark:text-white">${minPrice} - ${maxPrice}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="text-red-600 dark:text-red-400 text-2xl" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{formatDate(deadline)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </div>

                    {/* Employer Info */}
                    <div className="mb-10 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Employer Contact</h3>
                        <div className="flex items-center space-x-3">
                             <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                            <p className="text-gray-700 dark:text-gray-300">Email: <span className="font-medium">{employerEmail}</span></p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Posted on: {formatDate(postingDate)}</p>
                    </div>

                    {/* Accept Job */}
                    <motion.button
                        onClick={handleAcceptJob}
                        className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 shadow-md ${isEmployer ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={isEmployer}
                        whileHover={isEmployer ? {} : { scale: 1.01 }}
                        whileTap={isEmployer ? {} : { scale: 0.99 }}
                    >
                        {isEmployer ? 'Cannot Accept Your Own Job' : 'Accept This Task'}
                    </motion.button>
                    {isEmployer && <p className="text-sm text-center text-red-500 mt-2">You posted this job, so you cannot accept it.</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default JobDetails;