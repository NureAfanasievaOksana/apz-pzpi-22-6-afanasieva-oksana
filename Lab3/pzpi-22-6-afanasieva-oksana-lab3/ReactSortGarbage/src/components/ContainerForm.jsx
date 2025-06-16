import { useState, useEffect } from 'react';

const ContainerForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '1',
    address: '',
    max_size: '',
    user_id: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type?.toString() || '1',
        address: initialData.address || '',
        max_size: initialData.maxSize?.toString() || '1',
        user_id: initialData.userId?.toString() || ''
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
      type: parseInt(formData.type),
      maxSize: parseFloat(formData.max_size),
      userId: formData.user_id ? parseInt(formData.user_id) : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{initialData ? 'Edit Container' : 'Create Container'}</h2>
      
      <div className="form-group">
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="1">Plastic</option>
          <option value="2">Paper</option>
          <option value="3">Glass</option>
          <option value="4">Electronics</option>
          <option value="5">Metal</option>
          <option value="6">Organic</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Max Size (kg):</label>
        <input
          type="text"
          name="max_size"
          value={formData.max_size}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
        />
      </div>
      
      <div className="form-group">
        <label>User ID (optional):</label>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          min="1"
        />
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

export default ContainerForm;