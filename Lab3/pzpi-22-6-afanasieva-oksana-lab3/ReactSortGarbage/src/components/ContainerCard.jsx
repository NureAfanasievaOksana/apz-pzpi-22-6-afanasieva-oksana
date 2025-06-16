import { useState, useEffect } from 'react';
import { getSensorDataForContainer } from '../services/containers';

const ContainerCard = ({ container }) => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getSensorDataForContainer(container.containerId);
        setSensorData(data[data.length - 1] || null);
      } catch (error) {
        console.error('Failed to fetch sensor data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [container.containerId]);

  const getStatusColor = (value) => {
    if (!value) return 'gray';
    if (value > 80) return 'red';
    if (value > 50) return 'orange';
    return 'green';
  };

  const formatNumber = (num) => {
    return num ? num.toFixed(1) : '0.0';
  };

  const containerTypeMap = {
    1: 'Plastic',
    2: 'Paper',
    3: 'Glass',
    4: 'Electronics',
    5: 'Metal',
    6: 'Organic'
  };

  return (
    <div className="container-card">
      <h3>{container.address}</h3>
      <div className="type-badge">{containerTypeMap[container.type]}</div>
      
      {loading ? (
        <div>Loading sensor data...</div>
      ) : sensorData ? (
        <div className="sensor-data">
          <div className="data-item">
            <span>Fill level: {formatNumber(sensorData.fullness) || 0}%</span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getStatusColor(sensorData.fullness)}`}
                style={{ width: `${sensorData.fullness || 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="data-item">
            <span>Temperature:</span>
            <span className={sensorData.temperature > 30 ? 'warning' : ''}>
              {formatNumber(sensorData.temperature) || 0}°C
            </span>
          </div>
          
          <div className="data-item">
            <span>Humidity:</span>
            <span className={sensorData.wetness > 70 ? 'warning' : ''}>
              {formatNumber(sensorData.wetness) || 0}%
            </span>
          </div>
        </div>
      ) : (
        <div>No sensor data available</div>
      )}
    </div>
  );
};

export default ContainerCard;