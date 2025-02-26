import React from 'react';
import { ChevronRight, Users, CheckSquare, Bell } from 'lucide-react';

const Home = () => {
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
    <div className="min-h-screen bg-[#0f101a]">
      {/* Hero Section  */}
      <section className="relative pt-28 pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f101a] via-[#131525] to-[#0f101a] opacity-80"></div>

        {/* Background grid/dot effect */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"></div>

        {/* Floating UI elements in background */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-lg blur-2xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-500/10 rounded-lg blur-3xl"></div>

        <div className="relative container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              Prevent<br />downtime.
            </h1>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              See inside any stack, debug any issue, and resolve any incident before your users even notice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <input type="email" placeholder="Your email" className="w-1/3 bg-[#0f101a] border border-gray-700 rounded-l-lg py-1 px-3 text-white focus:outline-none focus:border-blue-500" />
              <button className="border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Sign Up for free
              </button>
            </div>
          </div>
        </div>

        {/* Floating UI mockups */}
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex gap-4 overflow-hidden mx-4">
            <div className="w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-60 rotate-3"></div>
            <div className="w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-70 translate-y-2"></div>
            <div className="w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-90 -translate-y-3"></div>
            <div className="w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-70 translate-y-4"></div>
            <div className="w-64 h-48 bg-[#1a1b2e] rounded-lg shadow-xl border border-gray-800 opacity-60 -rotate-3"></div>
          </div>
        </div>
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
    </div>
  );
};

export default Home;