import { useEffect, useState } from "react";
import { FaBinoculars } from "react-icons/fa";
import { MdOutlineEmojiFlags } from "react-icons/md";
import { GiMedievalGate } from "react-icons/gi";
import "../styles/Schooldrive.css";
import { SchooldriveSkeleton } from "../skeletons";

const Schooldrive = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const schoolDrive = [
    {
      id: 1,
      icon: <FaBinoculars />,
      title: "Our Mission",
      text: "To provide a supportive educational environment that inspires learning, celebrates success, and shapes students into accomplished and responsible citizens.",
    },
    {
      id: 2,
      icon: <MdOutlineEmojiFlags />,
      title: "Our Vision",
      text: "To be a leading school that empowers students to reach their full potential, fostering lifelong learning and meaningful contributions to society.",
    },
    {
      id: 3,
      icon: <GiMedievalGate />,
      title: "Our Core Values",
      text: "To promote respect, responsibility, and discipline as the foundation of an inclusive, positive, supportive, and thriving, successful learning community.",
    },
  ];

  if (isLoading) {
    return <SchooldriveSkeleton />;
  }

  return (
    <section className="schooldrive-section" aria-labelledby="schooldrive-title">
      <div className="schooldrive-wrapper">
        <div className="schooldrive-intro">
          <p className="schooldrive-eyebrow">What shapes us</p>
          <h2 id="schooldrive-title" className="schooldrive-title">
            A school guided by purpose, vision, and values
          </h2>
          <p className="schooldrive-subtitle">
            We believe every learner deserves a warm, inspiring, and future-focused environment.
          </p>
        </div>

        <div className="schooldrive-grid">
          {schoolDrive.map(({ id, icon, title, text }) => (
            <article key={id} className="schooldrive-card">
              <div className="schooldrive-icon-wrap" aria-hidden="true">
                <span className="schooldrive-icon">{icon}</span>
              </div>
              <h3 className="schooldrive-card-title">{title}</h3>
              <p className="schooldrive-card-text">{text}</p>
            </article>
          ))}
        </div>

        <div className="schooldrive-actions">
          <button type="button" className="schooldrive-button">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schooldrive;
