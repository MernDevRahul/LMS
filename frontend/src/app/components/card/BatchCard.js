
import { getAllBatchforSearch } from '@/app/api/batchApi';
import { UserContext } from '@/app/context/UserContext';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function BatchCard() {
      const { state } = useContext(UserContext);
      const [countBatch, setCountBatch] = useState(0);
      const [BatchData, setBatchData] = useState();
      
      async function fetchData() {
        try {
          // Fetch all batch data
          const batch_data = await getAllBatchforSearch(state);
          console.log("Batch Data:", batch_data);
      
          // Filter the batch data based on trainerId
          const filterData = batch_data.filter(batch => batch.trainerId === state.employeeId);
          console.log("Filtered Data:", filterData);
      
          // Set the count of batches (if no batches, set count to 0)
          const batchCount = filterData.length || 0;
          setCountBatch(batchCount);
      
          // Set the filtered batch data
          setBatchData(filterData);
        } catch (error) {
          console.error("Error fetching data:", error.message || error);
        }
      }
      

      useEffect(() => {
        fetchData();
      }, []); // Fetch data once when the component mounts
    

  return (
    <div className="card" style={{ height: "330px", width: "340px" }}>
      <div className="card-body hide-scrollbar" style={{marginBottom:"28px", overflowY:"scroll"}}>
        <h3 className="card-title mb-2">Total Batches</h3>
        <div className='display-1 fw-bold text-center'>{countBatch}</div>
        {/* List Items */}
        <ul className="list-group mb-3">
        {
            BatchData?.map((batch) => {
            return (<Link key={batch?._id} href={"/facultyDashboard/batches"} className="list-group-item">
            <i className="bi bi-view-stacked"></i> ( {batch?.batchType} ) {batch?.timings}</Link>
            )})
        }
        </ul>
      </div>
    </div>
  )
}