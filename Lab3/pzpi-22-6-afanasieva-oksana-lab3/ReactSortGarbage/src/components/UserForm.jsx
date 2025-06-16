import { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    role: '1'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username,
        email: initialData.email,
        password: '',
        address: initialData.address,
        role: initialData.role
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      role: parseInt(formData.role)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{initialData ? 'Edit User' : 'Create User'}</h2>
      
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!initialData}
        />
      </div>
      
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="1">User</option>
          <option value="2">System Administrator</option>
          <option value="3">Business Logic Administrator</option>
          <option value="4">Backup Administrator</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit">Save</button>
        {initialData && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default UserForm;