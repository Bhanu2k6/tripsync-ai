import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
            path="/"
            element={
              localStorage.getItem("user")
                ? <Home />
                : <Login />
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* CREATE TRIP */}

        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />

        {/* TRIP DETAILS */}

        <Route
          path="/trip-details"
          element={<TripDetails />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;