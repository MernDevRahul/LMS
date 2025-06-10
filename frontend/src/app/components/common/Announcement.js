"use client"
import { useState } from 'react';

const announcements = [
  {
    id: 1,
    title: "New Course Available!",
    description: "We are excited to announce a new course on Web Development. Enroll now! This course covers topics like HTML, CSS, JavaScript, and React. It is designed for beginners who are interested in learning web development from scratch. The course will help you build modern, responsive websites and web applications. Enroll today to get started on your journey!",
    date: "January 5, 2025"
  },
  {
    id: 2,
    title: "System Maintenance",
    description: "Scheduled maintenance will take place on January 10th from 12:00 AM to 3:00 AM. During this time, the system will be down for updates. We apologize for any inconvenience caused. Please make sure to save your work before the maintenance period.",
    date: "January 2, 2025"
  },
  {
    id: 3,
    title: "Counseling Sessions Open",
    description: "Limited spots are available for new counseling sessions. Book now! Our expert counselors are available to help with career guidance, personal growth, and more. Sessions are available both online and in-person. Don’t miss out, schedule your session today!",
    date: "January 3, 2025"
  },
  {
    id: 4,
    title: "Counseling Sessions Open",
    description: "Limited spots are available for new counseling sessions. Book now! Our expert counselors are available to help with career guidance, personal growth, and more. Sessions are available both online and in-person. Don’t miss out, schedule your session today!",
    date: "January 3, 2025"
  }
];

const Announcement = () => {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  const toggleDescription = (id, event) => {
    event.preventDefault(); // Prevent the page from refreshing
    if (expandedAnnouncement === id) {
      setExpandedAnnouncement(null); // Collapse if already expanded
    } else {
      setExpandedAnnouncement(id); // Expand the selected announcement
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center">Announcements</h2>
      <div className="list-group">
        {announcements.map(announcement => (
          <div className="list-group-item" key={announcement.id}>
            <h5 className="mb-1">{announcement.title}</h5>
            <small>{announcement.date}</small>
            {/* Display the short description by default */}
            <p className="mb-1">
              {expandedAnnouncement === announcement.id 
                ? announcement.description 
                : `${announcement.description.substring(0, 100)}...`}
            </p>
            {/* Toggle between Read More and Read Less */}
            <button 
              className="btn btn-primary btn-sm"
              onClick={(e) => toggleDescription(announcement.id, e)}
            >
              {expandedAnnouncement === announcement.id ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
