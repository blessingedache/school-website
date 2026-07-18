import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "../styles/Quotes.css";
import { QuotesSkeleton } from "../skeletons";

const Quotes = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <QuotesSkeleton />;
  }

  return (
    <section className="quotes-section" aria-label="School quote">
      <div className="quotes-container">
        <FaQuoteLeft className="quotes-mark" />
        <h2 className="quotes-text">
          We aim at inspiring our students to dream more, learn more, do more, and become more in their respective journeys of life.
        </h2>
        <FaQuoteRight className="quotes-mark" />
        <p className="quotes-author">Jonathan Doe — Headmaster</p>
      </div>
    </section>
  );
};

export default Quotes;