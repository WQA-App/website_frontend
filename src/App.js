import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import { fetchYears } from './api';

function App() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  console.log("Starting app");
  useEffect(() => {
    console.log("fetching years");
    fetchYears()
      .then(res => {
        setYears(res.data);
        if (res.data.length > 0) setSelectedYear(res.data[0]);
      })
      .catch(() => setYears([]));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Water Quality Map</h2>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear || ''}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {/* <MapComponent year='2019' /> */}
      {selectedYear && <MapComponent year={selectedYear} />}
    </div>
  );
}

export default App;
