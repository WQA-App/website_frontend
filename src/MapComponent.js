import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { fetchDataByYear } from './api';

const centerOfIndia = [21.1466, 79.0888];

const getColor = (wqi) => {
  if (wqi < 25) return 'blue';
  if (wqi < 50) return 'green';
  if (wqi < 75) return 'yellow';
  if (wqi < 100) return 'orange';
  return 'red';
};

const MapComponent = ({ year }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (year) {
      console.log(year);
      fetchDataByYear(year)
        .then(res => setData(res.data))
        .catch(() => setData([]));
      }
      // console.log(data);
  }, [year]);

  return (
    <MapContainer center={centerOfIndia} zoom={5} style={{ height: '85vh', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((point, idx) => (
        <CircleMarker
          key={idx}
          center={[parseFloat(point.latitude), parseFloat(point.longitude)]}
          radius={1}
          color={getColor(point.water_quality_index)}
          fillOpacity={0.8}
        >
          <Popup>
            <b>WQI:</b> {point.water_quality_index}<br />
            {/* <b>pH:</b> {point.ph}<br />
            <b>TDS:</b> {point.TDS}<br /> */}
            <b>State:</b> {point.state}<br />
            <b>District:</b> {point.district}<br />
            <b>Village:</b> {point.village}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
