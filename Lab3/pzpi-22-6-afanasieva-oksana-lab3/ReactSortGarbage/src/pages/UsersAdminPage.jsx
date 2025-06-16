import { useState, useEffect } from 'react';
import api from '../services/api';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const UsersAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.userId}`, userData);
      } else {
        await api.post('/users', userData);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Users Management</h1>
      <UserForm 
        onSubmit={handleSubmit} 
        initialData={editingUser} 
        onCancel={() => setEditingUser(null)}
      />
      <UserTable 
        users={users} 
        onEdit={setEditingUser} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersAdminPage;