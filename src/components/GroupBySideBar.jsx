import React, { useState } from 'react';
import './component-styles/Sidebar.css'; // Ensure to import your Sidebar.css for styles
import clearIco from '../../public/clear-icon.png';

export default function GroupBySideBar({ isOpen, closeSidebar, applyGrouping, clearGrouping }) {
  const [groupBy, setGroupBy] = useState('');

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleApply = () => {
    applyGrouping(groupBy);
    closeSidebar();
  };

  const handleClear = () => {
    clearGrouping();
    setGroupBy('');
    closeSidebar();
  };

  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <button className="close-btn" onClick={closeSidebar}>
          <img
            className="clear-icon"
            src={clearIco}
            alt="Clear"
          />
        </button>

        <div className="grpby-sidebar">
          <h3 className="grpby-label">Group By</h3>
          <label>
            Select Groups:
            <select
              value={groupBy}
              className="grpby-select"
              onChange={handleGroupChange}
            >
              <option value="">None</option>
              <option value="category">Category</option>
              <option value="subcategory">Sub Category</option>
              {/* Add additional options based on your data */}
            </select>
          </label>
          <button id="clear-grp-btn" onClick={handleClear}>
            Clear Grouping
          </button>
          <button id="apply-grp-btn" onClick={handleApply}>
            Apply Grouping
          </button>
        </div>
      </div>
    </div>
  );
}
