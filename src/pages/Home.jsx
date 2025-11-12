import React from 'react';
import Banner from '../components/home/Banner';
import JobCategoryTabs from '../components/home/JobCategoryTabs';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            {/* SEO Optimization */}
            <Helmet>
                <title>Freelance Hub | Home - Find Your Next Task</title>
            </Helmet>
            
            {/* 1. Hero/Banner Section */}
            <Banner />
            
            {/* 2. Dynamic Job Categories Section */}
            <JobCategoryTabs />
            
            {/* 3. Static Section: Why Choose Us */}
            <WhyChooseUs />
            
            {/* 4. Static Section: Testimonials */}
            <Testimonials />

            {/* Note: Other sections like Blog/CTA can be added here later */}
        </div>
    );
};

export default Home;