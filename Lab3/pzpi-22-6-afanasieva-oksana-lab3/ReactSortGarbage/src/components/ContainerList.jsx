import { useState, useEffect } from 'react';
import { getContainers } from '../services/containers';
import ContainerCard from './ContainerCard';

const ContainerList = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getContainers();
        setContainers(data);
      } catch (err) {
        setError('Failed to fetch containers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredContainers = containers.filter(container => {
    const matchesSearch = container.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? container.type.toString() === typeFilter : true;
    return matchesSearch && matchesType;
  });

  if (loading) return <div>Loading containers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-list">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by address..."
        />
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="type-filter"
        >
          <option value="">All Types</option>
          <option value="1">Plastic</option>
          <option value="2">Paper</option>
          <option value="3">Glass</option>
          <option value="4">Electronics</option>
          <option value="5">Metal</option>
          <option value="6">Organic</option>
        </select>
      </div>
      
      <div className="containers-grid">
        {filteredContainers.length > 0 ? (
          filteredContainers.map(container => (
            <ContainerCard key={container.containerId} container={container} />
          ))
        ) : (
          <div>No containers found</div>
        )}
      </div>
    </div>
  );
};

export default ContainerList;