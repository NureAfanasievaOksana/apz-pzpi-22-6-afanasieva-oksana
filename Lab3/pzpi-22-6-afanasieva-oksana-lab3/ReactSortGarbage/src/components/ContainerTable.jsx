const ContainerTable = ({ containers, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Address</th>
          <th>Max Size</th>
          <th>User ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {containers.map(container => (
          <tr key={container.containerId}>
            <td>{container.containerId}</td>
            <td>{container.type}</td>
            <td>{container.address}</td>
            <td>{container.maxSize} kg</td>
            <td>{container.userId || 'N/A'}</td>
            <td>
              <button onClick={() => onEdit(container)}>Edit</button>
              <button onClick={() => onDelete(container.containerId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContainerTable;