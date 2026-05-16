import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  signInWithGoogle,
  getGoogleRedirectResult,
} from "../services/authService";

function Login() {

  const navigate = useNavigate();
  useEffect(() => {

  const checkLogin = async () => {

    const user =
      await getGoogleRedirectResult();

    if (user) {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/");

    }

  };

  checkLogin();

}, []);
  const handleGoogleLogin = async () => {

    const user = await signInWithGoogle();

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    navigate("/");
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/45"></div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-lg bg-white/20 backdrop-blur-xl border border-white/20 rounded-[34px] p-10 shadow-2xl text-center">

        <div className="text-6xl mb-6">
          ✈️
        </div>

        <h1 className="text-5xl font-bold text-white mb-5 leading-tight">

          Welcome to

          <br />

          <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">

            TripSync AI

          </span>

        </h1>

        <p className="text-white/90 text-lg leading-relaxed mb-10">

          Your intelligent travel companion
          for unforgettable adventures.

        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-neutral-800 py-5 rounded-3xl text-xl font-bold shadow-xl hover:scale-105 transition"
        >

          ✨ Start Exploring

        </button>

        <p className="text-white/70 mt-5 text-sm">

          Secure sign-in powered by Google

        </p>

      </div>

    </div>

  );
}

export default Login;