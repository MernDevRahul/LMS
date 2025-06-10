import React from 'react'

export default function MainLayout() {
  return (
    <div className='pt-5'>

      <main className="content px-3 py-4">
        <div className="container-fluid">
          <div className="mb-3">
            <h3 className="fw-bold fs-4 mb-3">Admin Dashboard</h3>
            <div className="row">
              <div className="col-12 col-md-4 ">
                <div className="card border-0">
                  <div className="card-body py-4">
                    <h5 className="mb-2 fw-bold">
                      Memebers Progress
                    </h5>
                    <p className="mb-2 fw-bold">
                      $72,540
                    </p>
                    <div className="mb-0">
                      <span className="badge text-success me-2">
                        +9.0%
                      </span>
                      <span className=" fw-bold">
                        Since Last Month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 ">
                <div className="card  border-0">
                  <div className="card-body py-4">
                    <h5 className="mb-2 fw-bold">
                      Memebers Progress
                    </h5>
                    <p className="mb-2 fw-bold">
                      $72,540
                    </p>
                    <div className="mb-0">
                      <span className="badge text-success me-2">
                        +9.0%
                      </span>
                      <span className="fw-bold">
                        Since Last Month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 ">
                <div className="card border-0">
                  <div className="card-body py-4">
                    <h5 className="mb-2 fw-bold">
                      Memebers Progress
                    </h5>
                    <p className="mb-2 fw-bold">
                      $72,540
                    </p>
                    <div className="mb-0">
                      <span className="badge text-success me-2">
                        +9.0%
                      </span>
                      <span className="fw-bold">
                        Since Last Month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="fw-bold fs-4 my-3">Avg. Agent Earnings
            </h3>
            <div className="row">
              <div className="col-12">
                <table className="table table-striped">
                  <thead>
                    <tr className="highlight">
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colSpan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
