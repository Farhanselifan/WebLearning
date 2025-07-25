import React from "react";
import Header from "./Component/Header";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LearningProcess from "./Component/LearningProcess"
import FrontExercise from "./Component/FrontExercise"
import "./index.css"


// Active link highlighting (optional)
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-6 py-3 text-2xl font-mono font-semibold rounded-lg shadow transition duration-300 ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-blue-100 text-blue-800"
      }`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-amber-100">
        <Header />

        <main className="flex flex-col items-center justify-center px-4 py-10">
          <nav className="flex gap-6 mb-8">
            <NavLink to="/">Learning Process</NavLink>
            <NavLink to="/Front">Frontend Exercise</NavLink>
          </nav>

          <section className="w-full max-w-5xl p-6 bg-white rounded-xl shadow-lg">
            <Routes>
              <Route path="/" element={<LearningProcess />} />
              <Route path="/Front" element={<FrontExercise />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
};


export default App;