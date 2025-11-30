// File: src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // routing utilities
import Login from "./pages/Login";  // Login Page
import Register from "./pages/Register"; // Register Page
import { SearchProvider } from "./context/SearchContext";
import DashboardLayout from "./components/Dashboard"; // Dashboard layout
import "./index.css";               // Tailwind styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard route with nested routing */}

          <Route path="/app/*" element={<DashboardLayout />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
