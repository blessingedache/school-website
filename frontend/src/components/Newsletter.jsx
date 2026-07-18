import { useEffect, useState } from "react";
import "../styles/Newsletter.css";
import { NewsletterSkeleton } from "../skeletons";

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <NewsletterSkeleton />;
  }

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="newsletter-card">
        <h2 id="newsletter-title" className="newsletter-title">
          Get in touch
        </h2>
        <p className="newsletter-text">
          We invite you to contact us for more information about our programmes or to schedule a visit to our school. Our team is ready to assist you with any inquiries you may have.
        </p>
        <button type="button" className="newsletter-button">
          Reach Out Now
        </button>
      </div>
    </section>
  );
};

export default Newsletter;