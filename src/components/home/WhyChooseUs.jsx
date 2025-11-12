import React from 'react';
import { FaShieldAlt, FaHandshake, FaTachometerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: FaShieldAlt,
        title: "Secure Payments",
        description: "Your transactions are always safe. We use escrow to protect both freelancers and employers.",
    },
    {
        icon: FaHandshake,
        title: "Verified Community",
        description: "We verify every employer and freelancer to ensure quality, trust, and professionalism.",
    },
    {
        icon: FaTachometerAlt,
        title: "Fast & Efficient",
        description: "Our platform is optimized for quick job posting and finding talent in record time.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Why Freelance Hub?
                </motion.h2>
                <motion.p 
                    className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    We provide the best tools and environment for both employers and freelancers to succeed.
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            className="flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <feature.icon className="text-5xl text-blue-600 dark:text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;