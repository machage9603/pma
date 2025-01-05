// app/store/page.jsx
'use client';

import { useSelector } from 'react-redux';

export default function StorePage() {
  // Example of using Redux state
  const authState = useSelector((state) => state.auth);
  const projectsState = useSelector((state) => state.projects);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Store Page</h1>
      {/* Add your store page content here */}
    </div>
  );
}