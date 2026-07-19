import { useEffect, useState } from "react";
import { FaUserAlt, FaLock, FaHome } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { SignupSkeleton } from "../../skeletons";
import "../../styles/Signup.css";

// Single source of truth for the backend base URL.
// Set VITE_API_BASE_URL in frontend/.env (local) and frontend/.env.production
// (deployed), and also in Vercel's Environment Variables settings.
// It must already include /api/v1, e.g. https://your-backend.onrender.com/api/v1
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const SIGNUP_URL = `${API_BASE}/register`;

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    className: "",
    dob: "",
    gender: "",
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill in the required fields.");
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
      // Backend expects multipart/form-data because of the optional avatar upload
      const payload = new FormData();
      payload.append("firstName", formData.firstName.trim());
      payload.append("middleName", formData.middleName.trim());
      payload.append("lastName", formData.lastName.trim());
      payload.append("email", formData.email.trim());
      payload.append("address", formData.address.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("className", formData.className.trim());
      payload.append("dob", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("username", formData.username.trim());
      payload.append("password", formData.password);

      const avatarFile = document.getElementById("avatar")?.files?.[0];
      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        body: payload,
        // Do NOT set Content-Type manually for FormData —
        // the browser sets the correct multipart boundary automatically.
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || "Signup failed.");
      }

      const user = data.student || data.user || null;
      if (user) {
        localStorage.setItem("student", JSON.stringify(user));
      }

      setSuccess(data.message || "Account created successfully.");
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
    return <SignupSkeleton />;
  }

  return (
    <section className="signup-page">
      <div className="signup-card">
        <div className="signup-hero">
          <h1>Create your student account</h1>
          <p>
            Join our school community and start your journey with a welcoming,
            secure registration experience.
          </p>
        </div>

        <div className="signup-form-wrap">
          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <p className="signup-error">{error}</p>}
            {success && <p className="signup-success">{success}</p>}

            <div className="signup-field">
              <label className="signup-label" htmlFor="firstName">
                First Name
              </label>
              <div className="signup-input-wrap">
                <FaUserAlt className="signup-icon" />
                <input
                  id="firstName"
                  name="firstName"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="middleName">
                Middle Name
              </label>
              <div className="signup-input-wrap">
                <FaUserAlt className="signup-icon" />
                <input
                  id="middleName"
                  name="middleName"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your middle name"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="lastName">
                Last Name
              </label>
              <div className="signup-input-wrap">
                <FaUserAlt className="signup-icon" />
                <input
                  id="lastName"
                  name="lastName"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="email">
                Email Address
              </label>
              <div className="signup-input-wrap">
                <BiLogoGmail className="signup-icon" />
                <input
                  id="email"
                  name="email"
                  className="signup-input"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-field full">
              <label className="signup-label" htmlFor="address">
                Home Address
              </label>
              <div className="signup-input-wrap">
                <FaHome className="signup-icon" />
                <input
                  id="address"
                  name="address"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your home address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="phone">
                Phone Number
              </label>
              <div className="signup-input-wrap">
                <BsFillTelephoneFill className="signup-icon" />
                <input
                  id="phone"
                  name="phone"
                  className="signup-input"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="className">
                Class
              </label>
              <div className="signup-input-wrap">
                <SiGoogleclassroom className="signup-icon" />
                <input
                  id="className"
                  name="className"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your class"
                  value={formData.className}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="dob">
                Date of Birth
              </label>
              <div className="signup-input-wrap">
                <LiaBirthdayCakeSolid className="signup-icon" />
                <input
                  id="dob"
                  name="dob"
                  className="signup-input"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="signup-field full">
              <label className="signup-label">Gender</label>
              <div className="signup-radio-group">
                <label className="signup-radio">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="signup-radio">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="signup-field full">
              <label className="signup-label" htmlFor="avatar">
                Upload your picture
              </label>
              <input
                id="avatar"
                name="avatar"
                className="signup-file"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
              />
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="username">
                Username
              </label>
              <div className="signup-input-wrap">
                <FaUserAlt className="signup-icon" />
                <input
                  id="username"
                  name="username"
                  className="signup-input"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-field">
              <label className="signup-label" htmlFor="password">
                Password
              </label>
              <div className="signup-input-wrap">
                <FaLock className="signup-icon" />
                <input
                  id="password"
                  name="password"
                  className="signup-input"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-actions">
              <button type="submit" className="signup-button" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;