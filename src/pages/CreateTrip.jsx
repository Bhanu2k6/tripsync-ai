import { useState } from "react";
import { generateAITrip } from "../services/aiService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CreateTrip() {

  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    destination:
      localStorage.getItem("selectedDestination") || "",

    days: "",

    travelers: "",

    budget: "Moderate",

    mood: "Adventure",
  });

  const [loading, setLoading] = useState(false);

  const moods = [
    { name: "Adventure", emoji: "⛰️" },
    { name: "Chill", emoji: "☕" },
    { name: "Romantic", emoji: "💗" },
    { name: "Cultural", emoji: "🏛️" },
    { name: "Foodie", emoji: "🍜" },
  ];

  const travelQuotes = [
    "Finding hidden gems...",
    "Planning unforgettable moments...",
    "Exploring local experiences...",
    "Creating your dream itinerary...",
  ];

  const randomQuote =
    travelQuotes[
      Math.floor(Math.random() * travelQuotes.length)
    ];

  const handleGenerate = async () => {

    if (
      !tripData.destination ||
      !tripData.days ||
      !tripData.travelers
    ) {

      alert("Please fill all fields");

      return;
    }

    setLoading(true);

    const aiResponse =
      await generateAITrip(tripData);

    const generatedTrip = {
      id: Date.now(),

      destination: tripData.destination,

      mood: tripData.mood,

      days: tripData.days,

      travelers: tripData.travelers,

      budget: tripData.budget,

      aiPlan: aiResponse,
    };

    const existingTrips =
      JSON.parse(
        localStorage.getItem("savedTrips")
      ) || [];

    existingTrips.unshift(generatedTrip);

    localStorage.setItem(
      "savedTrips",
      JSON.stringify(existingTrips)
    );

    localStorage.setItem(
      "generatedTrip",
      JSON.stringify(generatedTrip)
    );

    setTimeout(() => {

      setLoading(false);

      navigate("/trip-details");

    }, 2200);
  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">

        <div className="text-center max-w-xl">

          <div className="text-7xl animate-bounce mb-8">
            ✈️
          </div>

          <h1 className="text-5xl font-bold text-neutral-800 mb-6 leading-tight">

            AI is planning
            <br />
            your dream trip...

          </h1>

          <p className="text-xl text-neutral-500 mb-10">

            {randomQuote}

          </p>

          <div className="w-full h-4 bg-orange-100 rounded-full overflow-hidden">

            <div className="h-full bg-gradient-to-r from-orange-400 to-pink-500 animate-pulse w-3/4 rounded-full"></div>

          </div>

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-[#faf7f2] pt-28 px-6 pb-16">

      <Navbar />

      <div className="max-w-4xl mx-auto bg-white rounded-[34px] shadow-sm border border-orange-100 p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-neutral-800 mb-3">

            Plan Your Perfect Trip ✨

          </h1>

          <p className="text-neutral-500 text-lg">

            Let AI create your dream itinerary in seconds

          </p>

        </div>

        {/* DESTINATION */}

        <div className="mb-8">

          <label className="block text-xl font-semibold text-neutral-800 mb-3">

            📍 Where do you want to go?

          </label>

          <input
            type="text"
            placeholder="e.g. Paris, Tokyo, Bali..."
            className="w-full border border-neutral-200 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-orange-300"
            value={tripData.destination}
            onChange={(e) =>
              setTripData({
                ...tripData,
                destination: e.target.value,
              })
            }
          />

        </div>

        {/* DETAILS */}

        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div>

            <label className="block text-lg font-semibold mb-3">

              📅 Days

            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter days"
              className="w-full border border-neutral-200 rounded-2xl px-5 py-4 text-lg outline-none"
              value={tripData.days}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  days: e.target.value,
                })
              }
            />

          </div>

          <div>

            <label className="block text-lg font-semibold mb-3">

              👥 Travelers

            </label>

            <input
              type="number"
              min="1"
              placeholder="Travelers"
              className="w-full border border-neutral-200 rounded-2xl px-5 py-4 text-lg outline-none"
              value={tripData.travelers}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  travelers: e.target.value,
                })
              }
            />

          </div>

          <div>

            <label className="block text-lg font-semibold mb-3">

              💰 Budget

            </label>

            <select
              className="w-full border border-neutral-200 rounded-2xl px-5 py-4 text-lg outline-none"
              value={tripData.budget}
              onChange={(e) =>
                setTripData({
                  ...tripData,
                  budget: e.target.value,
                })
              }
            >

              <option>Budget</option>
              <option>Moderate</option>
              <option>Luxury</option>

            </select>

          </div>

        </div>

        {/* MOODS */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold text-neutral-800 mb-5">

            What's the vibe?

          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {moods.map((mood, index) => (

              <button
                key={index}
                onClick={() =>
                  setTripData({
                    ...tripData,
                    mood: mood.name,
                  })
                }
                className={`rounded-[24px] p-5 border-2 transition text-center ${
                  tripData.mood === mood.name
                    ? "border-orange-400 bg-orange-50"
                    : "border-neutral-200 bg-white"
                }`}
              >

                <div className="text-3xl mb-3">
                  {mood.emoji}
                </div>

                <h3 className="text-lg font-semibold">

                  {mood.name}

                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-orange-300 to-pink-400 text-white text-xl font-bold py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition"
        >

          ✨ Generate AI Trip Plan

        </button>

      </div>

    </div>

  );
}

export default CreateTrip;