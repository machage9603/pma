'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare } from 'lucide-react';

const FeatureCarousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const features = [
        {
            id: 'screenshots',
            title: 'Screenshots for errors',
            description: 'We record the API errors and take a screenshot of your app being down.',
            details: [
                'Visual evidence of errors',
                'Automatic capture on failures',
                'Easily shareable reports',
                'Historical error archive'
            ],
            image: '/screenshot-feature.png'
        },
        {
            id: 'traceroute',
            title: 'Traceroute & MTR for timeouts',
            description: 'Understand connection timeouts and request timeouts with edge-based traceroute and MTR outputs.',
            details: [
                'Edge-based network diagnostics',
                'Detailed hop analysis',
                'Latency measurements',
                'Global network visibility'
            ],
            image: '/traceroute-feature.png'
        },
        {
            id: 'playwright',
            title: 'Playwright integration',
            description: 'Run tests on demand from a centralized interface, see screenshots and videos of failures.',
            details: [
                'Visual regression testing',
                'Automated browser tests',
                'Failure recordings',
                'Cross-browser validation'
            ],
            image: '/playwright-feature.png'
        }
    ];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    };

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handle touch events for mobile swiping
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevSlide();
        }
    };

    return (
        <section className="py-32 bg-[#0f101a]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Uptime monitoring
                    </h2>
                    <p className="text-xl text-gray-400">
                        See inside any stack, debug any issue, and resolve any incident
                    </p>
                </div>

                {/* Feature Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute -left-5 md:-left-12 top-1/2 transform -translate-y-1/2 z-20">
                        <button
                            onClick={prevSlide}
                            className="bg-[#171827] hover:bg-[#232438] text-gray-300 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-800 hover:border-gray-700"
                            aria-label="Previous feature"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute -right-5 md:-right-12 top-1/2 transform -translate-y-1/2 z-20">
                        <button
                            onClick={nextSlide}
                            className="bg-[#171827] hover:bg-[#232438] text-gray-300 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-800 hover:border-gray-700"
                            aria-label="Next feature"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Carousel */}
                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                            {features.map((feature, index) => (
                                <div key={feature.id} className="w-full flex-shrink-0 px-4">
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                                        {/* Feature Description */}
                                        <div className="order-2 md:order-1">
                                            <h3 className="text-3xl font-bold mb-6 text-white">
                                                {feature.title}
                                            </h3>
                                            <p className="text-xl text-gray-400 mb-8">
                                                {feature.description}
                                            </p>
                                            <ul className="space-y-4">
                                                {feature.details.map((item, i) => (
                                                    <li key={i} className="flex items-center text-gray-300">
                                                        <CheckSquare className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-8">
                                                <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium group">
                                                    Explore {feature.title.split(' ')[0].toLowerCase()} monitoring
                                                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Feature Image */}
                                        <div className="order-1 md:order-2 bg-[#1a1b2e] p-4 rounded-xl border border-gray-800 shadow-xl">
                                            {feature.id === 'screenshots' && (
                                                <div className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-inner">
                                                    <div className="h-8 bg-[#0f101a] flex items-center px-4">
                                                        <div className="flex space-x-2">
                                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="bg-[#0f101a] rounded-lg p-4 h-72">
                                                            <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 p-4 rounded-md border border-red-900/30 mb-4">
                                                                <div className="text-red-400 font-semibold mb-2">Error 502</div>
                                                                <div className="text-gray-400 text-sm">Bad gateway</div>
                                                            </div>
                                                            <div className="flex justify-between mt-8">
                                                                <div className="text-center">
                                                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center mx-auto">
                                                                        <CheckSquare className="w-8 h-8 text-blue-400" />
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-gray-400">Working</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center mx-auto">
                                                                        <CheckSquare className="w-8 h-8 text-blue-400" />
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-gray-400">Working</div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="w-16 h-16 bg-red-500/10 rounded-full border border-red-500/20 flex items-center justify-center mx-auto">
                                                                        <div className="w-8 h-8 text-red-400">×</div>
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-gray-400">Error</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {feature.id === 'traceroute' && (
                                                <div className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-inner">
                                                    <div className="h-8 bg-[#0f101a] flex items-center px-4">
                                                        <div className="flex space-x-2">
                                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="bg-[#0f101a] rounded-lg p-4 h-72 text-xs font-mono overflow-hidden">
                                                            <div className="flex space-x-6 mb-4 text-gray-400 border-b border-gray-800 pb-2">
                                                                <div className="font-medium text-blue-400">Traceroute</div>
                                                                <div>MTR</div>
                                                                <div>SSL certificates</div>
                                                                <div>cURL</div>
                                                            </div>
                                                            <div className="space-y-1 text-gray-400">
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">1</span>
                                                                    <span className="text-green-400">Start: 2024-04-17T16:53:02+0000</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">2</span>
                                                                    <span>HOST: uptime-edge-us-east-2.uptime-edge_worker-us-east-2.3</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">3</span>
                                                                    <span>|— 172.18.0.1</span>
                                                                    <span className="ml-auto">0.0%</span>
                                                                    <span className="ml-4">10</span>
                                                                    <span className="ml-4">0.0</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">4</span>
                                                                    <span>|— 10.204.6.12</span>
                                                                    <span className="ml-auto">0.0%</span>
                                                                    <span className="ml-4">10</span>
                                                                    <span className="ml-4">0.2</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">5</span>
                                                                    <span>|— 10.204.35.59</span>
                                                                    <span className="ml-auto">0.0%</span>
                                                                    <span className="ml-4">10</span>
                                                                    <span className="ml-4">0.3</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="text-gray-600 w-6">6</span>
                                                                    <span>|— 10.204.64.37</span>
                                                                    <span className="ml-auto">0.0%</span>
                                                                    <span className="ml-4">10</span>
                                                                    <span className="ml-4">0.4</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {feature.id === 'playwright' && (
                                                <div className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-inner">
                                                    <div className="h-8 bg-[#0f101a] flex items-center px-4">
                                                        <div className="flex space-x-2">
                                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="bg-[#0f101a] rounded-lg p-4 h-72">
                                                            <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 p-3 rounded-md border border-green-900/30 mb-4">
                                                                <div className="flex justify-between">
                                                                    <div className="text-green-400 font-medium">Tests passing</div>
                                                                    <div className="text-gray-400">21/25</div>
                                                                </div>
                                                                <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                                                                    <div className="bg-green-500 h-full rounded-full" style={{ width: '84%' }}></div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                                <div className="bg-[#1a1b2e] p-3 rounded-md border border-gray-800">
                                                                    <div className="text-sm text-gray-300 mb-2">Homepage</div>
                                                                    <div className="text-xs text-gray-400">Last run: 2h ago</div>
                                                                    <div className="text-xs text-green-400 mt-1">PASSED</div>
                                                                </div>
                                                                <div className="bg-[#1a1b2e] p-3 rounded-md border border-gray-800">
                                                                    <div className="text-sm text-gray-300 mb-2">Login</div>
                                                                    <div className="text-xs text-gray-400">Last run: 2h ago</div>
                                                                    <div className="text-xs text-green-400 mt-1">PASSED</div>
                                                                </div>
                                                                <div className="bg-[#1a1b2e] p-3 rounded-md border border-gray-800">
                                                                    <div className="text-sm text-gray-300 mb-2">Dashboard</div>
                                                                    <div className="text-xs text-gray-400">Last run: 2h ago</div>
                                                                    <div className="text-xs text-red-400 mt-1">FAILED</div>
                                                                </div>
                                                                <div className="bg-[#1a1b2e] p-3 rounded-md border border-gray-800">
                                                                    <div className="text-sm text-gray-300 mb-2">Checkout</div>
                                                                    <div className="text-xs text-gray-400">Last run: 2h ago</div>
                                                                    <div className="text-xs text-green-400 mt-1">PASSED</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center mt-12 space-x-2">
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index
                                    ? 'bg-blue-500 w-8'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;