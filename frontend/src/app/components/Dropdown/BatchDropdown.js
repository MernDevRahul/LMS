import { GetAllBatches } from "@/app/api/batchApi";
import { MainAdminContext } from "@/app/context/AdminContext";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

export default function BatchDropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const {adminState} = useContext(MainAdminContext);

  async function batch(){
    let response = await GetAllBatches(adminState);
    const batchData = response.data.batches;
    
    // Transform batch data to create options with both timings and batch type
    const timeOptions = batchData.map(batch => ({
      value: `${batch.timings.startTime}-${batch.timings.endTime} (${batch.batchType})`,
      label: `${batch.timings.startTime} - ${batch.timings.endTime} (${batch.batchType})`
    }));
    
    setOptions(timeOptions);
  } 

  useEffect(() => {
    batch();
  }, [adminState]);

  return (
    <div>
      {/* <label className="block mb-2 font-bold">Select Batch Type:</label> */}
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        isSearchable
        placeholder="Search & Select Timing"
        className="w-full"
      />
    </div>
  );
}


