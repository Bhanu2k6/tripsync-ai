import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

function TripDetails() {

  const [weather, setWeather] = useState(null);

  const destinationImages = {
    paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",

    tokyo:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",

    bali:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4",

    goa:
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",

    manali:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",

    default:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  };

  const trip = JSON.parse(
    localStorage.getItem("generatedTrip")
  );

  useEffect(() => {

    if (trip?.destination) {

      getWeather(trip.destination)
        .then((data) => {
          setWeather(data);
        });

    }

  }, []);

  if (!trip) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        No Trip Found
      </div>
    );
  }

  const destinationKey =
    trip?.destination?.toLowerCase();

  const heroImage =
    destinationImages[destinationKey] ||
    destinationImages.default;

  const lines = trip?.aiPlan
    ? trip.aiPlan
        .split("\n")
        .filter(
          (line) => line.trim() !== ""
        )
    : [];

  const handleWishlist = () => {

    const wishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const exists =
      wishlist.find(
        (item) =>
          item.destination === trip.destination
      );

    if (!exists) {

      wishlist.push({
        ...trip,
        image: heroImage,
      });

      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );

      alert("❤️ Added to Wishlist");

    } else {

      alert("Already in Wishlist");

    }

  };

  const handleDownload = () => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");

    doc.setFontSize(22);

    doc.text(
      `${trip.destination} Trip Plan`,
      20,
      25
    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(13);

    const splitText =
      doc.splitTextToSize(
        trip.aiPlan ||
        "No itinerary available",
        170
      );

    doc.text(splitText, 20, 45);

    doc.save(
      `${trip.destination}-trip.pdf`
    );
  };

  return (

    <div className="min-h-screen bg-[#faf7f2] pt-28 px-6 pb-16">

      <Navbar />

      <div className="max-w-6xl mx-auto">

        {/* TOP BUTTONS */}

        <div className="flex gap-4 mb-8 flex-wrap">

          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >

            ⬇ Download Trip

          </button>

          <button
            onClick={handleWishlist}
            className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-orange-100 font-semibold text-pink-500 hover:shadow-lg transition"
          >

            ❤️ Add to Wishlist

          </button>

        </div>

        {/* HERO */}

        <div
          className="relative rounded-[36px] overflow-hidden p-10 text-white shadow-xl mb-8 bg-cover bg-center min-h-[380px] flex flex-col justify-end"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10">

            <h1 className="text-5xl font-bold mb-4">

              ✈️ {trip.destination}

            </h1>

            <p className="text-xl">

              Mood: {trip.mood}

            </p>

            <p className="text-lg mt-2">

              {trip.days} Days • {trip.travelers} Travelers • {trip.budget}

            </p>

          </div>

        </div>

        {/* WEATHER */}

        {weather && (

          <div className="bg-white rounded-[28px] p-6 border border-orange-100 shadow-sm mb-10 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-neutral-800 mb-2">

                🌤️ Current Weather

              </h2>

              <p className="text-lg text-neutral-500">

                {weather.condition} in {trip.destination}

              </p>

            </div>

            <div className="text-4xl font-bold text-orange-500">

              {weather.temp}°C

            </div>

          </div>

        )}

        {/* MAP */}

        <div className="bg-white rounded-[28px] p-5 border border-orange-100 shadow-sm mb-10">

          <h2 className="text-2xl font-bold text-neutral-800 mb-5">

            🗺️ Explore {trip.destination}

          </h2>

          <iframe
            title="map"
            width="100%"
            height="420"
            className="rounded-[20px]"
            loading="lazy"
            src={`https://www.google.com/maps?q=${trip.destination}&output=embed`}
          ></iframe>

        </div>

        {/* ITINERARY */}

        <div className="space-y-6">

          {lines.map((line, index) => {

            const lower =
              line.toLowerCase().trim();

            const isDay =
  lower.startsWith("day");

const isMorning =
  lower.startsWith("morning");

const isAfternoon =
  lower.startsWith("afternoon");

const isEvening =
  lower.startsWith("evening");

const isHotels =
  lower.startsWith("recommended hotels") ||
  lower.startsWith("hotels");

const isRestaurants =
  lower.startsWith("restaurants");

const isTips =
  lower.startsWith("travel tips");

const isBestTime =
  lower.startsWith("best time");

const isCurrency =
  lower.startsWith("currency");

const isLanguage =
  lower.startsWith("language");

const isPacking =
  lower.includes("packing");

const cleanedLine = line
  .replace("Best Time:", "")
  .replace("Currency:", "")
  .replace("Language:", "")
  .replace("Packing:", "")
  .replace("Hotels:", "")
  .replace("Recommended Hotels:", "")
  .replace("Restaurants:", "")
  .replace("Restaurants/Cafes:", "")
  .replace("Travel Tips:", "")
  .replace("🏨 Recommended Hotels", "")
  .replace("🍜 Restaurants & Cafes", "")
  .replace("🌍 Travel Tips", "")
  .trim();

            if (
              lower === "best time:" ||
              lower === "currency:" ||
              lower === "language:" ||
              lower === "restaurants/cafes:" ||
              lower === "travel tips:" ||
              lower === "hotels:" ||
              lower === "packing:"
            ) {
              return null;
            }

            if (isDay) {

              return (

                <div
                  key={index}
                  className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-[28px] px-7 py-5 text-3xl font-bold shadow-xl"
                >

                  📅 {line}

                </div>

              );
            }

            if (isMorning) {

              return (

                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-yellow-900 mb-3">

                    🌅 Morning

                  </h3>

                  <p className="text-lg text-yellow-800 leading-relaxed">

                    {line.replace("Morning:", "")}

                  </p>

                </div>

              );
            }

            if (isAfternoon) {

              return (

                <div
                  key={index}
                  className="bg-orange-50 border border-orange-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-orange-900 mb-3">

                    ☀️ Afternoon

                  </h3>

                  <p className="text-lg text-orange-800 leading-relaxed">

                    {line.replace("Afternoon:", "")}

                  </p>

                </div>

              );
            }

            if (isEvening) {

              return (

                <div
                  key={index}
                  className="bg-purple-50 border border-purple-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-purple-900 mb-3">

                    🌙 Evening

                  </h3>

                  <p className="text-lg text-purple-800 leading-relaxed">

                    {line.replace("Evening:", "")}

                  </p>

                </div>

              );
            }

            if (isHotels) {

              return (

                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-blue-900 mb-3">

                    🏨 Recommended Hotels

                  </h3>

                  <p className="text-lg text-blue-800 leading-relaxed">

                    {cleanedLine
  .split(",")
  .filter((item) => item.trim() !== "")
  .map((item, i) => (
    <p key={i} className="mb-2">
      • {item.trim()}
    </p>
))}

                  </p>

                </div>

              );
            }

            if (isRestaurants) {

              return (

                <div
                  key={index}
                  className="bg-pink-50 border border-pink-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-pink-900 mb-3">

                    🍜 Restaurants & Cafes

                  </h3>

                  <p className="text-lg text-pink-800 leading-relaxed">

                    {cleanedLine
  .split(",")
  .filter((item) => item.trim() !== "")
  .map((item, i) => (
    <p key={i} className="mb-2">
      • {item.trim()}
    </p>
))}

                  </p>

                </div>

              );
            }

            if (isTips) {

              return (

                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-green-900 mb-3">

                    🌍 Travel Tips

                  </h3>

                  <p className="text-lg text-green-800 leading-relaxed">

                    {cleanedLine
  .split(",")
  .filter((item) => item.trim() !== "")
  .map((item, i) => (
    <p key={i} className="mb-2">
      • {item.trim()}
    </p>
))  }

                  </p>

                </div>

              );
            }

            if (isBestTime) {

              return (

                <div
                  key={index}
                  className="bg-cyan-50 border border-cyan-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-cyan-900 mb-3">

                    🌤️ Best Time To Visit

                  </h3>

                  <p className="text-lg text-cyan-800 leading-relaxed">

                    {cleanedLine}

                  </p>

                </div>

              );
            }

            if (isCurrency) {

              return (

                <div
                  key={index}
                  className="bg-emerald-50 border border-emerald-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">

                    💱 Currency

                  </h3>

                  <p className="text-lg text-emerald-800 leading-relaxed">

                    {cleanedLine}

                  </p>

                </div>

              );
            }

            if (isLanguage) {

              return (

                <div
                  key={index}
                  className="bg-indigo-50 border border-indigo-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-indigo-900 mb-3">

                    🗣️ Language

                  </h3>

                  <p className="text-lg text-indigo-800 leading-relaxed">

                    {cleanedLine}

                  </p>

                </div>

              );
            }

            if (isPacking) {

              return (

                <div
                  key={index}
                  className="bg-amber-50 border border-amber-200 rounded-[24px] p-6 shadow-sm"
                >

                  <h3 className="text-2xl font-bold text-amber-900 mb-3">

                    🎒 Packing Checklist

                  </h3>

                  <p className="text-lg text-amber-800 leading-relaxed">

                    {cleanedLine
  .split(",")
  .filter((item) => item.trim() !== "")
  .map((item, i) => (
    <p key={i} className="mb-2">
      • {item.trim()}
    </p>
))}

                  </p>

                </div>

              );
            }

            return (

              <div
                key={index}
                className="bg-white rounded-[24px] p-6 border border-orange-100 shadow-sm"
              >

                <p className="text-lg text-neutral-700 leading-relaxed">

                  {line}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );
}

export default TripDetails;