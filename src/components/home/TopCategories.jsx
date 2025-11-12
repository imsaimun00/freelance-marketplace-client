// src/components/home/TopCategories.jsx

import React from 'react';

const TopCategories = () => {
    return (
        <section className="py-10 md:py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Our Top Categories</h2>
                <div className="flex justify-center space-x-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md">Web Development</div>
                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-md">Digital Marketing</div>
                    <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg shadow-md">Graphics Design</div>
                </div>
            </div>
        </section>
    );
};

export default TopCategories;