import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photo.value;
        const password = form.password.value;

        // Basic Validation
        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters long.');
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must include at least one uppercase letter.');
            toast.error('Password must include at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setRegisterError('Password must include at least one lowercase letter.');
            toast.error('Password must include at least one lowercase letter.');
            return;
        }

        try {
            await createUser(email, password);

            await updateUserProfile(name, photoURL);
            
            toast.success('Registration successful! Welcome to the Hub.');
            navigate('/');
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
            toast.error(error.message);
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Google sign-in successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <motion.div 
            className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-colors duration-300">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Create Your Account
                </h2>
                
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input type="text" name="name" placeholder="Your Full Name" required 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" name="email" placeholder="you@example.com" required 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                        <input type="text" name="photo" placeholder="https://your-photo.com" 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input type="password" name="password" placeholder="Min 6 chars, A-Z, a-z" required 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                        
                        {/* Display error message */}
                        {registerError && (
                            <p className="text-red-500 text-xs mt-2">{registerError}</p>
                        )}
                    </div>

                    <motion.button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Register
                    </motion.button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            OR
                        </span>
                    </div>
                </div>

                {/* Google Login Button */}
                <motion.button 
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaGoogle className="mr-3" />
                    Sign in with Google
                </motion.button>
                
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Already have an account? 
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;