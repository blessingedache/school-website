import { useEffect, useState } from "react";
import subjectImg1 from "../assets/subject1.jpg";
import subjectImg2 from "../assets/subject2.jpg";
import subjectImg3 from "../assets/subject3.jpg";
import subjectImg4 from "../assets/subject4.jpg";
import subjectImg5 from "../assets/subject5.jpg";
import subjectImg6 from "../assets/subject6.jpg";
import "../styles/Curriculum.css";
import { CurriculumSkeleton } from "../skeletons";

const Curriculum = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const subjects = [
    {
      id: 1,
      image: subjectImg1,
      title: "Computer Science",
      text: "Hands-on experience with the latest programming languages and technology.",
    },
    {
      id: 2,
      image: subjectImg2,
      title: "Fine Arts",
      text: "Giving wings to the artists who’d like to take it up as a career or just a hobby.",
    },
    {
      id: 3,
      image: subjectImg3,
      title: "Humanities",
      text: "The study of ancient and modern languages, philosophy, history, and more.",
    },
    {
      id: 4,
      image: subjectImg4,
      title: "Science",
      text: "The study that encourages scientific reasoning, discoveries and inventions.",
    },
    {
      id: 5,
      image: subjectImg5,
      title: "Mathematics",
      text: "Understanding the game of numbers and logic to solve real-world problems.",
    },
    {
      id: 6,
      image: subjectImg6,
      title: "Languages",
      text: "Learning more modes of communication from different parts of the world.",
    },
  ];

  if (isLoading) {
    return <CurriculumSkeleton />;
  }

  return (
    <section className="curriculum-section" aria-labelledby="curriculum-title">
      <div className="curriculum-shell">
        <div className="curriculum-intro">
          <p className="curriculum-eyebrow">Curriculum Overview</p>
          <h2 id="curriculum-title" className="curriculum-title">
            A balanced learning experience for every learner
          </h2>
          <p className="curriculum-description">
            The Champion School offers a broad and balanced curriculum that combines academic excellence,
            creativity, and personal growth in a supportive environment.
          </p>
          <div className="curriculum-highlights">
            <span className="curriculum-chip">STEM</span>
            <span className="curriculum-chip">Arts</span>
            <span className="curriculum-chip">Languages</span>
            <span className="curriculum-chip">Life Skills</span>
          </div>
        </div>

        <div className="curriculum-grid">
          {subjects.map(({ id, image, title, text }) => (
            <article key={id} className="curriculum-card">
              <img className="curriculum-image" src={image} alt={title} />
              <div className="curriculum-card-body">
                <span className="curriculum-badge">Featured</span>
                <h3 className="curriculum-card-title">{title}</h3>
                <p className="curriculum-card-text">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="curriculum-cta">
          <button type="button" className="curriculum-button">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
