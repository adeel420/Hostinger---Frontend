import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./page/Login";
import Signup from "./page/Signup";
import About from "./page/About";
import Services from "./page/Services";
import Contact from "./page/Contact";
import Hosting from "./page/Hosting";
import Domain from "./page/Domain";
import Checkout from "./page/Checkout";
import Admin_Dashboard from "./page/Admin_Dashboard";
import AuthSuccess from "./page/AuthSuccess";
import VerifyOtp from "./page/VerifyOtp";

function App() {
  const location = useLocation();
  const hideHeaderAndFooter = [
    "/login",
    "/signup",
    "/admin_dashboard",
    "/auth/success",
    "/verify-otp",
  ];
  const hideHeaderAndFooterPaths = hideHeaderAndFooter.includes(
    location.pathname,
  );
  return (
    <>
      {!hideHeaderAndFooterPaths && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
      {!hideHeaderAndFooterPaths && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
