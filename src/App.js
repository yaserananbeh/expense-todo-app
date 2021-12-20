import React, { useState } from "react";
import ToDoPage from "./pages/ToDoPage";
import ExpensesPage from "./pages/ExpensesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ToDoPage />} />
          <Route path="/expense" element={<ExpensesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
