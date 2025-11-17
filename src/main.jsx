import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthProvider.jsx';
import router from './routes/Routes.jsx';
import {
     QueryClient,
     QueryClientProvider,
} from '@tanstack/react-query'

import { HelmetProvider } from 'react-helmet-async'; 

// Create a client for TanStack Query
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> {/* HelmetProvider for managing document head */}
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                 background: '#333',
                  color: '#fff',
                },
              }}
            />
          </QueryClientProvider>
        </AuthProvider>
    </HelmetProvider>
    </React.StrictMode>,
);