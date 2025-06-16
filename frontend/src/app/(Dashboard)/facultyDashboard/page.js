"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BatchCard from '@/app/components/card/BatchCard';
import toast from 'react-hot-toast';


  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

export default function Adminpage() {
  const {state} = useContext(UserContext)
  // Initialize the current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
  const [countdown, setCountdown] = useState("");
  const router = useRouter()  
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!state.token) {
        router.push("/"); // Redirect to dashboard if logged in        
      }
    }
  }, [state?.token]);


  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0); // Set time to 10:00 AM

      const timeDifference = tomorrow - now;
      if (timeDifference > 0) {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        setCountdown(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        );
      } else {
        setCountdown("00:00:00");
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);



  // Function to handle date change
  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);

    // Get the month as a string using the monthNames array
    const monthString = monthNames[newDate.getMonth()];
    setMonth(monthString);
  };


  return (
<>

<div className='row'>

  <div className='col-12 col-md-6 col-lg-4 my-1 d-flex justify-content-center'>

    {/* ============================================================== */}

    <div className="card" style={{ height: "330px", width: "340px" }}>
      <div className="card-body">
        <h3 className="card-title">{month}</h3>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <button
            className="btn btn-outline-primary border-0 me-2"
            onClick={() => handleDateChange(-1)}
          >
            <i className="bi bi-arrow-left "></i>
          </button>

          <h1 className={`fs-bold`}>{currentDate.getDate()}</h1>

          <button
            className="btn btn-outline-primary border-0 ms-2"
            onClick={() => handleDateChange(1)}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        {
          currentDate.toDateString() === new Date().toDateString() ? (
            // Render the "true" component when the current date is today
            <>
              <ul className="list-group mb-3" style={{ height: "124px" }}></ul>
              <div className="d-flex align-items-center justify-content-end">
                <button className="btn btn-transparent fs-5 text-danger"
                  onClick={() => toast.error("This Dashboard is under Development! Some feature may not work. go to Side Menu to use other features.")}>
                  <i className="bi bi-record-circle"></i> Join class
                </button>
              </div>
            </>
          ) : currentDate > new Date() ? (
            // Render the same "true" component when the current date is in the future
            <>
              <ul className="list-group mb-3" style={{ height: "124px" }}></ul>
              <div className="d-flex align-items-center justify-content-end">
                <button className="btn btn-transparent text-primary"
                  onClick={() => toast.error("This Dashboard is under Development! Some feature may not work. go to Side Menu to use other features.")}>

                  <i className="bi bi-clock-history"></i> Upcoming class {countdown}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* List Items */}
              <ul className="list-group mb-3">
                <Link href={"###"} className="list-group-item">
                  <i className="bi bi-file-earmark-check"></i> Assessments</Link>
                <Link href={"###"} className="list-group-item">
                  <i className="bi bi-file-earmark-text"></i> Document</Link>
                <Link href={"###"} className="list-group-item">
                  <i className="bi bi-file-earmark-pdf"></i> Pdf</Link>
              </ul>

              <div className='d-flex align-items-center justify-content-between'>
                <Link href={"###"} className="text-primry">
                  more</Link>

                <div className="dropdown">
                  <button
                    className="btn btn-transparent fs-4 text-dark"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-play-fill"></i> 3
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item" href="#">
                        Recording 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Recording 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Recording 3
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </>
          )
        }




      </div>
    </div>

    {/* ============================================================== */}

  </div>

  <div className='col-12 col-md-6 col-lg-4 my-1 d-flex justify-content-center'>

        <BatchCard/>

  </div>

  <div className='col-12 col-md-6 col-lg-4 my-1 d-flex justify-content-center'>

    <div className="card" style={{ height: "330px", width: "340px" }}>
      <div className="card-body">
        <h3 className="card-title mb-5">Recordings</h3>

        {/* List Items */}
        <ul className="list-group mb-3">
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-record-circle"></i> Recording 1</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-record-circle"></i> Recording 2</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-record-circle"></i> Recording 3</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-record-circle"></i> Recording 4</Link>
        </ul>
        <Link href={"###"} className="text-primry">
          more</Link>

      </div>
    </div>

  </div>

  <div className='col-12 col-md-6 col-lg-4 my-1 d-flex justify-content-center'>

    <div className="card" style={{ height: "330px", width: "340px" }}>
      <div className="card-body">
        <h3 className="card-title mb-5">Documents</h3>

        {/* List Items */}
        <ul className="list-group mb-3">
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-file-earmark-text"></i> Document 1</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-file-earmark-text"></i> Document 2</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-file-earmark-text"></i> Document 3</Link>
          <Link href={"###"} className="list-group-item">
            <i className="bi bi-file-earmark-text"></i> Document 4</Link>
        </ul>
        <Link href={"###"} className="text-primry">
          more</Link>

      </div>
    </div>

  </div>

  


</div>
</> 
  )
}
