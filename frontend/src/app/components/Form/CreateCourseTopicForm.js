// pages/add-course.js
import { useState } from 'react';

export default function CreateCourseTopicForm() {
  const [formData, setFormData] = useState({
    courseId: '', // _id for the course (could be auto-generated)
    topic: '',
    duration: '',
    isCompleted: false, // Checkbox for completed status
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="topic" className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
}
