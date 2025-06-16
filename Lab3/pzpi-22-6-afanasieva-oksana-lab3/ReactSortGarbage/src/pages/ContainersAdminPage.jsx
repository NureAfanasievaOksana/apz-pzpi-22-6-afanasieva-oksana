import { useState, useEffect } from 'react';
import api from '../services/api';
import ContainerTable from '../components/ContainerTable';
import ContainerForm from '../components/ContainerForm';

const ContainersAdminPage = () => {
  const [containers, setContainers] = useState([]);
  const [editingContainer, setEditingContainer] = useState(null);

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    try {
      const response = await api.get('/containers');
      setContainers(response.data);
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/containers/${id}`);
      fetchContainers();
    } catch (error) {
      console.error('Error deleting container:', error);
    }
  };

  const handleSubmit = async (containerData) => {
    try {
      if (editingContainer) {
        await api.put(`/containers/${editingContainer.containerId}`, containerData);
      } else {
        await api.post('/containers', containerData);
      }
      setEditingContainer(null);
      fetchContainers();
    } catch (error) {
      console.error('Error saving container:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Containers Management</h1>
      <ContainerForm 
        onSubmit={handleSubmit} 
        initialData={editingContainer} 
        onCancel={() => setEditingContainer(null)}
      />
      <ContainerTable 
        containers={containers} 
        onEdit={setEditingContainer} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ContainersAdminPage;