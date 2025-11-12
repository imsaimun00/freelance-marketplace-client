import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    {
        quote: "Finding quality developers used to be a pain. Freelance Hub made it seamless. The escrow system gives me complete peace of mind.",
        name: "Jasmine Khan",
        title: "Startup CEO",
        avatar: "https://i.ibb.co/L8mYgX9/client1.jpg",
    },
    {
        quote: "I landed my dream job within a week! The platform is intuitive, and the job diversity is exactly what a modern freelancer needs.",
        name: "David Lee",
        title: "Senior Web Developer",
        avatar: "https://i.ibb.co/3sS7L7W/client2.jpg",
    },
];

const Testimonials = () => {
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
                    What Our Users Say
                </motion.h2>
                <motion.p 
                    className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Hear from the employers and freelancers who trust our platform daily.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border-l-4 border-blue-600 dark:border-blue-400"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <FaQuoteLeft className="text-4xl text-blue-300 dark:text-blue-500 mb-4" />
                            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">
                                "{testimonial.quote}"
                            </p>
                            <div className="flex items-center">
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name} 
                                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-600 dark:border-blue-400"
                                    // Fallback if image fails
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} 
                                />
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;