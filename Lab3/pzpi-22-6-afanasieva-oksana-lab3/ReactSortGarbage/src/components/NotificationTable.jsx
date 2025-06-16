const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const NotificationTable = ({ notifications }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Timestamp</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map(notification => (
          <tr key={notification.notificationId}>
            <td>{notification.notificationId}</td>
            <td>{notification.subject}</td>
            <td>{notification.message}</td>
            <td>{formatDateTime(notification.timestamp)}</td>
            <td>{notification.userId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotificationTable;