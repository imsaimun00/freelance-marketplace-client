// src/api/axiosSecure.js (FIXED: NO useAuth HOOK CALL)

import axios from "axios";

// 1. We cannot import useAuth here, but we will rely on AuthProvider 
//    to pass the logout function later.

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// We will export a function that configures the interceptor
// and takes the logOut function as an argument.
export const configureInterceptors = (logOutFunction) => {
    
    // Check if interceptor is already set (to prevent duplication)
    axiosSecure.interceptors.response.eject(axiosSecure.interceptors.response.handlers[0]?.id);


    // 3. Add Response Interceptor
    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response ? error.response.status : null;
            
            // Handle 401 and 403 errors
            if (status === 401 || status === 403) {
                console.log('Unauthorized or Forbidden request detected. Logging out...');
                
                // Call the logOut function passed from AuthProvider
                if (logOutFunction) {
                    await logOutFunction(); 
                }
            }
            return Promise.reject(error);
        }
    );
};


export default axiosSecure;

// Remove the request interceptor as it was not using useAuth
axiosSecure.interceptors.request.eject(axiosSecure.interceptors.request.handlers[0]?.id); 

// The request interceptor remains outside the function and only config is returned
axiosSecure.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);