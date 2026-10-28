import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import UserDetails from "./Pages/UserDetails";
import NotFound from "./Pages/NotFound";

/**
 * ============================================================================
 * ROOT APPLICATION COMPONENT
 * ============================================================================
 * Developer: Neel Darji | Applen Solutions
 * 
 * Routing Map:
 *   - '/'           -> Home (Landing page with overview, features & data flow)
 *   - '/users'      -> Dashboard (Users directory with search, filter & pagination)
 *   - '/users/:id'  -> UserDetails (Dedicated detail page for user profile)
 *   - '*'           -> NotFound (Graceful 404 fallback page)
 * ============================================================================
 */
function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Application Routes */}
      <Routes>
        {/* Home / Overview Page */}
        <Route path="/" element={<Home />} />

        {/* Users Directory Listing Page */}
        <Route path="/users" element={<Dashboard />} />

        {/* Individual User Profile Detail Page */}
        <Route path="/users/:id" element={<UserDetails />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
