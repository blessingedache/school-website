import { useEffect, useState } from "react";
import academicsImg from "../assets/academics-img-1.jpeg";
import "../styles/Academics.css";
import { AcademicsSkeleton } from "../skeletons";

const Academics = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AcademicsSkeleton />;
  }

  return (
    <section className="academics-section" aria-labelledby="academics-title">
      <div className="academics-shell">
        <div className="academics-content">
          <p className="academics-eyebrow">Empowering future leaders</p>
          <h2 id="academics-title" className="academics-title">
            Explore our learning programmes
          </h2>
          <p className="academics-text">
            At Corner Stone Secondary School, we provide a diverse and enriching academic programme designed to nurture individual potential and prepare students for success in their chosen paths. Covering Key Stage 4 (S1–S3) and Key Stage 5 (Js1–Js3), our curriculum spans sciences, arts, languages, technical education, and more, ensuring a holistic learning experience.
          </p>
          <div className="academics-pills">
            <span className="academics-pill">Science</span>
            <span className="academics-pill">Arts</span>
            <span className="academics-pill">Technology</span>
            <span className="academics-pill">Leadership</span>
          </div>
          <button type="button" className="academics-button">
            Explore our Academic Programmes
          </button>
        </div>

        <div className="academics-media">
          <img className="academics-image" src={academicsImg} alt="Students engaging in academic activities" />
        </div>
      </div>
    </section>
  );
};

export default Academics;
