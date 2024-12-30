"use client";

import Link from 'next/link';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Project Manager</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/projects"
              className="block px-4 py-2 hover:bg-gray-700 rounded">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/tasks"
              className="block px-4 py-2 hover:bg-gray-700 rounded">
              Tasks
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link href="/users"
                className="block px-4 py-2 hover:bg-gray-700 rounded">
                Users
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;