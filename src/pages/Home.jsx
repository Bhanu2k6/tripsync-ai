import Navbar from "../components/Navbar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();
  const destinations = [
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",

      desc:
        "Romantic streets, luxury cafes, and timeless beauty.",
    },

    {
      name: "Tokyo",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",

      desc:
        "Anime culture, neon nights, and futuristic vibes.",
    },

    {
      name: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4",

      desc:
        "Tropical beaches, peaceful temples, and sunsets.",
    },

    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",

      desc:
        "Beach nightlife, seafood, and hidden coastal gems.",
    },
  ];

  const features = [
    {
      emoji: "🤖",
      title: "AI Powered",
      desc: "Generate personalized itineraries instantly.",
    },

    {
      emoji: "🌍",
      title: "Smart Destinations",
      desc: "Discover hidden gems and local favorites.",
    },

    {
      emoji: "✨",
      title: "Luxury Experience",
      desc: "Beautiful modern travel planning experience.",
    },
  ];

  const handleDestinationClick = (destination) => {

    localStorage.setItem(
      "selectedDestination",
      destination
    );

    navigate("/create-trip");
  };

  return (

    <div className="min-h-screen bg-[#faf7f2]">

      <Navbar />

      {/* HERO */}

      <div
        className="relative h-[78vh] flex items-center justify-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/45"></div>

        {/* CONTENT */}

        <div className="relative z-10 text-center max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">

            Explore The World
            <br />

            <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">

              Smarter With AI

            </span>

          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">

            Personalized itineraries, hidden gems,
            luxury stays, and unforgettable experiences —
            crafted intelligently for you.

          </p>

        </div>

      </div>

      {/* DESTINATIONS */}

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-neutral-800 mb-4">

            Popular Destinations 🌍

          </h2>

          <p className="text-lg text-neutral-500">

            Tap a destination to instantly start planning

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {destinations.map((destination, index) => (

            <div
              key={index}
              onClick={() =>
                handleDestinationClick(destination.name)
              }
              className="group cursor-pointer bg-white/70 backdrop-blur-lg rounded-[30px] overflow-hidden border border-white shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >

              <div className="relative h-60 overflow-hidden">

                {/* WISHLIST BUTTON */}

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    const wishlist =
                      JSON.parse(
                        localStorage.getItem("wishlist")
                      ) || [];

                    const exists =
                      wishlist.find(
                        (item) =>
                          item.destination === destination.name
                      );

                    if (!exists) {

                      wishlist.push({
                        destination: destination.name,
                        image: destination.image,
                        days: "3",
                        budget: "Moderate",
                      });

                      localStorage.setItem(
                        "wishlist",
                        JSON.stringify(wishlist)
                      );

                      alert("❤️ Added to Wishlist");

                    }

                  }}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
                >

                  <Heart
                    size={18}
                    className="text-pink-500 fill-pink-500"
                  />

                </button>

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-neutral-800 mb-3">

                  {destination.name}

                </h3>

                <p className="text-neutral-500 text-base leading-relaxed">

                  {destination.desc}

                </p>

              </div>

            </div>

          ))}

        </div>

        {/* PLAN TRIP */}

        <div className="text-center mt-16">

          <h3 className="text-4xl font-bold text-neutral-800 mb-4">

            Ready To Plan Your Journey?

          </h3>

          <p className="text-lg text-neutral-500 mb-8">

            Let AI create a personalized travel experience for you.

          </p>

          <button
            onClick={() => {
              window.location.href = "/create-trip";
            }}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-5 rounded-3xl text-xl font-bold shadow-xl hover:scale-105 transition"
          >

            ✨ Plan Your Trip

          </button>

        </div>

      </div>

      {/* FEATURES */}

      <div className="bg-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-neutral-800 mb-4">

              Why Choose TripSync AI?

            </h2>

            <p className="text-lg text-neutral-500">

              Experience next-generation travel planning

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => (

              <div
                key={index}
                className="bg-[#faf7f2] rounded-[30px] p-8 text-center border border-orange-100 shadow-sm hover:shadow-xl transition"
              >

                <div className="text-6xl mb-6">
                  {feature.emoji}
                </div>

                <h3 className="text-2xl font-bold text-neutral-800 mb-4">

                  {feature.title}

                </h3>

                <p className="text-lg text-neutral-500 leading-relaxed">

                  {feature.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;