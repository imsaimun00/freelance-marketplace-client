import React from 'react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosSecure from '../api/axiosSecure'; // Use secure instance

const jobCategories = ["Web Development", "Digital Marketing", "Graphics Design", "Content Writing", "Virtual Assistant"];

const AddJob = () => {
    const { user } = useAuth();

    const handleAddJob = (e) => {
        e.preventDefault();
        const form = e.target;
        const jobTitle = form.jobTitle.value;
        const postedBy = user?.displayName || 'Unknown';
        const jobCategory = form.jobCategory.value;
        const description = form.description.value;
        const coverImage = form.coverImage.value;
        const employerEmail = user?.email;
        const minPrice = parseFloat(form.minPrice.value);
        const maxPrice = parseFloat(form.maxPrice.value);
        const deadline = form.deadline.value;

        
        if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0) {
            toast.error("Please enter valid positive numbers for price range.");
            return;
        }

        
        if (minPrice >= maxPrice) {
            toast.error("Minimum price must be less than maximum price.");
            return;
        }
        
        // Data Structure
        const newJob = {
            jobTitle,
            postedBy,
            jobCategory,
            description,
            coverImage,
            employerEmail, // Renamed from 'userEmail' to 'employerEmail' for clarity (as per the CRUD section)
            minPrice,
            maxPrice,
            deadline,
            postingDate: new Date().toISOString(), // Server will also handle this, but sending it from client is fine.
        };

        // Post data to the server using axiosSecure
        axiosSecure.post('/jobs', newJob)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Job added successfully!');
                    form.reset();
                } else {
                    toast.error('Failed to add job. Please try again.');
                }
            })
            .catch(error => {
                console.error("Error posting job:", error);
                toast.error('An error occurred. Check console for details.');
            });
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
                    Post a New Job
                </h2>
                
                <form onSubmit={handleAddJob} className="space-y-6">
                    {/* Job Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Job Title</label>
                            <input type="text" name="jobTitle" placeholder="e.g., Senior React Developer" required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Category</label>
                            <select name="jobCategory" required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                {jobCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Posted By & Employer Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Posted By (Your Name)</label>
                            <input type="text" name="postedBy" defaultValue={user?.displayName || ''} readOnly 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">User Email (Your Email)</label>
                            <input type="email" name="employerEmail" defaultValue={user?.email || ''} readOnly 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Min Price, Max Price, Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Min Price ($)</label>
                            <input type="number" name="minPrice" placeholder="500" required min="0" 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Max Price ($)</label>
                            <input type="number" name="maxPrice" placeholder="1500" required min="0" 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Application Deadline</label>
                            <input type="date" name="deadline" required 
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Cover Image URL (imgbb or similar)</label>
                        <input type="url" name="coverImage" placeholder="https://image-url.com/cover.jpg" required 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    
                    {/* Summary/Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Job Summary / Description</label>
                        <textarea name="description" placeholder="Provide a detailed description of the job and requirements..." rows="5" required 
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                        type="submit" 
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        Post This Job
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddJob;