import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md h-16 fixed top-0 right-0 left-64 z-10">
      <div className="flex justify-between items-center h-full px-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {user?.name}
          </h2>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};