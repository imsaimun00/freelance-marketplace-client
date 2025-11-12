import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        if (localTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="flex items-center space-x-2">
            <FaSun className={`text-xl ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
            
            <label className="swap swap-rotate">
                <input 
                    type="checkbox" 
                    onChange={handleToggle} 
                    checked={theme === 'dark'}
                    className="toggle toggle-sm bg-gray-300 checked:bg-gray-600 border-none" 
                    // এখানে তুই নিজের মতো বাটন স্টাইল করতে পারিস
                />
            </label>
            
            <FaMoon className={`text-xl ${theme === 'dark' ? 'text-indigo-400' : 'text-gray-400'}`} />
        </div>
    );
};

export default ThemeToggle;