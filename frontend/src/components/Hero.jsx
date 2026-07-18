import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroImg3 from "../assets/hero3.jpg";
import heroImg4 from "../assets/hero4.jpg";
import { HeroSkeleton } from "../skeletons";


const HERO_SLIDES = [
  {
    id: 1,
    title: "WELCOME TO CORNER STONE SECONDARY SCHOOL",
    subtitle:
      "Discover a nurturing environment where education and community come together. At Corner Stone <br /> Secondary School, we empower students to excel academically and socially in modern facilities",
    btn1: "SIGN IN",
    btn2: "SIGN UP",
    image: heroImg1,
  },
  {
    id: 2,
    title: "NURTURING GROWTH AND SUSTAINABILITY",
    subtitle:
      "We teach students the importance of caring for the environment through hands-on activities like tree <br /> planting. Together, we shape a greener future.",
    btn1: "SIGN IN",
    btn2: "SIGN UP",
    image: heroImg2,
  },
  {
    id: 3,
    title: "WELCOME TO CORNER STONE SECONDARY SCHOOL",
    subtitle: "We empower students to excel academically and socially in modern facilities",
    btn1: "SIGN IN",
    btn2: "SIGN UP",
    image: heroImg3,
  },
  {
    id: 4,
    title: "CELEBRATING DIVERSITY AND CULTURE",
    subtitle:
      "Our vibrant cultural activities inspire creativity and pride in tradition. Experience how we honor <br /> diversity through enriching performances and events",
    btn1: "SIGN IN",
    btn2: "SIGN UP",
    image: heroImg4,
  },
];

const AUTOPLAY_INTERVAL = 6000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);
  const slideCount = HERO_SLIDES.length;
  const navigate = useNavigate();

  const goTo = useCallback(
    (index) => {
      setCurrent((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const handleSignIn = () => navigate("/auth/signin");
  const handleSignUp = () => navigate("/auth/signup");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current, isPaused, slideCount]);

  const activeSlide = HERO_SLIDES[current];

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Horizontal image track */}
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div className="hero-slide" key={slide.id}>
            <img
              src={slide.image}
              alt=""
              className={`hero-image ${index === current ? "is-active" : ""}`}
            />
            <div className="hero-overlay" />
          </div>
        ))}
      </div>

      {/* Content, re-animates vertically on every slide change */}
      <div className="hero-content-wrapper">
        <div className="hero-content" key={activeSlide.id}>
          <h1 className="hero-title">{activeSlide.title}</h1>
          <p
            className="hero-subtitle"
            dangerouslySetInnerHTML={{ __html: activeSlide.subtitle }}
          />
          <div className="hero-btn">
            <button type="button" className="hero-btn-primary" onClick={handleSignIn}>
              {activeSlide.btn1}
            </button>
            <button type="button" className="hero-btn-secondary" onClick={handleSignUp}>
              {activeSlide.btn2}
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        className="hero-arrow hero-arrow-left"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-right"
        onClick={goNext}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="hero-dots">
        {HERO_SLIDES.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            className={`hero-dot ${index === current ? "is-active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current}
          />
        ))}
      </div>

      {/* Auto-play progress indicator, restarts on every slide change */}
      <div className="hero-progress-track">
        <div
          key={current}
          className="hero-progress-bar"
          style={{
            animationDuration: `${AUTOPLAY_INTERVAL}ms`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;