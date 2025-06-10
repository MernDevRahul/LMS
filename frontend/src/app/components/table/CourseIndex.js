import { useState } from 'react';
import BooleanButton from '../Button/BooleanButton';

export default function CourseIndex() {
  const [courses, setCourses] = useState([
    { topic: 'React Basics', duration: 10, isCompleted: false },
    { topic: 'Advanced Next.js', duration: 14, isCompleted: false },
    { topic: 'JavaScript Fundamentals', duration: 7, isCompleted: true },
  ]);

  const handleCheckboxChange = (index) => {
    const newCourses = [...courses];
    newCourses[index].isCompleted = !newCourses[index].isCompleted;
    setCourses(newCourses);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Course Index</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Topic Name</th>
            <th>Duration (Days)</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course.topic}</td>
              <td>{course.duration}</td>
              <td>
                <BooleanButton trueValue={'Completed'} falseValue={'Process'}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
