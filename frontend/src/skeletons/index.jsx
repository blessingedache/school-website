import "./Skeleton.css";

const SkeletonBlock = ({ className = "", height = "1rem", width = "100%", style = {}, rounded = false }) => (
  <div
    className={`skeleton skeleton-block ${rounded ? "skeleton-rounded" : ""} ${className}`.trim()}
    style={{ height, width, ...style }}
  />
);

const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`skeleton-col ${className}`.trim()}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBlock
        key={index}
        height={index === lines - 1 ? "0.9rem" : "0.8rem"}
        width={index === lines - 1 ? "70%" : "100%"}
      />
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div className="skeleton-row" style={{ alignItems: "flex-start" }}>
      <div className="skeleton-col" style={{ flex: 1 }}>
        <SkeletonBlock width="35%" height="0.9rem" rounded />
        <SkeletonBlock width="80%" height="1.6rem" />
        <SkeletonText lines={4} />
        <div className="skeleton-row" style={{ marginTop: "0.3rem" }}>
          <SkeletonBlock width="8rem" height="2.3rem" rounded />
          <SkeletonBlock width="8rem" height="2.3rem" rounded />
        </div>
      </div>
      <div className="skeleton-media" style={{ maxWidth: "320px", minHeight: "240px" }} />
    </div>
  </section>
);

export const NavbarSkeleton = () => (
  <div className="skeleton-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 1rem" }}>
    <SkeletonBlock width="8rem" height="1rem" />
    <div className="skeleton-row" style={{ width: "50%", justifyContent: "flex-end" }}>
      <SkeletonBlock width="4rem" height="0.9rem" rounded />
      <SkeletonBlock width="4rem" height="0.9rem" rounded />
      <SkeletonBlock width="4rem" height="0.9rem" rounded />
    </div>
  </div>
);

export const AboutSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div className="skeleton-row" style={{ alignItems: "flex-start" }}>
      <div className="skeleton-col" style={{ flex: 1 }}>
        <SkeletonBlock width="30%" height="0.9rem" rounded />
        <SkeletonBlock width="70%" height="1.4rem" />
        <SkeletonText lines={5} />
      </div>
      <div className="skeleton-media" style={{ maxWidth: "320px", minHeight: "220px" }} />
    </div>
  </section>
);

export const AcademicsSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div className="skeleton-row" style={{ alignItems: "flex-start" }}>
      <div className="skeleton-col" style={{ flex: 1 }}>
        <SkeletonBlock width="25%" height="0.8rem" rounded />
        <SkeletonBlock width="70%" height="1.4rem" />
        <SkeletonText lines={5} />
        <SkeletonBlock width="11rem" height="2.3rem" rounded />
      </div>
      <div className="skeleton-media" style={{ maxWidth: "360px", minHeight: "250px" }} />
    </div>
  </section>
);

export const CurriculumSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <SkeletonBlock width="35%" height="0.9rem" rounded />
    <SkeletonBlock width="60%" height="1.4rem" />
    <SkeletonText lines={3} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.8rem", marginTop: "1rem" }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-media" style={{ height: "140px" }} />
          <div className="skeleton-col" style={{ marginTop: "0.8rem" }}>
            <SkeletonBlock width="60%" height="0.9rem" />
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const HeadteacherSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div className="skeleton-row" style={{ alignItems: "center" }}>
      <div className="skeleton-media" style={{ maxWidth: "180px", minHeight: "180px", borderRadius: "50%" }} />
      <div className="skeleton-col" style={{ flex: 1 }}>
        <SkeletonBlock width="40%" height="0.9rem" rounded />
        <SkeletonBlock width="70%" height="1.3rem" />
        <SkeletonText lines={4} />
      </div>
    </div>
  </section>
);

export const SchooldriveSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <SkeletonBlock width="35%" height="0.9rem" rounded />
    <SkeletonBlock width="60%" height="1.3rem" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.8rem", marginTop: "1rem" }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <SkeletonBlock width="2.4rem" height="2.4rem" rounded />
          <SkeletonBlock width="70%" height="0.95rem" style={{ marginTop: "0.8rem" }} />
          <SkeletonText lines={3} />
        </div>
      ))}
    </div>
  </section>
);

