'use client'

import './globals.css';
import React from 'react';
import { ReduxProvider } from './Provider';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col text-white relative">
          <main className="flex-grow relative z-10">
            <Toaster position="top-right" reverseOrder={false} />
            <ReduxProvider>
              {children}
            </ReduxProvider>
            <Script src="https://accounts.google.com/gpt/client" strategy="lazyOnload" />
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;