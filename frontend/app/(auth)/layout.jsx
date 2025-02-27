'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }) {
    const [stars, setStars] = useState([])

    useEffect(() => {
        const generateStars = () => {
            const newStars = []
            const starCount = 50 // Number of stars to generate

            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    id: i,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    size: `${Math.random() * 2 + 1}px`,
                    opacity: Math.random() * 0.7 + 0.3,
                    animationDuration: `${Math.random() * 8 + 12}s`
                })
            }
            setStars(newStars)
        }

        generateStars()
    }, [])

    return (
        <div className={inter.className}>
            {/* Stars background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                            animationDuration: star.animationDuration
                        }}
                    />
                ))}
            </div>

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
                </div>
            </div>
        </div>
    )
}
