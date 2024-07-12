import React from "react";
import UploadFile from "./pages/UploadFile";
import ViewFile from "./pages/ViewFile";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-stone-800 flex flex-col justify-between">
      <Toaster />
      <div className="absolute top-4 left-2">
        <img src="logo.png" alt="" className="w-32 -rotate-[20deg]"/>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<UploadFile />} />
          <Route path="/:id" element={<ViewFile />} />
        </Routes>
      </Router>

      <div className="w-full">
        <p className="text-center text-xs mx-auto my-1 text-gray-400">
          Built by{" "}
          <a href="https://kv3.vercel.app" target="_blank" className="text-blue-400 italic">
            karthikeya
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