export const SchoolSlideSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <SkeletonBlock width="40%" height="0.9rem" rounded />
    <SkeletonBlock width="60%" height="1.3rem" />
    <div className="skeleton-media" style={{ marginTop: "1rem", height: "280px" }} />
  </section>
);

export const VideoSectionSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div className="skeleton-row" style={{ alignItems: "flex-start" }}>
      <div className="skeleton-col" style={{ flex: 1 }}>
        <SkeletonBlock width="30%" height="0.9rem" rounded />
        <SkeletonBlock width="75%" height="1.3rem" />
        <SkeletonText lines={4} />
      </div>
      <div className="skeleton-media" style={{ maxWidth: "360px", minHeight: "240px" }} />
    </div>
  </section>
);

export const NumberCounterSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "0.8rem" }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <SkeletonBlock width="60%" height="1.3rem" />
          <SkeletonBlock width="80%" height="0.85rem" style={{ marginTop: "0.8rem" }} />
        </div>
      ))}
    </div>
  </section>
);

export const QuotesSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.4rem" }}>
    <SkeletonBlock width="10%" height="1rem" rounded />
    <SkeletonBlock width="95%" height="1rem" style={{ marginTop: "0.8rem" }} />
    <SkeletonBlock width="88%" height="1rem" style={{ marginTop: "0.6rem" }} />
    <SkeletonBlock width="30%" height="0.9rem" style={{ marginTop: "0.9rem" }} />
  </section>
);

export const NewsletterSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <SkeletonBlock width="40%" height="1.2rem" style={{ margin: "0 auto" }} />
    <SkeletonText lines={3} className="" />
    <SkeletonBlock width="12rem" height="2.3rem" rounded style={{ marginTop: "0.8rem" }} />
  </section>
);

export const FooterSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.7fr", gap: "1rem" }}>
      <div className="skeleton-col">
        <SkeletonBlock width="60%" height="1.1rem" />
        <SkeletonText lines={4} />
      </div>
      <div className="skeleton-col">
        <SkeletonBlock width="50%" height="0.9rem" />
        <SkeletonText lines={4} />
      </div>
      <div className="skeleton-col">
        <SkeletonBlock width="50%" height="0.9rem" />
        <SkeletonText lines={3} />
      </div>
      <div className="skeleton-col">
        <SkeletonBlock width="50%" height="0.9rem" />
        <SkeletonText lines={2} />
      </div>
    </div>
  </section>
);

export const SigninSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ width: "min(100%, 960px)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "0.5rem" }}>
      <div className="skeleton-card" style={{ padding: "1.4rem", background: "#f7f9fc" }}>
        <SkeletonBlock width="35%" height="0.9rem" rounded />
        <SkeletonBlock width="85%" height="1.25rem" style={{ marginTop: "0.8rem" }} />
        <SkeletonText lines={3} className="" />
      </div>
      <div className="skeleton-card" style={{ padding: "1.4rem", background: "#f7f9fc" }}>
        <SkeletonBlock width="30%" height="0.9rem" rounded />
        <SkeletonBlock height="2.8rem" style={{ marginTop: "0.8rem" }} rounded />
        <SkeletonBlock height="2.8rem" style={{ marginTop: "0.8rem" }} rounded />
        <div className="skeleton-row" style={{ marginTop: "0.8rem", justifyContent: "space-between" }}>
          <SkeletonBlock width="35%" height="0.9rem" rounded />
          <SkeletonBlock width="35%" height="0.9rem" rounded />
        </div>
        <SkeletonBlock height="2.9rem" style={{ marginTop: "0.8rem" }} rounded />
      </div>
    </div>
  </section>
);

