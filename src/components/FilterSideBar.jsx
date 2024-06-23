import React from 'react';
import './component-styles/Sidebar.css';
import clearIco from '../../public/clear-icon.png';

export default function FilterSideBar({ isOpen, closeSidebar, filters, setFilters }) {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'range') {
      setFilters({ ...filters, [name]: [parseInt(value), filters[name][1]] });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleRangeChange = (e, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(e.target.value);
    setFilters({ ...filters, priceRange: newRange });
  };

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={closeSidebar}>
        <img
          className="clear-icon"
          src={clearIco}
          alt="Clear"
        />
      </button>

      <div className="sidebar-content">
        <h3>Filters</h3>
        <label>
          Name:
          <input type="text" name="name" value={filters.name} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={filters.category} onChange={handleInputChange} />
        </label>
        <label>
          Subcategory:
          <input type="text" name="subcategory" value={filters.subcategory} onChange={handleInputChange} />
        </label>
        <label>
          Price Range:
          <input type="range" name="priceRange" min="0" max="100" value={filters.priceRange[0]} onChange={(e) => handleRangeChange(e, 0)} />
          <input type="range" name="priceRange" min="0" max="100" value={filters.priceRange[1]} onChange={(e) => handleRangeChange(e, 1)} />
        </label>
        <label>
          Created At:
          <input type="date" name="createdAt" value={filters.createdAt} onChange={handleInputChange} />
        </label>
        <label>
          Updated At:
          <input type="date" name="updatedAt" value={filters.updatedAt} onChange={handleInputChange} />
        </label>
      </div>
    </div>
  );
}
