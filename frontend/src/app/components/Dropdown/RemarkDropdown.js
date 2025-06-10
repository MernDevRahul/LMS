import React, { useState } from 'react'
import RemarkSectionForm from '../Form/RemarkSectionForm';
import { getRemarkById } from '@/app/api/remarkApi';

const RemarkDropdown = ({StdById,lead,index}) => {
    const [showModal,setShowModal] = useState(false);
    const[toggleButton,setToggleButton] = useState(false);
    const [remarkData,setRemarkData] = useState([]);

    async function fetchRemark(id) {
      try {
          const data = await getRemarkById(id) 
            setRemarkData(data)
        } catch (error) {
          console.log(error);
        }
    }

    const formatDate = (isoDate) => {
      if (!isoDate) return ""; 
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear().toString().slice(-2);
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
  
      return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
    };

    
    return (
      <div className="remark-inputs">
    <div className="dropdown d-flex justify-content-between w-100">
      <button
        className="btn btn-transparent text-start shadow-none border-0 w-100"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={()=>{
          StdById ? fetchRemark(StdById.leadId) : fetchRemark(lead._id)
        }}
        >
        {StdById ? StdById.Remark : lead.Remark
        }
      </button>
      <ul className="dropdown-menu p-2" 
      aria-labelledby="dropdownMenuButton"
      style={{width:"240px"}}
      >
        <li className='hide-scrollbar' style={{overflowX:"scroll"}}>
          {
            remarkData ? remarkData?.map((remark, idx) => (
              <button key={idx}
              className="dropdown-item px-0 d-flex justify-content-between bg-white text-dark"
              onClick={() => setShowModal(true)}>
                <span>{remark?.message}</span>
                <span className='px-3'>|</span>
                <span>{formatDate(remark?.createdAt)}</span>
              </button>
            )) :
              null
          }
        </li>
        <li className='mt-2'>
          <button className="dropdown-item bg-primary text-light rounded" type="button"
          disabled={
            lead? lead["Admission Status"] === "Done" ? true : false : false
          }
          onClick={() => setShowModal(true)}>
            Add Remark
          </button>
        </li>
      </ul>
    </div>

    {/* Add EMI Modal */}
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      style={{ display: showModal ? 'block' : 'none',background:"#00000099" }}
      aria-labelledby="addEMIModalLabel"
      {...(showModal ? {} : { inert: true })} // Add inert when the modal is hidden
    >

      <div className="modal-dialog modal-xl modal-dialog-scrollable" style={{padding:"10px"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addEMIModalLabel">
              Remark Section
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {
              remarkData && remarkData.length > 0 ? (
                remarkData.map((remark, idx) => (
                  <div key={idx} className="row mb-3 text-start">
                    <div className="col-6">Remark {index + 1}</div>
                    <div className="col-6">Created On</div>
                    <div className="col-6">
                      <input
                        type="text"
                        id={`Remark-${index}${idx + 1}`}
                        className="form-control border shadow-none p-2"
                        value={remark?.message || ''}
                        readOnly
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        id={`Remark-TimeStamp-${index}${idx + 1}`}
                        className="form-control border shadow-none p-2"
                        value={formatDate(remark?.createdAt) || ''}
                        readOnly
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h5>No Remark Added yet.</h5>
              )
            }

            <div className='text-end border-top'>
              {/* Toggle Hello Button */}
              <button className="btn btn-link px-0" onClick={() => setToggleButton(!toggleButton)}>
                {!toggleButton ? "Add Another Remark"
                  : (<>
                    <i className="bi bi-x-lg fs-5 text-danger"></i>
                  </>)}
              </button>

            </div>
            {/* Conditionally render Hello */}
            {toggleButton &&
              <div className='row'>
                <RemarkSectionForm
                  lead={lead}
                  StdById={StdById}
                  onClick={() => setShowModal(false)}
                />
              </div>
            }
          </div>

        </div>
      </div>
    </div>
    {/* End Modal */}
  </div>
  )
}

export default RemarkDropdown