export const SignupSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ width: "min(100%, 980px)", margin: "0 auto" }}>
      <div className="skeleton-card" style={{ padding: "1.3rem", background: "#f7f9fc" }}>
        <SkeletonBlock width="40%" height="0.9rem" rounded />
        <SkeletonBlock width="75%" height="1.2rem" style={{ marginTop: "0.8rem" }} />
        <SkeletonText lines={2} />
      </div>
      <div className="skeleton-card" style={{ padding: "1.2rem", marginTop: "1rem", background: "#f7f9fc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.8rem" }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-col">
              <SkeletonBlock width="35%" height="0.8rem" rounded />
              <SkeletonBlock height="2.7rem" style={{ marginTop: "0.45rem" }} rounded />
            </div>
          ))}
        </div>
        <SkeletonBlock height="2.9rem" width="10rem" style={{ marginTop: "1rem" }} rounded />
      </div>
    </div>
  </section>
);

export const DashboardSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ width: "min(100%, 1120px)", margin: "0 auto" }}>
      <div className="skeleton-card" style={{ padding: "1.3rem", background: "#f7f9fc" }}>
        <SkeletonBlock width="20%" height="0.9rem" rounded />
        <SkeletonBlock width="70%" height="1.2rem" style={{ marginTop: "0.8rem" }} />
        <SkeletonText lines={2} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1rem", marginTop: "1rem" }}>
        <div className="skeleton-card" style={{ padding: "1.1rem", background: "#f7f9fc" }}>
          <SkeletonBlock width="35%" height="0.95rem" />
          <div className="skeleton-row" style={{ marginTop: "0.8rem", alignItems: "center" }}>
            <div className="skeleton-media" style={{ width: "58px", height: "58px", borderRadius: "50%" }} />
            <div className="skeleton-col" style={{ flex: 1 }}>
              <SkeletonBlock width="60%" height="1rem" />
              <SkeletonBlock width="40%" height="0.85rem" style={{ marginTop: "0.45rem" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.7rem", marginTop: "0.9rem" }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton-col">
                <SkeletonBlock width="45%" height="0.8rem" rounded />
                <SkeletonBlock height="2.2rem" style={{ marginTop: "0.45rem" }} rounded />
              </div>
            ))}
          </div>
        </div>
        <div className="skeleton-card" style={{ padding: "1.1rem", background: "#f7f9fc" }}>
          <SkeletonBlock width="35%" height="0.95rem" />
          <SkeletonText lines={4} className="" />
          <SkeletonBlock height="2.2rem" style={{ marginTop: "0.8rem" }} rounded />
          <SkeletonBlock height="2.2rem" style={{ marginTop: "0.6rem" }} rounded />
        </div>
      </div>
    </div>
  </section>
);

export const ProfileSkeleton = () => (
  <section className="skeleton-card" style={{ margin: "1rem 0", padding: "1.2rem" }}>
    <div style={{ width: "min(100%, 1000px)", margin: "0 auto" }}>
      <div className="skeleton-card" style={{ padding: "1.2rem", background: "#f7f9fc" }}>
        <SkeletonBlock width="25%" height="0.9rem" rounded />
        <SkeletonBlock width="60%" height="1.2rem" style={{ marginTop: "0.8rem" }} />
        <SkeletonText lines={2} />
      </div>
      <div className="skeleton-card" style={{ padding: "1.2rem", marginTop: "1rem", background: "#f7f9fc" }}>
        <div className="skeleton-row" style={{ alignItems: "center" }}>
          <div className="skeleton-media" style={{ width: "74px", height: "74px", borderRadius: "50%" }} />
          <div className="skeleton-col" style={{ flex: 1 }}>
            <SkeletonBlock width="40%" height="1rem" />
            <SkeletonBlock width="30%" height="0.85rem" style={{ marginTop: "0.45rem" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.8rem", marginTop: "1rem" }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton-col">
              <SkeletonBlock width="45%" height="0.8rem" rounded />
              <SkeletonBlock height="2.2rem" style={{ marginTop: "0.45rem" }} rounded />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default {
  HeroSkeleton,
  NavbarSkeleton,
  AboutSkeleton,
  AcademicsSkeleton,
  CurriculumSkeleton,
  HeadteacherSkeleton,
  SchooldriveSkeleton,
  SchoolSlideSkeleton,
  VideoSectionSkeleton,
  NumberCounterSkeleton,
  QuotesSkeleton,
  NewsletterSkeleton,
  FooterSkeleton,
  SigninSkeleton,
  SignupSkeleton,
  DashboardSkeleton,
  ProfileSkeleton,
};
