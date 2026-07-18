import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-hero">
          <h1>Reset your password</h1>
          <p>Enter the email linked to your student account and we’ll guide you through the next steps.</p>
        </div>

        <div className="forgot-form-wrap">
          {submitted ? (
            <div className="forgot-success">
              <h2>Check your inbox</h2>
              <p>If an account exists for {email || "that email"}, you’ll receive reset instructions shortly.</p>
              <Link className="forgot-link" to="/auth/signin">Back to sign in</Link>
            </div>
          ) : (
            <form className="forgot-form" onSubmit={handleSubmit}>
              <div className="forgot-field">
                <label className="forgot-label" htmlFor="email">Email Address</label>
                <div className="forgot-input-wrap">
                  <MdEmail className="forgot-icon" />
                  <input
                    id="email"
                    name="email"
                    className="forgot-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="forgot-button">Send reset link</button>
              <Link className="forgot-link" to="/auth/signin">Return to sign in</Link>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;