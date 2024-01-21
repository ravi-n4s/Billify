import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import EventExpenses from "./pages/EventExpenses";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Events />} />
        <Route path="/events/:eventId/expenses" element={<EventExpenses />} />
        {/* <Route path="/about" component={About} />
                                <Route path="/contact" component={Contact} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
