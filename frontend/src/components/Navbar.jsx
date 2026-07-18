import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/school logo.png";
import { NavbarSkeleton } from "../skeletons";


const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/activities", label: "Activities" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    setIsOpen(false); // close mobile panel if open
    navigate("/auth/signin");
  };

  const handleSignUp = () => {
    setIsOpen(false);
    navigate("/auth/signup");
  };

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  return (
    <header className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="School logo" className="navbar-logo" />
          <span className="navbar-title">
            Corner Stone
            <br />
            Secondary School
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="navbar-links">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="navbar-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="navbar-actions">
          <button type="button" className="cta-signinn" onClick={handleSignIn}>
            Sign In
          </button>
          <button type="button" className="navbar-cta" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile off-canvas overlay */}
      <div
        className={`navbar-overlay ${isOpen ? "is-visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile off-canvas panel */}
      <aside className={`navbar-panel ${isOpen ? "is-open" : ""}`}>
        <div className="navbar-panel-header">
          <span className="navbar-panel-title">Menu</span>
          <button
            type="button"
            className="navbar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <FaXmark />
          </button>
        </div>

        <ul className="navbar-panel-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="navbar-cta navbar-cta--panel cta-signin"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          type="button"
          className="navbar-cta navbar-cta--panel"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </aside>
    </header>
  );
};

export default Navbar;