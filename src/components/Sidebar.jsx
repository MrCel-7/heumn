import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-50 text-white h-screen px-5 bg-blue-800 fixed top-0 left-0 py-3">
      <div className="my-5 w-full justify-center flex">
        <h1 className="font-bold text-xl">PAS</h1>
      </div>
      <div className="w-full flex flex-col gap-2 my-10">
        <p className="text-xs">~ Purchase Order ~</p>
        <Link
          to="/"
          className="py-1 px-2 rounded-xl hover:bg-blue-200 hover:shadow-inner"
        >
          Dashboard
        </Link>
        <Link
          to="/pending"
          className="py-1 px-2 rounded-xl hover:bg-blue-200 hover:shadow-inner"
        >
          Purchase Order
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 my-10">
        <p className="text-xs">~ Data Person ~</p>
        <Link
          to="/sales"
          className="py-1 px-2 rounded-xl hover:bg-blue-200 hover:shadow-inner"
        >
          Sales
        </Link>
        <Link
          to="/pending"
          className="py-1 px-2 rounded-xl hover:bg-blue-200 hover:shadow-inner"
        >
          Purchase Order
        </Link>
      </div>
    </div>
  );
}
