'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <body className="bg-[#0D0F18] text-white">
                <div className="min-h-screen flex flex-col items-center justify-center">
                    {/* Back button */}
                    <div className="absolute top-8 left-8">
                        <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to KaziPro
                        </Link>
                    </div>

                    {/* Main content container */}
                    <div className="w-full max-w-md px-4">


                        {children}

                        {/* Footer */}
                        <div className="mt-8 text-center text-xs text-gray-500">
                            <p>
                                You acknowledge that you read, and agree to our{' '}
                                <Link href="/terms" className="text-gray-400 hover:text-white">
                                    Terms of Service
                                </Link>
                                {' '}and our{' '}
                                <Link href="/privacy" className="text-gray-400 hover:text-white">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}