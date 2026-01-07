import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Publications from "./pages/Projects";
import Contact from "./pages/ContactUs"; // if you have it

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Publications />} />
            <Route path="/contact" element={<Contact />} /> {/* Optional */}
            <Route
              path="*"
              element={
                <h1 className="text-center mt-20 text-3xl text-red-600">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
