import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const jobCategories = ["Web Development", "Digital Marketing", "Graphics Design", "Content Writing", "Virtual Assistant"];

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: job = {}, isLoading, isError } = useQuery({
        queryKey: ['jobToUpdate', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/job/${id}`);

            if (res.data.employerEmail !== user?.email) {
                toast.error("You are not authorized to update this job.");
                navigate('/myAddedJobs');
                return {};
            }
            return res.data;
        }
    });

    const handleUpdateJob = (e) => {
        e.preventDefault();
        const form = e.target;
        const jobTitle = form.jobTitle.value;
        const jobCategory = form.jobCategory.value;
        const description = form.description.value;
        const coverImage = form.coverImage.value;
        const minPrice = parseFloat(form.minPrice.value);
        const maxPrice = parseFloat(form.maxPrice.value);
        const deadline = form.deadline.value;

        // Validation
        if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0) {
            toast.error("Please enter valid positive numbers for price range.");
            return;
        }
        if (minPrice >= maxPrice) {
            toast.error("Minimum price must be less than maximum price.");
            return;
        }
        
        // Updatable fields
        const updatedJob = {
            jobTitle,
            jobCategory,
            description,
            coverImage,
            minPrice,
            maxPrice,
            deadline,
        };

        // Send request to the server
        axiosSecure.put(`/job/${id}`, updatedJob)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Job updated successfully!');
                    navigate('/myAddedJobs');
                } else if (res.data.modifiedCount === 0) {
                    toast('No changes detected or update failed.', { icon: 'ℹ️' });
                } else {
                    toast.error('Failed to update job. Try again.');
                }
            })
            .catch(error => {
                console.error("Update Error:", error);
                toast.error('An error occurred during update.');
            });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || !job?.jobTitle) {
        return <div className="text-center text-red-500 py-20">Job data could not be loaded or you are unauthorized.</div>;
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
                    Update Job: {job.jobTitle}
                </h2>
                
                <form onSubmit={handleUpdateJob} className="space-y-6">
                    {/* Job Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Job Title</label>
                            <input type="text" name="jobTitle" defaultValue={job.jobTitle} required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Category</label>
                            <select name="jobCategory" defaultValue={job.jobCategory} required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                {jobCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Non-editable fields (readOnly) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Posted By (Non-editable)</label>
                            <input type="text" defaultValue={job.postedBy} readOnly 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Employer Email (Non-editable)</label>
                            <input type="email" defaultValue={job.employerEmail} readOnly 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Min Price, Max Price, Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Min Price ($)</label>
                            <input type="number" name="minPrice" defaultValue={job.minPrice} required min="0" 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Max Price ($)</label>
                            <input type="number" name="maxPrice" defaultValue={job.maxPrice} required min="0" 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Application Deadline</label>
                            {/* Convert ISO date string to YYYY-MM-DD format for input type="date" */}
                            <input type="date" name="deadline" 
                                defaultValue={new Date(job.deadline).toISOString().split('T')[0]} 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Cover Image URL</label>
                        <input type="url" name="coverImage" defaultValue={job.coverImage} placeholder="https://image-url.com/cover.jpg" required 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    
                    {/* Summary/Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Job Summary / Description</label>
                        <textarea name="description" defaultValue={job.description} rows="5" required 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                        type="submit" 
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        Save Changes
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateJob;