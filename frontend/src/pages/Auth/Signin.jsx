import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const env =
  (typeof import.meta !== "undefined" && import.meta.env) ||
  (typeof process !== "undefined" ? process.env : {});

const API_BASE_URL = env.VITE_API_URL || env.REACT_APP_API_URL || "http://localhost:5000/api";
const SIGNIN_ENDPOINT =
  env.VITE_SIGNIN_ENDPOINT || env.REACT_APP_SIGNIN_ENDPOINT || "/auth/signin";
const SIGNIN_URL = `${API_BASE_URL}${SIGNIN_ENDPOINT.startsWith("/") ? SIGNIN_ENDPOINT : `/${SIGNIN_ENDPOINT}`}`;

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
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

    if (!formData.identifier.trim() || !formData.password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.identifier.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || "Login failed.");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      const user = data.user || data.student || { username: formData.identifier.trim() };
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
        <h1>Welcome back</h1>
        <p>Sign in to your student account</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          {error && <p className="signin-error">{error}</p>}

          <div className="signin-field">
            <label className="signin-label" htmlFor="identifier">
              Username or Email
            </label>
            <div className="signin-input-wrap">
              <FaUserAlt className="signin-icon" />
              <input
                id="identifier"
                name="identifier"
                className="signin-input"
                type="text"
                placeholder="Enter your username or email"
                value={formData.identifier}
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
    </section>
  );
};

export default Signin;