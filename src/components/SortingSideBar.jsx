import React from 'react';
import './component-styles/Sidebar.css'; // Ensure to import your Sidebar.css for styles

export default function SortingSideBar({ isOpen, closeSidebar, applySorting }) {
  const handleSort = (columnId) => {
    applySorting([{ id: columnId, desc: false }]);
    closeSidebar();
  };

  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="sort-sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>
        <h3 className="grpby-label">Sort By</h3>
        <ul>
          <li>
            <button onClick={() => handleSort('id')}>
              ID <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('name')}>
              Name <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('category')}>
              Category <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('subcategory')}>
              Sub Category <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('createdAt')}>
              Created At <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('updatedAt')}>
              Updated At <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('price')}>
              Price <span>&uarr; &darr;</span> 
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('sale_price')}>
              Sale Price <span>&uarr; &darr;</span> 
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
