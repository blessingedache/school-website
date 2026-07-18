import { useEffect, useState } from "react";
import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import footerlogo from "../assets/footer-logo.png";
import "../styles/Footer.css";
import { FooterSkeleton } from "../skeletons";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigationLinks = ["Home", "About Us", "Academics", "Activities", "Contact"];
  const resourceLinks = ["Learning programmes", "Policies & Guidelines", "Academic Programmes", "School Info"];
  const supportLinks = ["Contact Us", "Privacy Policy"];

  if (isLoading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="footer-section">
      <div className="footer-shell">
        <div className="footer-brand">
          <img className="footer-logo" src={footerlogo} alt="Corner Stone Secondary School logo" />
          <p className="footer-brand-text">
            Building confident, capable learners through excellence, support, and community spirit.
          </p>
          
        </div>

        <div>
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            {navigationLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            {resourceLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            {supportLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="footer-socials" aria-label="Social media links">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagramSquare /></a>
            <a href="#" aria-label="Twitter"><FaTwitterSquare /></a>
            <a href="#" aria-label="WhatsApp"><FaSquareWhatsapp /></a>
            <a href="#" aria-label="Email"><MdEmail /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 Corner Stone Secondary School</p>
      </div>
    </footer>
  );
};

export default Footer;