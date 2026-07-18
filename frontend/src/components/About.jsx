import { useEffect, useState } from "react";
import { AboutSkeleton } from "../skeletons";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AboutSkeleton />;
  }

  return (
    <section style={{ padding: "2rem 1rem" }}>
      <h2>About Corner Stone Secondary School</h2>
      <p>We are committed to providing a nurturing environment for academic growth and personal development.</p>
    </section>
  );
};

export default About;
