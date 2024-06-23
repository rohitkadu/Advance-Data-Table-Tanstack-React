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

export default function BasicTable() {
  const data = useMemo(() => mData, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>[] */
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
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          },
      },
      {
          header: 'Updated At',
          accessorKey: 'updatedAt',
          footer: 'Updated At',
          cell: info => {
              const date = new Date(info.getValue());
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
          sorting: sorting,
          globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
  });

  const clearFilter = () => setFiltering('');

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
          </div>
          <table className='table table-striped rounded-corners'>
              <thead className='thead-dark'>
                  {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                          {headerGroup.headers.map(header => (
                              <th 
                                  key={header.id}
                                  onClick={header.column.getToggleSortingHandler()}
                              >
                                  { header.isPlaceholder ? null :
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  {
                                    {asc: '🔼', desc: '🔽'}[
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
              <button onClick={() => {table.setPageIndex(0)}}>First Page</button>
              <button 
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => {table.previousPage()}}
              >Previous</button>
              <button 
                  disabled={!table.getCanNextPage()}
                  onClick={() => {table.nextPage()}}
              >Next</button>
              <button onClick={() => {table.setPageIndex(table.getPageCount() - 1)}}>Last Page</button>
          </div>
      </div>
  );
}
