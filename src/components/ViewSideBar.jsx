import React from 'react';
import './component-styles/Sidebar.css';
import clearIco from '../../public/clear-icon.png';

export default function ViewSideBar({ isOpen, closeSidebar, visibleColumns, setVisibleColumns }) {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name } = e.target;
    setVisibleColumns({ ...visibleColumns, [name]: !visibleColumns[name] });
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
        <h3>View Columns</h3>
        {Object.keys(visibleColumns).map(column => (
          <label key={column}>
            <input
              type="checkbox"
              name={column}
              checked={visibleColumns[column]}
              onChange={handleInputChange}
              className='view-input-txt'
            />
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}
