import { useState, useEffect } from 'react';

const SensorForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    containerId: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        containerId: initialData.containerId
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{initialData ? 'Edit Sensor' : 'Create Sensor'}</h2>
      
      <div className="form-group">
        <label>Container ID:</label>
        <input
          type="text"
          name="containerId"
          value={formData.containerId}
          onChange={handleChange}
          required
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

export default SensorForm;