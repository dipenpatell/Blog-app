import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const ReactTable = ({
  rows = [],
  columns = [],
  paginationEnabled,
  pageIndex = 0,
  pageSize = 5,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex,
    pageSize: pageSize, // 👈 Set your max rows per page here
  });

  const [data, setData] = useState(rows);
  const [columnFilters, setColumnFilters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  return (
    <div className="reacttable-table">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="th"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.column.columnDef.header}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, ri) => (
            <tr className="tr" key={row.id}>
              {row.getVisibleCells().map((cell, ci) => (
                <td className="td" key={ri + ci}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paginationEnabled === true && (
        <div className="RT-pagination">
          <div className="pagesize-wrapper">
            <span>Result per page</span>
            <div className="custom-dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span style={{ marginRight: "10px" }}>
                  {table.getState().pagination.pageSize}
                </span>
                {isDropdownOpen ? (
                  <UpArrow fill="#626262" height="15px" />
                ) : (
                  <DownArrow fill="#626262" height="15px" />
                )}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-options" style={{ bottom: "100%" }}>
                  {[5, 10, 20, 50].map((size) => (
                    <div
                      key={size}
                      onClick={() => {
                        table.setPageSize(size);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <span mb={2}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <div className="btn-group">
            <button
              className="normal-btn"
              onClick={() => table.setPageIndex(0)} // Jump to first page
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleBackwardIcon fill="#626262" height="9px" />
            </button>
            <button
              className="normal-btn"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <BackwardIcon fill="#626262" height="9px" />
            </button>
            <button
              className="normal-btn"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              <ForwardIcon fill="#626262" height="9px" />
            </button>
            <button
              className="normal-btn"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)} // Jump to last page
              disabled={!table.getCanNextPage()}
            >
              <DoubleForwardIcon fill="#626262" height="9px" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function SimpleCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <>{value}</>;
}

function EditableCell({ getValue, row, column, table }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      overflow="hidden"
      // textOverflow="ellipsis"
      // whiteSpace="nowrap"
    />
  );
}
function BackwardIcon({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height}
      stroke={fill}
      strokeWidth="1"
      version="1.1"
      id="XMLID_54_"
      viewBox="0 0 24 24"
    >
      <g id="previous">
        <g>
          <polygon points="17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3   " />
        </g>
      </g>
    </svg>
  );
}

function ForwardIcon({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height}
      stroke={fill}
      strokeWidth="1"
      version="1.1"
      id="XMLID_287_"
      viewBox="0 0 24 24"
    >
      <g id="next">
        <g>
          <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   " />
        </g>
      </g>
    </svg>
  );
}
function DoubleBackwardIcon({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height}
      stroke={fill}
      strokeWidth="13"
      viewBox="0 0 512 512"
      id="Layer_1"
      version="1.1"
    >
      <path d="M297.2,478l20.7-21.6L108.7,256L317.9,55.6L297.2,34L65.5,256L297.2,478z M194.1,256L425.8,34l20.7,21.6L237.3,256  l209.2,200.4L425.8,478L194.1,256z" />
    </svg>
  );
}
function DoubleForwardIcon({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height}
      stroke={fill}
      strokeWidth="13"
      viewBox="0 0 512 512"
      data-name="Layer 1"
      id="Layer_1"
    >
      <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z" />
    </svg>
  );
}
function DownArrow({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill={fill}
      />
    </svg>
  );
}

function UpArrow({ height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
        fill={fill}
      />
    </svg>
  );
}
