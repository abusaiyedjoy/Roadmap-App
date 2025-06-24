import { useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast"


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/")
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <Link to={"/"} className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <FaMapMarkerAlt />
        Roadmap
      </Link>
      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 inline-flex place-items-center gap-1 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <MdLogout /> Log Out
        </button>
      ) : (
        <Link to="/signin" className="px-4 py-2 inline-flex place-items-center gap-1 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
         <FaUserPlus /> Sign In 
        </Link>
      )}
    </header>
  )
}
export default Navbar;