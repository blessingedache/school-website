import { useEffect, useState } from "react";
import slideImg1 from "../assets/slide1.jpg";
import { SchoolSlideSkeleton } from "../skeletons";
import slideImg2 from "../assets/slide2.jpg";
import slideImg3 from "../assets/slide3.jpg";
import slideImg4 from "../assets/slide4.jpg";
import slideImg5 from "../assets/slide5.jpg";
import slideImg6 from "../assets/slide6.jpg";
import slideImg7 from "../assets/slide7.jpg";
import slideImg8 from "../assets/slide8.jpg";
import slideImg9 from "../assets/slide9.jpeg";
import slideImg10 from "../assets/slide10.jpg";
import "../styles/SchoolSlide.css";

const SchoolSlide = () => {
  const imgSlides = [
    { id: 1, image: slideImg1 },
    { id: 2, image: slideImg2 },
    { id: 3, image: slideImg3 },
    { id: 4, image: slideImg4 },
    { id: 5, image: slideImg5 },
    { id: 6, image: slideImg6 },
    { id: 7, image: slideImg7 },
    { id: 8, image: slideImg8 },
    { id: 9, image: slideImg9 },
    { id: 10, image: slideImg10 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imgSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imgSlides.length]);

  if (isLoading) {
    return <SchoolSlideSkeleton />;
  }

  return (
    <section className="schoolslide-section" aria-label="School gallery">
      <div className="schoolslide-shell">
        <div className="schoolslide-header">
          <p className="schoolslide-eyebrow">Together we thrive</p>
          <h3 className="schoolslide-title">Our vibrant school community</h3>
          <p className="schoolslide-subtitle">
            A glimpse into the energy, creativity, and spirit that make our school special.
          </p>
        </div>

        <div className="schoolslide-carousel">
          <div
            className="schoolslide-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {imgSlides.map(({ id, image }) => (
              <div key={id} className="schoolslide-slide">
                <img src={image} alt={`School slide ${id}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="schoolslide-controls" aria-label="Carousel pagination">
          {imgSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`schoolslide-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolSlide;
