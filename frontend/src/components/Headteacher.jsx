import { useEffect, useState } from "react";
import headteacherImg from "../assets/proprietor.png";
import "../styles/Headteacher.css";
import { HeadteacherSkeleton } from "../skeletons";

const Headteacher = ({
  name = "MR. EMMANUEL ANDREW ADAH",
  role = "Proprietor",
  title = "Welcome to Corner Stone Secondary School",
  intro = "At Corner Stone, we are committed to fostering academic excellence, personal growth, and strong community values in all our students from Js1 to Ss3. Our culture is shaped by Respect, Responsibility, and Discipline, and we continue to prepare young people to become confident, responsible citizens.",
  highlights = [
    "A values-driven learning environment",
    "Strong academic and leadership development",
    "Focused on excellence, discipline, and service",
  ],
  ctaLabel = "Explore Our School",
  ctaHref = "#about",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HeadteacherSkeleton />;
  }

  return (
    <section className="headteacher-section" aria-labelledby="headteacher-title">
      <div className="headteacher-shell">
        <div className="headteacher-visual">
          <div className="headteacher-image-card">
            <span className="headteacher-badge">School Leadership</span>
            <img className="headteacher-image" src={headteacherImg} alt={name} />
          </div>
        </div>

        <div className="headteacher-content">
          <p className="headteacher-eyebrow">Message from the Head</p>
          <h2 id="headteacher-title" className="headteacher-title">
            {title}
          </h2>
          <p className="headteacher-intro">{intro}</p>

          <ul className="headteacher-highlights" aria-label="School values and priorities">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="headteacher-signature">
            <h3>{name}</h3>
            <p>{role}</p>
          </div>

          <a className="headteacher-cta" href={ctaHref}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Headteacher;
