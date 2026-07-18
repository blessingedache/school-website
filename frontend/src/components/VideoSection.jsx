import { useEffect, useState } from "react";
import schoolVideoImg from "../assets/schoolvideoimg.jpg";
import "../styles/VideoSection.css";
import { VideoSectionSkeleton } from "../skeletons";

const videoUrl = "https://player.vimeo.com/video/172601404?autoplay=1";

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    setShowVideo(true);
  };

  if (isLoading) {
    return <VideoSectionSkeleton />;
  }

  return (
    <section className="video-section" aria-labelledby="video-section-title">
      <div className="video-section__inner">
        <div className="video-section__content">
          <p className="video-section__eyebrow">Discover our school</p>
          <h2 id="video-section-title" className="video-section__title">
            A welcoming learning environment that inspires growth
          </h2>
          <p className="video-section__text">
            Take a closer look at our vibrant school community, our learners, and the values that shape every experience.
          </p>
          <div className="video-section__pill-list">
            <span className="video-section__pill">Academic Excellence</span>
            <span className="video-section__pill">Student Support</span>
            <span className="video-section__pill">Community Spirit</span>
          </div>
        </div>

        <div className="video-section__media">
          {!showVideo ? (
            <div className="video-section__preview" onClick={handlePlay} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && handlePlay()}>
              <img src={schoolVideoImg} alt="School community preview" />
              <div className="video-section__overlay">
                <button className="video-section__play-btn" aria-label="Play video" type="button">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="video-section__frame"
              title="School video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;