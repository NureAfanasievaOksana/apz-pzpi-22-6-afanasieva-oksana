import { useState, useEffect } from 'react';
import api from '../services/api';
import SensorDataTable from '../components/SensorDataTable';

const SensorDataPage = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await api.get('/sensordata');
      setSensorData(response.data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Sensor Data</h1>
      <SensorDataTable sensorData={sensorData} />
    </div>
  );
};

export default SensorDataPage;