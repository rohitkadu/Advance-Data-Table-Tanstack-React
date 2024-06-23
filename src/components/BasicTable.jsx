import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} 
from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import mData from '../../MOCK_DATA.json';

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
      header: 'name',
      accessorFn: row => `${row.first_name} ${row.last_name}`,
    },
    // {
    //   header: 'First Name',
    //   accessorKey: 'first_name',
    //   footer: 'First Name'
    // },
    // {
    //   header: 'Last Name',
    //   accessorKey: 'last_name',
    //   footer: 'Last Name'
    // },
    {
      header: 'Email',
      accessorKey: 'email',
      footer: 'Email'
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'Gender'
    },
    {
      header: 'DOB',
      accessorKey: 'dob',
      footer: 'DOB',
    }
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

  return (
    <div>
      <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
      <table className='table table-striped rounded-corners'>
        <thead className='thead-dark'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}
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
        {/* 
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
        */}
        
      </table>

      <div>
        <button onClick={() => {table.setPageIndex(0)}}>First Page</button>
        <button 
          disabled={!table.getCanPreviousPage()}
          onClick={() => {table.previousPage()}}
          >Previous
        </button>
        <button 
          disabled={!table.getCanNextPage()}
          onClick={() => {table.nextPage()}}
          >Next
        </button>
        <button onClick={() => {table.setPageIndex(table.getPageCount() - 1)}}>Last Page</button>

      </div>
    </div>
  );
}
