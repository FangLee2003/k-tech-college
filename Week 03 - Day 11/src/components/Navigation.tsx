import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white py-3 mb-6">
      <div className="max-w-4xl mx-auto flex gap-6">
        <Link to="/" className="text-white hover:text-green-400 font-semibold">Home</Link>
        <Link to="/users" className="text-white hover:text-green-400 font-semibold">Users</Link>
      </div>
    </nav>
  );
}
