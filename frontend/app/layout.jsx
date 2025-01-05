'use client'

import './globals.css';
import React from 'react';
import Link from 'next/link';
import { Menu, X, Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { ReduxProvider } from './Provider';

const RootLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-indigo-600 flex items-center">
                  Blembod
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/features" className="text-gray-600 hover:text-indigo-600">
                    Features
                  </Link>
                  <Link href="/solutions" className="text-gray-600 hover:text-indigo-600">
                    Solutions
                  </Link>
                  <Link href="/pricing" className="text-gray-600 hover:text-indigo-600">
                    Pricing
                  </Link>
                  <Link href="/docs" className="text-gray-600 hover:text-indigo-600">
                    Resources
                  </Link>
                  <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-gray-600 hover:text-indigo-600">
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Start Free
                    </Link>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden absolute w-full bg-white border-b border-gray-200">
                <div className="px-4 py-6 space-y-4">
                  <Link
                    href="/features"
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-lg"
                  >
                    Features
                  </Link>
                  <Link
                    href="/solutions"
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-lg"
                  >
                    Solutions
                  </Link>
                  <Link
                    href="/pricing"
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-lg"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/docs"
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-lg"
                  >
                    Resources
                  </Link>
                  <div className="border-t border-gray-200 pt-4">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-lg"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 mt-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center"
                    >
                      Start Free
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="flex-grow pt-20">
            <ReduxProvider>
            {children}
            </ReduxProvider>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">PMPlatform</h3>
                  <p className="text-gray-400">
                    Empowering teams to achieve more through seamless collaboration and efficient project management.
                  </p>
                </div>

                {/* Sitemap */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Sitemap</h4>
                  <ul className="space-y-3">
                    <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                    <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                    <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                    <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>
                  <ul className="space-y-3">
                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                    <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} PMPlatform. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;