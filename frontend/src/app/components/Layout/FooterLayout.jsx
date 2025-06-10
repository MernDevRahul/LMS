import React from 'react'

export default function FooterLayout() {
  return (
    <>

      <footer className="footer p-3 border-top">
        <div className="container-fluid">
          <div className="row text-body-secondary">
            <div className="col-6 text-start ">
              <a className="text-body-secondary" href=" #">
                <strong>Teckstack</strong>
              </a>
            </div>
            <div className="col-6 text-end text-body-secondary d-none d-md-block">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a className="text-body-secondary" href="#">Contact</a>
                </li>
                <li className="list-inline-item">
                  <a className="text-body-secondary" href="#">About Us</a>
                </li>
                <li className="list-inline-item">
                  <a className="text-body-secondary" href="#">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
