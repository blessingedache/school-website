import { useEffect, useMemo, useState } from "react";
import { FaUserGraduate, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdSchool } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ProfileSkeleton } from "../../skeletons";
import "../../styles/Profile.css";

const Profile = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const studentData = useMemo(() => location.state?.student || null, [location.state]);

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
    return <ProfileSkeleton />;
  }

  if (!student) {
    return null;
  }

  const fullName = `${student.firstName || "Student"} ${student.middleName ? student.middleName + " " : ""}${student.lastName || ""}`.trim();

  return (
    <section className="profile-page">
      <div className="profile-shell">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Student profile</h1>
            <p>Personal details and school information for your account.</p>
          </div>

          <div className="profile-body">
            <div className="profile-top">
              <div className="profile-avatar">
                <FaUserGraduate />
              </div>
              <div>
                <h2>{fullName}</h2>
                <p>{student.username ? `@${student.username}` : "Student account"}</p>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-item">
                <strong><MdEmail /> Email</strong>
                <span>{student.email || "No email provided"}</span>
              </div>
              <div className="profile-item">
                <strong><FaPhoneAlt /> Phone</strong>
                <span>{student.phone || "No phone provided"}</span>
              </div>
              <div className="profile-item">
                <strong><FaCalendarAlt /> Date of birth</strong>
                <span>{student.dob || "Not provided"}</span>
              </div>
              <div className="profile-item">
                <strong><FaMapMarkerAlt /> Address</strong>
                <span>{student.address || "Not provided"}</span>
              </div>
              <div className="profile-item">
                <strong><MdSchool /> Class</strong>
                <span>{student.className || "Not assigned"}</span>
              </div>
              <div className="profile-item">
                <strong>Gender</strong>
                <span>{student.gender || "Not provided"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;