import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Headteacher from "./components/Headteacher.jsx";
import Schooldrive from "./components/Schooldrive.jsx";
import NumberCounter from "./components/NumberCounter.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Quotes from "./components/Quotes.jsx";
import Curriculum from "./components/Curriculum.jsx";
import SchoolSlide from "./components/SchoolSlide.jsx";
import Academics from "./components/Academics.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import Signin from './pages/Auth/Signin.jsx';
import Signup from './pages/Auth/Signup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import Dashboard from './pages/Student/Dashboard.jsx';
import Profile from './pages/Student/Profile.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <><Hero />
            <Headteacher />
            <Schooldrive />
            <NumberCounter />
            <VideoSection />
            <Quotes />
            <Curriculum />
            <SchoolSlide />
            <Academics />
            <Newsletter />
            <Footer/></>} />
        <Route path="/about" element={<>
        <Hero />
        <Headteacher />
        <Schooldrive />
        <VideoSection />
        <Quotes />
        <Newsletter />
        <Footer/></>} />
        <Route path="/academics" element={<>
        <Hero />
        <Schooldrive />
        <NumberCounter />
        <VideoSection />
        <Quotes />
        <Curriculum />
        <Newsletter />
        <Footer/></>} />
        <Route path="/activities" element={<>
        <Schooldrive />
        <SchoolSlide />
        <Newsletter />
        <Footer/></>} />
        <Route path="/contact" element={<>
        <Hero />
        <Newsletter />
        <Footer/></>} />
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/student/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
