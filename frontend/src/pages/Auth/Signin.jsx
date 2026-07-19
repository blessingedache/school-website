import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/Signin.css";

// Single source of truth for the backend base URL.
// Set VITE_API_BASE_URL in frontend/.env (local) and frontend/.env.production
// (deployed), and also in Vercel's Environment Variables settings.
// It must already include /api/v1, e.g. https://your-backend.onrender.com/api/v1
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const SIGNIN_URL = `${API_BASE}/login`;

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    if (!API_BASE) {
      setError(
        "Server address is not configured. Please contact the site administrator."
      );
      console.error(
        "VITE_API_BASE_URL is undefined. Check your .env / Vercel environment variables."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // required to receive the httpOnly auth cookie
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || "Login failed.");
      }

      const user = data.user || null;
      if (user) {
        localStorage.setItem("student", JSON.stringify(user));
      }

      navigate("/student/dashboard", { state: { student: user } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="auth-loading" style={{ padding: "2rem", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <section className="signin-page">
      <div className="signin-card">
        <div className="signin-hero">
          <h1>Welcome back</h1>
          <p>
            Sign in to access your student dashboard, view updates, and stay
            connected with your school community.
          </p>
        </div>

        <div className="signin-form-wrap">
          <form className="signin-form" onSubmit={handleSubmit}>
            {error && <p className="signin-error">{error}</p>}

            <div className="signin-field">
              <label className="signin-label" htmlFor="username">
                Username
              </label>
              <div className="signin-input-wrap">
                <FaUserAlt className="signin-icon" />
                <input
                  id="username"
                  name="username"
                  className="signin-input"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signin-field">
              <label className="signin-label" htmlFor="password">
                Password
              </label>
              <div className="signin-input-wrap">
                <FaLock className="signin-icon" />
                <input
                  id="password"
                  name="password"
                  className="signin-input"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="signin-button" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;