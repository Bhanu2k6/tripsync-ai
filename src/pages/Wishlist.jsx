import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Wishlist() {

  const [wishlist, setWishlist] = useState(

    JSON.parse(
      localStorage.getItem("wishlist")
    ) || []

  );

  const handleDelete = (destination) => {

    const updatedWishlist =
      wishlist.filter(
        (trip) =>
          trip.destination !== destination
      );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const handleOpenTrip = (trip) => {

    localStorage.setItem(
      "generatedTrip",
      JSON.stringify(trip)
    );

    window.location.assign(
      "/trip-details"
    );
  };

  return (

    <div className="min-h-screen bg-[#faf7f2] pt-28 px-6 pb-16">

      <Navbar />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold text-neutral-800 mb-3">

            ❤️ My Wishlist

          </h1>

          <p className="text-lg text-neutral-500">

            Your saved dream destinations

          </p>

        </div>

        {/* EMPTY STATE */}

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-[30px] p-14 text-center shadow-sm border border-orange-100">

            <div className="text-7xl mb-6">
              💖
            </div>

            <p className="text-3xl font-bold text-neutral-800 mb-3">

              No Favorite Trips Yet

            </p>

            <p className="text-lg text-neutral-500">

              Save trips you love and revisit them anytime.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {wishlist.map((trip, index) => (

              <div
                key={index}
                className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-orange-100 hover:shadow-xl hover:scale-[1.02] transition"
              >

                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="h-56 w-full object-cover cursor-pointer"
                  onClick={() =>
                    handleOpenTrip(trip)
                  }
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">

                    {trip.destination}

                  </h2>

                  <p className="text-neutral-500 text-base mb-5">

                    {trip.days} Days • {trip.budget}

                  </p>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleOpenTrip(trip)
                      }
                      className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-bold hover:scale-105 transition"
                    >

                      Open Trip

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          trip.destination
                        )
                      }
                      className="bg-red-100 text-red-500 px-5 rounded-2xl font-bold hover:bg-red-200 transition"
                    >

                      ✕

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Wishlist;