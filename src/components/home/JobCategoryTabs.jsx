import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import JobCard from '../jobs/JobCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import { motion } from 'framer-motion';

// Placeholder data
const PLACEHOLDER_JOBS = {
    'Web Development': [
        { _id: '1', jobTitle: 'Full Stack Developer', jobCategory: 'Web Development', minPrice: 800, maxPrice: 1500, postingDate: '2025-11-01', deadline: '2025-11-20', description: 'Build and maintain web applications using MERN stack. Strong proficiency in React is required.' },
        { _id: '2', jobTitle: 'Frontend React Specialist', jobCategory: 'Web Development', minPrice: 500, maxPrice: 1000, postingDate: '2025-11-05', deadline: '2025-11-25', description: 'Develop user-facing features using React.js and modern frontend tools like Tailwind CSS.' },
    ],
    'Digital Marketing': [
        { _id: '3', jobTitle: 'SEO & Content Strategist', jobCategory: 'Digital Marketing', minPrice: 400, maxPrice: 900, postingDate: '2025-11-02', deadline: '2025-11-21', description: 'Plan and execute all digital marketing, including SEO/SEM, marketing database, email, and social media.' },
        { _id: '4', jobTitle: 'Social Media Manager', jobCategory: 'Digital Marketing', minPrice: 300, maxPrice: 700, postingDate: '2025-11-07', deadline: '2025-11-27', description: 'Manage and oversee social media content across platforms like Facebook, Instagram, and X.' },
    ],
    'Graphics Design': [
        { _id: '5', jobTitle: 'UI/UX Designer', jobCategory: 'Graphics Design', minPrice: 600, maxPrice: 1200, postingDate: '2025-11-03', deadline: '2025-11-23', description: 'Design user interfaces and experiences for mobile and web applications, focusing on usability.' },
        { _id: '6', jobTitle: 'Branding & Logo Designer', jobCategory: 'Graphics Design', minPrice: 350, maxPrice: 800, postingDate: '2025-11-09', deadline: '2025-11-29', description: 'Create stunning and memorable logos and brand identity packages for new businesses.' },
    ],
};

const JobCategoryTabs = () => {
    const [jobs, setJobs] = useState({});
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);

    const categories = ['Web Development', 'Digital Marketing', 'Graphics Design'];
    const activeCategory = categories[tabIndex];

    useEffect(() => {
        // --- Placeholder for fetching jobs from the API ---
        // In a real application, you would fetch data here based on `activeCategory`
        
        // Simulating API call delay
        setLoading(true);
        setTimeout(() => {
            // For now, setting placeholder data
            setJobs(PLACEHOLDER_JOBS);
            setLoading(false);
        }, 1000);

    }, [activeCategory]);

    return (
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Browse Jobs by Category
                </motion.h2>
                <motion.p 
                    className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Find the perfect freelance opportunity from our most popular categories. New tasks are added daily.
                </motion.p>

                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="transition-all duration-300">
                    <TabList className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
                        {categories.map((category) => (
                            <Tab 
                                key={category} 
                                className={`px-6 py-3 text-lg font-semibold cursor-pointer border-b-2 transition-colors duration-300 ${activeCategory === category ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
                            >
                                {category}
                            </Tab>
                        ))}
                    </TabList>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        categories.map((category) => (
                            <TabPanel key={category}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {jobs[category] && jobs[category].length > 0 ? (
                                        jobs[category].map(job => (
                                            <JobCard key={job._id} job={job} />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-10">
                                            <p className="text-xl text-gray-500 dark:text-gray-400">No jobs found in this category yet.</p>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>
                        ))
                    )}
                </Tabs>
            </div>
        </section>
    );
};

export default JobCategoryTabs;