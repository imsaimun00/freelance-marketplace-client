import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut, loading } = useAuth();

    // LogOut function
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logged out successfully!');
            })
            .catch(error => {
                toast.error('Looged out failed. Please try again.');
                console.error("Logout Error:", error);
            });
    };
    
    // Navigation Links
    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"}>Home</NavLink></li>
            <li><NavLink to="/allJobs" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"}>All Jobs</NavLink></li>
            {/* Logged-in specific links */}
            {user && (
                <>
                    <li><NavLink to="/addJob" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"}>Add Job</NavLink></li>
                    <li><NavLink to="/myAddedJobs" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"}>My added Jobs</NavLink></li>
                    <li><NavLink to="/my-accepted-tasks" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"}>My accepted task</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/*Logo/Heading */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-gray-700 rounded-box w-52 space-y-2">
                            {navLinks}
                        </ul>
                    </div>
                    {/* Consistent Heading Style */}
                    <Link to="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 transition duration-300">
                        Freelance <span className="text-gray-800 dark:text-white">Hub</span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4">
                        {navLinks}
                    </ul>
                </div>

                {/* User & Actions */}
                <div className="navbar-end space-x-4">
                    
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* User vs Login/Register */}
                    {loading ? (
                        <span className="loading loading-spinner loading-md text-blue-600"></span>
                    ) : user ? (
                        // Logged-in user view
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                                <div className="w-10 rounded-full border-2 border-blue-600 dark:border-blue-400">
                                    {user.photoURL ? (
                                        <img 
                                            alt={user.displayName || 'User'} 
                                            src={user.photoURL} 
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-full h-full text-gray-500 dark:text-gray-300" />
                                    )}
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-700 rounded-box w-52">
                                <li><p className="text-sm font-semibold text-gray-800 dark:text-white truncate py-2 px-4">{user.displayName || 'User'}</p></li>
                                <li><p className="text-xs text-gray-500 dark:text-gray-400 truncate py-0 px-4 mb-2">{user.email}</p></li>
                                <li className="border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        // Not logged-in view
                        <div className="flex space-x-2">
                            <Link to="/login">
                                <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 border-none transition duration-300 px-4">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register" className="hidden sm:inline-block">
                                <button className="btn btn-sm btn-outline text-blue-600 dark:text-blue-400 border-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition duration-300 px-4">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;