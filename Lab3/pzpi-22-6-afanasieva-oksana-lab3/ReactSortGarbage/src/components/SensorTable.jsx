const SensorTable = ({ sensors, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Container ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sensors.map(sensor => (
          <tr key={sensor.sensorId}>
            <td>{sensor.sensorId}</td>
            <td>{sensor.containerId}</td>
            <td>
              <button onClick={() => onEdit(sensor)}>Edit</button>
              <button onClick={() => onDelete(sensor.sensorId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SensorTable;