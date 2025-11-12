import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loginError, setLoginError] = useState('');

    // Determine where to redirect after successful login
    const from = location.state || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password);
            toast.success('Login successful! Redirecting...');
            
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            setLoginError('Login failed. Please check your email and password.');
            toast.error('Login failed. Check credentials.');
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('Google sign-in successful! Redirecting...');
                navigate(from, { replace: true });
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
                    Sign In to Freelance Hub
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" name="email" placeholder="you@example.com" required 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" required 
                               className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"/>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <Link to="/forget-password" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                            Forget Password?
                        </Link>
                    </div>
                    
                    {loginError && (
                        <p className="text-red-500 text-sm">{loginError}</p>
                    )}

                    <motion.button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Login
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
                    Don't have an account? 
                    <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;