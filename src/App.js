import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setNavigate } from "./NavigationService";

function App() {
  return (
    <>
      <AppRouter setNavigate={setNavigate} />
      <ToastContainer />
    </>
  );
}

export default App;
