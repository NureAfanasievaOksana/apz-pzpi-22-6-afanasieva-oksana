import { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    address: ''
  });

  const containerTypes = [
    { value: '1', label: 'Plastic' },
    { value: '2', label: 'Paper' },
    { value: '3', label: 'Glass' },
    { value: '4', label: 'Electronics' },
    { value: '5', label: 'Metal' },
    { value: '6', label: 'Organic' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Search by address:</label>
        <input
          type="text"
          name="address"
          placeholder="Enter address..."
          value={filters.address}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Filter by type:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All types</option>
          {containerTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;