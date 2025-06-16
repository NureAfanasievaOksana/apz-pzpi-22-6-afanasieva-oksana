const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address || 'N/A'}</td>
            <td>{getRoleName(user.role || user.roleId)}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.userId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getRoleName = (roleId) => {
  switch(roleId) {
    case 1: return 'User';
    case 2: return 'System Admin';
    case 3: return 'Business Admin';
    case 4: return 'Backup Admin';
    default: return 'Unknown';
  }
};

export default UserTable;