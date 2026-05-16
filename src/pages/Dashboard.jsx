import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const savedTrips =
    JSON.parse(localStorage.getItem("savedTrips")) || [];

  const handleDelete = (id) => {

    const updatedTrips =
      savedTrips.filter((trip) => trip.id !== id);

    localStorage.setItem(
      "savedTrips",
      JSON.stringify(updatedTrips)
    );

    window.location.reload();
  };

  const openTrip = (trip) => {

    localStorage.setItem(
      "generatedTrip",
      JSON.stringify(trip)
    );

    navigate("/trip-details");
  };

  return (

    <div className="min-h-screen bg-[#faf7f2] pt-28 px-6 pb-16">

      <Navbar />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">

          <div>

            <h1 className="text-5xl font-bold text-neutral-800 mb-3">

              🕘 Trip History

            </h1>

            <p className="text-neutral-500 text-lg">

              Your AI-powered travel memories

            </p>

          </div>

          <button
            className="mt-5 md:mt-0 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-7 py-4 rounded-3xl font-bold text-lg shadow-lg hover:scale-105 transition"
            onClick={() => {
              navigate("/create-trip");
            }}
          >

            + Create New Trip

          </button>

        </div>

        {/* EMPTY */}

        {savedTrips.length === 0 ? (

          <div className="bg-white rounded-[32px] p-16 text-center border border-orange-100 shadow-sm">

            <div className="text-7xl mb-6">
              🌴
            </div>

            <h2 className="text-4xl font-bold text-neutral-800 mb-4">

              No Trips Yet

            </h2>

            <p className="text-neutral-500 text-lg mb-8">

              Start planning your dream adventure with AI

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {savedTrips.map((trip) => (

              <div
                key={trip.id}
                className="bg-white rounded-[30px] p-6 border border-orange-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition"
              >

                {/* TOP */}

                <div className="mb-6">

                  <div className="text-5xl mb-5">
                    ✈️
                  </div>

                  <h2 className="text-3xl font-bold text-neutral-800 mb-3">

                    {trip.destination}

                  </h2>

                  <p className="text-neutral-500 text-lg">

                    {trip.days} Days • {trip.travelers} Travelers

                  </p>

                </div>

                {/* TAGS */}

                <div className="flex gap-3 flex-wrap mb-6">

                  <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-semibold text-sm">

                    {trip.mood}

                  </span>

                  <span className="bg-pink-100 text-pink-500 px-4 py-2 rounded-full font-semibold text-sm">

                    {trip.budget}

                  </span>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() => openTrip(trip)}
                    className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl font-bold hover:scale-105 transition"
                  >

                    View

                  </button>

                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="bg-red-100 text-red-500 px-5 rounded-2xl font-bold hover:bg-red-200 transition"
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Dashboard;