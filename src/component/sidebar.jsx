import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="w-64 bg-rose-500 text-black font-bold min-h-screen p-4 mr-5">
      <nav className="flex flex-col space-y-3 items-start">
        <h1 className="">Menu</h1>
        <Link to="/" className="hover:bg-gray-900 hover:text-rose-500 p-2 rounded font-bold text-black">Home</Link>
        <Link to="/rbk" className="hover:bg-gray-900 hover:text-rose-500 p-2 rounded font-bold text-black">Rubikk</Link>
        <Link to="/ts" className="hover:bg-gray-900 hover:text-rose-500 p-2 rounded font-bold text-black">Task</Link>
      </nav>
    </div>
  );
}
