import React from 'react';
import { ChevronRight, Users, CheckSquare, FolderGit2, Bell, Lock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Lock className="w-12 h-12 text-indigo-500" />,
      title: "Secure Authentication",
      description: "Enterprise-grade security with role-based access control"
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-500" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with your team members"
    },
    {
      icon: <CheckSquare className="w-12 h-12 text-indigo-500" />,
      title: "Smart Task Management",
      description: "Intuitive task tracking and progress monitoring"
    },
    {
      icon: <FolderGit2 className="w-12 h-12 text-indigo-500" />,
      title: "File Management",
      description: "Centralized file storage and version control"
    },
    {
      icon: <Bell className="w-12 h-12 text-indigo-500" />,
      title: "Smart Notifications",
      description: "Customizable alerts for important updates"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Manage Projects with Confidence
            </h1>
            <p className="text-xl mb-10 text-indigo-100">
              Transform the way your team collaborates. Experience seamless project management with real-time updates and powerful tools.
            </p>
            <div className="flex justify-center gap-6">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Start for free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help your team succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}
                   className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="mb-6 bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-12 text-center shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of teams already using our platform
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center group">
              Get Started Now
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;