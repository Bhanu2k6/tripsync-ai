import { Link } from "react-router-dom";

import {
  House,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

function Navbar() {

  let user = null;

  try {

    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {

      user = JSON.parse(storedUser);

    }

  } catch (error) {

    console.log(error);

  }

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-orange-100">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-md">

            ✈️

          </div>

          <h1 className="text-2xl font-bold text-neutral-800">

            TripSync

          </h1>

          <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs font-semibold">

            AI

          </span>

        </Link>

        {/* NAV LINKS */}

        <div className="hidden md:flex items-center gap-3 bg-white/70 border border-orange-100 px-3 py-2 rounded-2xl shadow-sm">

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-100 transition text-neutral-700 font-medium text-sm"
          >

            <House size={16} />

            Home

          </Link>

          {user && (

            <>

              <Link
                to="/create-trip"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-100 transition text-neutral-700 font-medium text-sm"
              >

                <PlusCircle size={16} />

                Plan Trip

              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-100 transition text-neutral-700 font-medium text-sm"
              >

                <LayoutDashboard size={16} />

                History

              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-orange-100 transition text-neutral-700 font-medium text-sm"
              >

                ❤️ Wishlist

              </Link>

            </>

          )}

        </div>

        {/* RIGHT SIDE */}

        <div>

          {user ? (

            <button
              onClick={handleLogout}
              className="text-neutral-700 font-medium text-sm hover:text-orange-500 transition"
            >

              Sign Out

            </button>

          ) : (

            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2.5 rounded-2xl font-semibold shadow-lg hover:scale-105 transition text-sm"
            >

              Login

            </Link>

          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;