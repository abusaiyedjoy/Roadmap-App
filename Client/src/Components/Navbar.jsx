import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
        <Link to={"/"} className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <FaMapMarkerAlt />
          Roadmap
        </Link>
        <Link to={"signin"} className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Sign In
        </Link>
      </header>
    )
}
export default Navbar;