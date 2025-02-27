'use client'

import React, { useEffect, useState } from 'react';
import { ChevronRight, Users, CheckSquare, Bell, Github, Twitter, Linkedin, ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  const [stars, setStars] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate stars on component mount
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starCount = 80;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 2 + 1}px`,
          opacity: Math.random() * 0.8 + 0.2,
          animationDuration: `${Math.random() * 10 + 10}s`
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-400" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with your team members across projects and tasks"
    },
    {
      icon: <CheckSquare className="w-12 h-12 text-blue-400" />,
      title: "Task Monitoring",
      description: "Intuitive task tracking with progress insights and deadline management"
    },
    {
      icon: <Bell className="w-12 h-12 text-blue-400" />,
      title: "Smart Alerts",
      description: "Customizable notifications for critical events and important updates"
    }
  ];

  return (
    <>
      {/* Navigation with improved glass effect - Moved from layout */}
      <nav className={`fixed w-full z-50 border-b border-gray-800/60 transition-all duration-300 ${scrollPosition > 10 ? 'bg-[#0f101a]/90 backdrop-blur-md' : 'bg-transparent backdrop-blur-sm'
        }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo with subtle glow */}
            <Link href="/" className="text-2xl font-bold text-white flex items-center group">
              Kazi<span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 relative">
                Pro
                <span className="absolute -inset-1 rounded-lg blur-sm bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            </Link>

            {/* Desktop Navigation with hover effects */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {['Platform', 'Documentation', 'Pricing', 'Community', 'Company', 'Enterprise'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/20 hover:scale-105 transform"
                >
                  Sign up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button with improved interaction */}
            <button
              className="md:hidden relative z-50 p-2 rounded-full hover:bg-gray-800/50 transition-colors"
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

        {/* Mobile Navigation with glass effect */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-[#0f101a]/95 backdrop-blur-lg border-b border-gray-800/60 animate-fadeIn">
            <div className="px-4 py-6 space-y-4">
              {['Platform', 'Documentation', 'Pricing', 'Community', 'Company', 'Enterprise'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#171827]/60 rounded-lg transition-colors"
                >
                  {item}
                </Link>
              ))}
              <div className="border-t border-gray-800/60 pt-4">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-300 hover:bg-[#171827]/60 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 mt-2 text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-blue-500/20"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Background effects (moved from layout) */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0D0F18] via-[#1a1c2e] to-[#2c1e55] overflow-hidden -z-10">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(76,0,255,0.1),rgba(28,0,102,0.3))]"></div>

        {/* Stars */}
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

      {/* Hero Section */}
      <section className="relative pt-28 pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f101a] via-[#131525] to-[#0f101a] opacity-80"></div>

        {/* Background grid/dot effect */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"></div>

        {/* Floating UI dashboard cards - positioned around the main content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top left dashboard */}
          <div
            className="absolute top-[10%] left-[5%] w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-70 rotate-[-6deg] transform"
            style={{
              animation: "float 8s ease-in-out infinite",
              backgroundImage: "linear-gradient(rgba(26, 27, 46, 0.9), rgba(26, 27, 46, 0.9)), url('/dashboard-bg-1.svg')",
              backgroundSize: "cover"
            }}
          >
            <div className="p-3">
              <div className="h-3 w-20 bg-blue-500/30 rounded mb-2"></div>
              <div className="flex space-x-1">
                <div className="h-12 w-1/2 bg-blue-500/20 rounded"></div>
                <div className="h-12 w-1/2 bg-purple-500/20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Bottom left dashboard */}
          <div
            className="absolute bottom-[15%] left-[8%] w-72 h-56 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-80 rotate-[4deg] transform"
            style={{
              animation: "float 7s ease-in-out infinite",
              animationDelay: "1s",
              backgroundImage: "linear-gradient(rgba(26, 27, 46, 0.9), rgba(26, 27, 46, 0.9)), url('/dashboard-bg-2.svg')",
              backgroundSize: "cover"
            }}
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 w-16 bg-green-500/30 rounded"></div>
                <div className="h-3 w-8 bg-gray-500/30 rounded"></div>
              </div>
              <div className="h-20 bg-green-500/10 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="h-6 w-20 bg-green-500/20 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top right dashboard */}
          <div
            className="absolute top-[15%] right-[5%] w-80 h-60 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-75 rotate-[8deg] transform"
            style={{
              animation: "float 9s ease-in-out infinite",
              animationDelay: "0.5s",
              backgroundImage: "linear-gradient(rgba(26, 27, 46, 0.9), rgba(26, 27, 46, 0.9)), url('/dashboard-bg-3.svg')",
              backgroundSize: "cover"
            }}
          >
            <div className="p-4">
              <div className="h-3 w-24 bg-blue-500/30 rounded mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-16 w-1/3 bg-blue-500/20 rounded-lg"></div>
                <div className="h-16 w-1/3 bg-indigo-500/20 rounded-lg"></div>
                <div className="h-16 w-1/3 bg-purple-500/20 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Bottom right dashboard with user count like in the image */}
          <div
            className="absolute bottom-[20%] right-[8%] w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-90 rotate-[-5deg] transform"
            style={{
              animation: "float 8s ease-in-out infinite",
              animationDelay: "1.5s"
            }}
          >
            <div className="p-4">
              <div className="text-gray-400 mb-1 text-sm">Users online</div>
              <div className="text-5xl font-bold text-blue-400">298</div>
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-6 z-10">
          {/* Main content */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Prevent<br />downtime.
            </h1>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              See inside any stack, debug any issue, and resolve any incident before your users even notice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <input type="email" placeholder="Your email" className="w-full sm:w-1/3 bg-[#0f101a] border border-gray-700 rounded-lg sm:rounded-l-lg py-3 px-3 text-white focus:outline-none focus:border-blue-500" />
              <button className="border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Sign Up for free
              </button>
            </div>
          </div>
        </div>

        {/* Add the floating animation globally */}
        <style jsx global>{`
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(var(--rotation, 0deg));
      }
      50% {
        transform: translateY(-15px) rotate(var(--rotation, 0deg));
      }
    }
  `}</style>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-[#0f101a]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Complete Visibility
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features to help your team succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}
                className="bg-[#171827] p-8 rounded-2xl border border-gray-800 hover:border-blue-900 transition-all duration-300 group hover:translate-y-[-4px]">
                <div className="mb-6 bg-blue-900/20 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-blue-900/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-[#131525]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Real-time metrics at your fingertips</h2>
              <p className="text-xl text-gray-400 mb-8">
                Monitor system performance and identify issues before they affect your users. Track everything from response times to error rates.
              </p>
              <ul className="space-y-4">
                {['Custom dashboards', 'Automatic anomaly detection', 'Uptime monitoring', 'Historical trends'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckSquare className="w-5 h-5 text-blue-400 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1b2e] p-4 rounded-xl border border-gray-800 shadow-xl">
              <div className="bg-[#1a1b2e] rounded-lg overflow-hidden">
                <div className="h-8 bg-[#0f101a] flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-gray-800">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-blue-400">298</div>
                      <div className="text-gray-400 mt-2">Users online</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0f101a]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-12 text-center shadow-xl border border-blue-800">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Prevent Downtime?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of teams already using our platform
            </p>
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center group">
              Sign up for free
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Full Footer (moved from layout) */}
      <section className="bg-[#131525]/80 backdrop-blur-md border-t border-gray-800/60">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info with subtle animation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6 relative inline-block group">
                Kazi<span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Pro</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 group-hover:w-full"></span>
              </h3>
              <p className="text-gray-400">
                See inside any stack, debug any issue, and resolve any incident before users notice.
              </p>
            </div>

            {/* Platform links with hover effects */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800/60">Platform</h4>
              <ul className="space-y-3">
                {['Features', 'Integrations', 'Pricing', 'Uptime Monitoring', 'Log Management'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-white transition-colors relative group flex items-center"
                    >
                      <span className="absolute left-0 w-0 h-0.5 bg-blue-500/40 opacity-0 group-hover:opacity-100 group-hover:w-5 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-6 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links with hover effects */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800/60">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-white transition-colors relative group flex items-center"
                    >
                      <span className="absolute left-0 w-0 h-0.5 bg-blue-500/40 opacity-0 group-hover:opacity-100 group-hover:w-5 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-6 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links and Newsletter with glass effect */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800/60">Connect With Us</h4>
              <div className="flex space-x-4">
                {[
                  { Icon: Twitter, aria: 'Twitter' },
                  { Icon: Linkedin, aria: 'LinkedIn' },
                  { Icon: Github, aria: 'GitHub' }
                ].map(({ Icon, aria }, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={aria}
                    className="hover:text-white transition-colors p-2 hover:bg-[#171827]/60 rounded-full hover:scale-110 transform duration-300 hover:shadow-md hover:shadow-blue-500/10"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <div className="mt-8 bg-[#171827]/60 backdrop-blur-md p-5 rounded-lg border border-gray-800/60 hover:border-gray-700/60 transition-colors shadow-lg hover:shadow-blue-900/10">
                <h5 className="font-medium text-white mb-2">Subscribe to our newsletter</h5>
                <div className="flex mt-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-[#0f101a]/80 border border-gray-700/60 rounded-l-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-r-lg px-3 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;