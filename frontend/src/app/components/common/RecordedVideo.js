import React from 'react'

export default function RecordedVideo() {
  return (
    <div>
    <h2 className="text-center mb-4">Recorded Classes</h2>

    {/* Cards Container */}
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {/* Card 1 - Full Stack Development */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/premium-photo/banner-tipe-full-stack-developer_980716-272.jpg"
            className="card-img-top"
            alt="Full Stack Development Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Full Stack Development</h5>
            <p className="card-text">
              Master both front-end and back-end development. Learn frameworks like React, Node.js, and Express to build full-stack applications.
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/full-stack-development" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Card 2 - Advanced Python */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/premium-photo/programing-python_1292885-18861.jpg?semt=ais_hybrid"
            className="card-img-top"
            alt="Advanced Python Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Advanced Python</h5>
            <p className="card-text">
              Take your Python skills to the next level. Dive into advanced concepts like decorators, context managers, and more.
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/advanced-python" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Card 3 - Digital Marketing */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/premium-vector/digital-marketing_23-2147514429.jpg?semt=ais_hybrid"
            className="card-img-top"
            alt="Digital Marketing Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Digital Marketing</h5>
            <p className="card-text">
              Learn the fundamentals of digital marketing, including SEO, social media, email marketing, and paid ads.
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/digital-marketing" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Card 4 - Graphic Design */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/free-vector/flat-world-graphics-day-illustration_23-2148880103.jpg"
            className="card-img-top"
            alt="Graphic Design Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Graphic Design</h5>
            <p className="card-text">
              Learn graphic design principles and tools like Photoshop and Illustrator. Create stunning visuals for print and web.
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/graphic-design" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Card 5 - Video Editing */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/free-vector/video-files-concept-illustration_114360-4758.jpg"
            className="card-img-top"
            alt="Video Editing Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Video Editing</h5>
            <p className="card-text">
              Learn video editing techniques using tools like Adobe Premiere Pro and Final Cut Pro. Edit videos like a pro!
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/video-editing" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Card 6 - DSA (Data Structures and Algorithms) */}
      <div className="col">
        <div className="card">
          <img
            src="https://img.freepik.com/premium-vector/data-analytics-information-web-development-website-statistic_257312-767.jpg?semt=ais_hybrid"
            className="card-img-top"
            alt="DSA Thumbnail"
          />
          <div className="card-body">
            <h5 className="card-title">Data Structures and Algorithms (DSA)</h5>
            <p className="card-text">
              Master DSA concepts to excel in technical interviews and competitive programming. Learn about trees, graphs, and algorithms.
            </p>
          </div>
          <div className="card-footer text-center">
            <a href="/video/dsa" className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Add more cards as needed */}
    </div>
  </div>
  )
}
