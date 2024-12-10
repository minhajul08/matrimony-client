import React, { useEffect, useState } from 'react';
import './SuccessCounter.css'; 

const SuccessCounter = () => {
  const [stats, setStats] = useState({
    totalBiodata: 30,
    boysBiodata: 10,
    girlsBiodata: 10,
    marriagesCompleted: 10,
  });

  useEffect(() => {
    // Fetch data from the backend API
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  return (
   <div>
      <h2 className='text-3xl text-center mb-5 '>Our Success Stories</h2>
     <div className="success-counter">
    
    <div className="counters">
      <div className="counter">
        <h3>Total Biodata</h3>
        <p>{stats.totalBiodata}</p>
      </div>
      <div className="counter">
        <h3>Boys Biodata</h3>
        <p>{stats.boysBiodata}</p>
      </div>
      <div className="counter">
        <h3>Girls Biodata</h3>
        <p>{stats.girlsBiodata}</p>
      </div>
      <div className="counter">
        <h3>Marriages Completed</h3>
        <p>{stats.marriagesCompleted}</p>
      </div>
    </div>
  </div>
   </div>
  );
};

export default SuccessCounter;
