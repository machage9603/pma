'use client'

import './globals.css';
import React from 'react';
import Link from 'next/link';
import { Menu, X, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { ReduxProvider } from './Provider';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

const RootLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-[#0f101a] text-white">
          {/* Navigation */}
          <nav className="fixed w-full bg-[#0f101a]/90 backdrop-blur-md z-50 border-b border-gray-800">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white flex items-center">
                  Kazi<span className="text-blue-400">Pro</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <div className="flex items-center space-x-6">
                    <Link href="/platform" className="text-gray-300 hover:text-white">
                      Platform
                    </Link>
                    <Link href="/documentation" className="text-gray-300 hover:text-white">
                      Documentation
                    </Link>
                    <Link href="/pricing" className="text-gray-300 hover:text-white">
                      Pricing
                    </Link>
                    <Link href="/community" className="text-gray-300 hover:text-white">
                      Community
                    </Link>
                    <Link href="/company" className="text-gray-300 hover:text-white">
                      Company
                    </Link>
                    <Link href="/enterprise" className="text-gray-300 hover:text-white">
                      Enterprise
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-gray-300 hover:text-white">
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden absolute w-full bg-[#0f101a] border-b border-gray-800">
                <div className="px-4 py-6 space-y-4">
                  <Link href="/platform" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Platform
                  </Link>
                  <Link href="/documentation" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Documentation
                  </Link>
                  <Link href="/pricing" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Pricing
                  </Link>
                  <Link href="/community" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Community
                  </Link>
                  <Link href="/company" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Company
                  </Link>
                  <Link href="/enterprise" className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg">
                    Enterprise
                  </Link>
                  <div className="border-t border-gray-800 pt-4">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-300 hover:bg-[#171827] rounded-lg"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 mt-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="flex-grow pt-20">
            <Toaster position="top-right" reverseOrder={false} />
            <ReduxProvider>
              {children}
            </ReduxProvider>
            <Script src="https://accounts.google.com/gpt/client" strategy="lazyOnload" />
          </main>

          {/* Footer */}
          <footer className="bg-[#131525] text-gray-300 border-t border-gray-800">
            <div className="container mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">Kazi<span className="text-blue-400">Pro</span></h3>
                  <p className="text-gray-400">
                    See inside any stack, debug any issue, and resolve any incident before users notice.
                  </p>
                </div>

                {/* Platform */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Platform</h4>
                  <ul className="space-y-3">
                    <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                    <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                    <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                    <li><Link href="/uptime" className="hover:text-white transition-colors">Uptime Monitoring</Link></li>
                    <li><Link href="/logs" className="hover:text-white transition-colors">Log Management</Link></li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
                  <ul className="space-y-3">
                    <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                    <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-[#171827] rounded-full">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-[#171827] rounded-full">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-[#171827] rounded-full">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="mt-8 bg-[#171827] p-5 rounded-lg border border-gray-800">
                    <h5 className="font-medium text-white mb-2">Subscribe to our newsletter</h5>
                    <div className="flex mt-3">
                      <input type="email" placeholder="Your email" className="w-full bg-[#0f101a] border border-gray-700 rounded-l-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500" />
                      <button className="bg-blue-600 hover:bg-blue-700 rounded-r-lg px-3 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center text-gray-400 flex-wrap gap-4">
                <p>&copy; {new Date().getFullYear()} KaziPro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;