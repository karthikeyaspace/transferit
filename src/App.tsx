import React from "react";
import UploadFile from "./pages/UploadFile";
import ViewFile from "./pages/ViewFile";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-900">
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
    </div>
  );
};

export default App;
