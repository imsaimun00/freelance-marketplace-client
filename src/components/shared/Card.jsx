// src/components/shared/Card.jsx

import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            {children}
        </div>
    );
};

export default Card;