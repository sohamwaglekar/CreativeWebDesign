'use client'
import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { COLUMNS } from './column';
import MOCK_DATA from './mockdata.json';
import './table.css';

const BasicTable = props => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }
    },
    usePagination
  );

  return (
    <div className="table-container">
      <h2 className='tablespan'>Basic Table</h2>
       <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('HEADER')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
          <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        
        <button disabled={!canNextPage} onClick={() => nextPage()} className="buttonNext">
          Next
        </button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()} className="buttonPrev">
          Previous
        </button>
     
      </div>
    </div>
   
  );
};

export default BasicTable;
