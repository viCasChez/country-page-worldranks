import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CountryRanking, CountryDetail } from "./components";

function App() {
  return (
    <Router basename="/country-page-worldranks">
      <Routes>
        <Route path="/" element={<CountryRanking />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
