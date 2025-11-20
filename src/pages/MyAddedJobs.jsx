import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import axiosSecure from '../api/axiosSecure';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyAddedJobs = () => {
    const { user } = useAuth();

    
    const { data: jobs = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['myAddedJobs', user?.email], 
        enabled: !!user?.email,
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/jobs/employer/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id, title) => {
        // Confirmation dialog
        if (window.confirm(`Are you sure you want to delete the job: "${title}"?`)) {
            axiosSecure.delete(`/job/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        toast.success(`Job "${title}" deleted successfully!`);
                        refetch(); 
                    } else {
                        toast.error('Failed to delete job.');
                    }
                })
                .catch(error => {
                    console.error("Delete Error:", error);
                    toast.error('An error occurred during deletion.');
                });
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-20">Failed to load your added jobs.</div>;
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
                My Posted Jobs ({jobs.length})
            </h2>

            {jobs.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">You have not posted any jobs yet.</p>
                    <Link to="/addJob">
                        <button className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Post Your First Job
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto max-w-7xl mx-auto">
                    <table className="table w-full shadow-xl rounded-xl bg-white dark:bg-gray-800 transition-colors duration-300">
                        <thead>
                            <tr className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-600 dark:border-blue-400">
                                <th className="p-4 text-left">Title & Category</th>
                                <th className="p-4 text-left hidden md:table-cell">Salary Range</th>
                                <th className="p-4 text-left hidden lg:table-cell">Deadline</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <motion.div 
                                    key={job._id} 
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900 dark:text-white">{job.jobTitle}</div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{job.jobCategory}</div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                                            <FaDollarSign className="mr-1 text-sm"/> ${job.minPrice} - ${job.maxPrice}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        <span className="flex items-center text-red-500 dark:text-red-400">
                                            <FaCalendarAlt className="mr-1 text-sm"/> {new Date(job.deadline).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center space-x-3">
                                        {/* Update Button */}
                                        <Link to={`/updateJob/${job._id}`}>
                                            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white border-none tooltip" data-tip="Update">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => handleDelete(job._id, job.jobTitle)}
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none tooltip" data-tip="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </motion.div>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default MyAddedJobs;