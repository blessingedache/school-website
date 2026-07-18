import { useEffect, useState } from "react";
import "../styles/NumberCounter.css";
import { NumberCounterSkeleton } from "../skeletons";

const stats = [
  { value: 2000, suffix: "+", label: "Current Enrolment", formatter: (value) => `${Math.round(value / 1000)}K+` },
  { value: 90, suffix: "+", label: "Qualified Staff", formatter: (value) => `${value}+` },
  { value: 90, suffix: "+", label: "Academics & Activities", formatter: (value) => `${value}+` },
  { value: 100, suffix: "+", label: "Active PTFA Members", formatter: (value) => `${value}+` },
];

const NumberCounter = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((stat) => Math.round(stat.value * eased))
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (isLoading) {
    return <NumberCounterSkeleton />;
  }

  return (
    <section className="numbercounter-section" aria-label="School statistics">
      <div className="numbercounter-wrapper">
        {stats.map((stat, index) => (
          <article key={stat.label} className="numbercounter-card">
            <h1 className="numbercounter-value">{stat.formatter(counts[index])}</h1>
            <p className="numbercounter-label">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NumberCounter;