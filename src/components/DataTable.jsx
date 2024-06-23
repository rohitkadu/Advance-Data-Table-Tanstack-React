import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
} from '@tanstack/react-table';
import mData from '../../sample-data.json';
import clearIco from '../../public/clear-icon.png';
import FilterSideBar from './FilterSideBar';
import ViewSideBar from './ViewSideBar';
import GroupBySideBar from './GroupBySideBar';
import SortingSideBar from './SortingSideBar'; // Import SortingSideBar component

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
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });
  const [grouping, setGrouping] = useState([]);

  // Memoized filtered data based on current filters
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

  // Memoized columns based on visibleColumns state
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
  ].filter(column => visibleColumns[column.accessorKey]), [visibleColumns]);

  // React Table hook setup
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(), // Include getGroupedRowModel for grouping
    state: {
      sorting,
      globalFilter: filtering,
      grouping, // Include grouping state
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onGroupingChange: setGrouping, // Handle grouping change
  });

  // Clear filtering function
  const clearFilter = () => setFiltering('');

  // Toggle sidebar and set active feature
  const toggleSidebar = (feature) => {
    setActiveFeature(feature);
    setSidebarOpen(!sidebarOpen);
  };

  // Apply grouping function
  const applyGrouping = (groupBy) => {
    setGrouping(groupBy ? [groupBy] : []); // Set grouping state based on selected groupBy
  };

  // Clear grouping function
  const clearGrouping = () => {
    setGrouping([]); // Clear grouping state
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
      {activeFeature === 'view' && (
        <ViewSideBar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      )}
      {activeFeature === 'groupby' && (
        <GroupBySideBar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          applyGrouping={applyGrouping}
          clearGrouping={clearGrouping}
        />
      )}
      {activeFeature === 'sort' && (
        <SortingSideBar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          applySorting={setSorting}
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
