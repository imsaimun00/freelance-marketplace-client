import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import axiosSecure from '../api/axiosSecure';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyAcceptedTasks = () => {
    const { user } = useAuth();

    const { data: tasks = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['myAcceptedTasks', user?.email], 
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/accepted-tasks/taker/${user?.email}`);
            return res.data;
        }
    });

    const handleTaskAction = (id, action, title) => {
        const actionText = action === 'DONE' ? 'mark as DONE' : 'CANCEL';
        if (!window.confirm(`Are you sure you want to ${actionText} the task: "${title}"?`)) {
            return;
        }

        // Send delete request to the server
        axiosSecure.delete(`/accepted-tasks/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success(`Task "${title}" ${action === 'DONE' ? 'completed' : 'cancelled'} successfully!`);
                    refetch();
                } else {
                    toast.error(`Failed to ${actionText} the task.`);
                }
            })
            .catch(error => {
                console.error("Task Action Error:", error);
                toast.error('An error occurred during task action.');
            });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-20">Failed to load your accepted tasks.</div>;
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
                My Accepted Tasks ({tasks.length})
            </h2>

            {tasks.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">You have not accepted any tasks yet.</p>
                    <Link to="/allJobs">
                        <button className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Explore Jobs to Accept
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {tasks.map((task) => (
                        <motion.div 
                            key={task._id} 
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-600 dark:border-blue-400 flex flex-col justify-between"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">{task.jobTitle}</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">{task.jobCategory}</p>
                                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    <p>Employer: <span className="font-semibold">{task.employerEmail}</span></p>
                                    <p className="flex items-center">
                                        <FaCalendarCheck className="mr-2 text-md text-green-500"/> Accepted On: {new Date(task.acceptanceDate).toLocaleDateString()}
                                    </p>
                                    <p className="font-bold uppercase text-red-500 dark:text-red-400">Status: {task.status}</p>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-4 mt-6">
                                <button 
                                    onClick={() => handleTaskAction(task._id, 'DONE', task.jobTitle)}
                                    className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2"
                                >
                                    <FaCheckCircle /> <span>DONE</span>
                                </button>
                                <button 
                                    onClick={() => handleTaskAction(task._id, 'CANCEL', task.jobTitle)}
                                    className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-2"
                                >
                                    <FaTimesCircle /> <span>CANCEL</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default MyAcceptedTasks;