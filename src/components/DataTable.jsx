import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import mData from '../../sample-data.json';
import clearIco from '../../public/clear-icon.png';
import FilterSideBar from './FilterSideBar';

export default function DataTable() {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    subcategory: '',
    priceRange: [0, 100],
    createdAt: '',
    updatedAt: '',
  });

  const filteredData = useMemo(() => {
    return mData.filter(item => {
      const matchesName = filters.name === '' || item.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesCategory = filters.category === '' || item.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchesSubcategory = filters.subcategory === '' || item.subcategory.toLowerCase().includes(filters.subcategory.toLowerCase());
      const matchesPriceRange = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
      const matchesCreatedAt = filters.createdAt === '' || new Date(item.createdAt) >= new Date(filters.createdAt);
      const matchesUpdatedAt = filters.updatedAt === '' || new Date(item.updatedAt) >= new Date(filters.updatedAt);
      return matchesName && matchesCategory && matchesSubcategory && matchesPriceRange && matchesCreatedAt && matchesUpdatedAt;
    });
  }, [mData, filters]);

  const columns = useMemo(() => [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID'
    },
    {
      header: 'Name',
      accessorKey: 'name',
      footer: 'Name'
    },
    {
      header: 'Category',
      accessorKey: 'category',
      footer: 'Category'
    },
    {
      header: 'Sub Category',
      accessorKey: 'subcategory',
      footer: 'Sub Category'
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      footer: 'Created At',
      cell: info => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      },
    },
    {
      header: 'Updated At',
      accessorKey: 'updatedAt',
      footer: 'Updated At',
      cell: info => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      },
    },
    {
      header: 'Price',
      accessorKey: 'price',
      footer: 'Price'
    },
    {
      header: 'Sale Price',
      accessorKey: 'sale_price',
      footer: 'Sale Price'
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const clearFilter = () => setFiltering('');

  const toggleSidebar = (feature) => {
    setActiveFeature(feature);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="features">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search here ..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
          {filtering && (
            <img
              className="clear-icon"
              src={clearIco}
              onClick={clearFilter}
              alt="Clear"
            />
          )}
        </div>
        <div className="feature-btns">
          <button id="view-btn" onClick={() => toggleSidebar('view')}>
            <i className="fa fa-eye"></i>
          </button>
          <button id="sort-btn" onClick={() => toggleSidebar('sort')}>
            &uarr; &darr;
          </button>
          <button id="filter-btn" onClick={() => toggleSidebar('filter')}>
            <i className="fa fa-filter"></i>
          </button>
          <button id="groupby-btn" onClick={() => toggleSidebar('groupby')}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </div>
      {activeFeature === 'filter' && (
        <FilterSideBar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <table className='table table-striped rounded-corners'>
        <thead className='thead-dark'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null :
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {
                    { asc: '🔼', desc: '🔽' }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination-feature'>
        <button onClick={() => { table.setPageIndex(0) }}>First Page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => { table.previousPage() }}
        >Previous</button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => { table.nextPage() }}
        >Next</button>
        <button onClick={() => { table.setPageIndex(table.getPageCount() - 1) }}>Last Page</button>
      </div>
    </div>
  );
}
