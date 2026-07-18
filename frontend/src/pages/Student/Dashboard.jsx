import { useEffect, useMemo, useState } from "react";
import { FaUserGraduate, FaBook, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdSchool } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { DashboardSkeleton } from "../../skeletons";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const studentData = useMemo(() => {
    return location.state?.student || null;
  }, [location.state]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (studentData) {
        setStudent(studentData);
      } else {
        setStudent({
          firstName: "Ava",
          middleName: "M.",
          lastName: "Johnson",
          email: "ava.johnson@school.edu",
          address: "12 River Road",
          phone: "+1 555 6789",
          className: "Grade 10 - Science",
          dob: "2009-04-15",
          gender: "Female",
          username: "avaj",
        });
      }
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [studentData]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!student) {
    return null;
  }

  const fullName = `${student.firstName || "Student"} ${student.middleName ? student.middleName + " " : ""}${student.lastName || ""}`.trim();

  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-hero">
          <div>
            <p className="dashboard-tag">Student dashboard</p>
            <h1>Welcome back, {fullName}</h1>
            <p>Here is a quick overview of your academic profile and school activity.</p>
          </div>
          <div className="dashboard-badge">{student.className || "Student"}</div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>Profile overview</h2>
              <span className="dashboard-pill">Active student</span>
            </div>

            <div className="dashboard-profile-body">
              <div className="dashboard-avatar">
                <FaUserGraduate />
              </div>
              <div className="dashboard-profile-details">
                <h3>{fullName}</h3>
                <p>{student.username ? `@${student.username}` : "Student account"}</p>
                <p>{student.gender || "Student"}</p>
              </div>
            </div>

            <div className="dashboard-info-grid" style={{ marginTop: "1rem" }}>
              <div className="dashboard-info-item">
                <strong><MdEmail /> Email</strong>
                <span>{student.email || "No email provided"}</span>
              </div>
              <div className="dashboard-info-item">
                <strong><FaPhoneAlt /> Phone</strong>
                <span>{student.phone || "No phone provided"}</span>
              </div>
              <div className="dashboard-info-item">
                <strong><FaCalendarAlt /> Date of birth</strong>
                <span>{student.dob || "Not provided"}</span>
              </div>
              <div className="dashboard-info-item">
                <strong><FaMapMarkerAlt /> Address</strong>
                <span>{student.address || "Not provided"}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>School activity</h2>
              <span className="dashboard-pill">Today</span>
            </div>

            <ul className="dashboard-list">
              <li><FaBook /> Math assignment due tomorrow</li>
              <li><MdSchool /> Science club meeting at 3:30 PM</li>
              <li><FaCalendarAlt /> Parent-teacher conference on Friday</li>
              <li><FaBook /> Library book return reminder</li>
            </ul>

            <div className="dashboard-activity">
              <h3>Current class</h3>
              <p>{student.className || "Class not assigned"}</p>
            </div>
            <div className="dashboard-activity">
              <h3>Student status</h3>
              <p>All requirements are up to date for this term.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;