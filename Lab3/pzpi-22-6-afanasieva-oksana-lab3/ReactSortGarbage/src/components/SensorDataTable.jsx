const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const SensorDataTable = ({ sensorData }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Fullness (%)</th>
          <th>Temperature (°C)</th>
          <th>Wetness (%)</th>
          <th>Sensor ID</th>
        </tr>
      </thead>
      <tbody>
        {sensorData.map(data => (
          <tr key={data.sensorDataId}>
            <td>{data.sensorDataId}</td>
            <td>{formatDateTime(data.timestamp)}</td>
            <td>{data.fullness.toFixed(2)}</td>
            <td>{data.temperature.toFixed(2)}</td>
            <td>{data.wetness.toFixed(2)}</td>
            <td>{data.sensorId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SensorDataTable;