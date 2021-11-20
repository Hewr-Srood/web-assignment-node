import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SinginPage from "./pages/SinginPage";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<SinginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </div>
  );
}
