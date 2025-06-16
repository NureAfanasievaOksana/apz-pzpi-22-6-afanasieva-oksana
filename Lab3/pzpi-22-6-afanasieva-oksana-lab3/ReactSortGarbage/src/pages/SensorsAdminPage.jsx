import { useState, useEffect } from 'react';
import api from '../services/api';
import SensorTable from '../components/SensorTable';
import SensorForm from '../components/SensorForm';

const SensorsAdminPage = () => {
  const [sensors, setSensors] = useState([]);
  const [editingSensor, setEditingSensor] = useState(null);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    try {
      const response = await api.get('/sensors');
      setSensors(response.data);
    } catch (error) {
      console.error('Error fetching sensors:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/sensors/${id}`);
      fetchSensors();
    } catch (error) {
      console.error('Error deleting sensor:', error);
    }
  };

  const handleSubmit = async (sensorData) => {
    try {
      if (editingSensor) {
        await api.put(`/sensors/${editingSensor.sensorId}`, sensorData);
      } else {
        await api.post('/sensors', sensorData);
      }
      setEditingSensor(null);
      fetchSensors();
    } catch (error) {
      console.error('Error saving sensor:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Sensors Management</h1>
      <SensorForm 
        onSubmit={handleSubmit} 
        initialData={editingSensor} 
        onCancel={() => setEditingSensor(null)}
      />
      <SensorTable 
        sensors={sensors} 
        onEdit={setEditingSensor} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SensorsAdminPage;