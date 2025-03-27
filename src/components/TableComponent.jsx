import React, { useState } from "react";

const TableComponent = ({ filteredData, selectedColumns, columnOptions }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  return (
    <div className="relative w-full mt-5">
      
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-gray-400 rounded-md">
        <table className="table-auto w-full bg-white text-sm border-collapse">
          
          <thead className="sticky top-0 bg-white font-semibold shadow-md z-10">
            <tr>
              {columnOptions
                .filter((col) => selectedColumns.includes(col.key))
                .map((col) => (
                  <th
                    key={col.key}
                    className="border-b border-gray-300 p-3 text-left whitespace-nowrap overflow-hidden text-ellipsis bg-white"
                    style={{ maxWidth: "150px" }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="truncate">{col.label}</span>
                      <button onClick={() => handleSort(col.key)}>
                        {sortConfig.key === col.key ? (
                          sortConfig.direction === "asc" ? "▲" : "▼"
                        ) : (
                          "▼"
                        )}
                      </button>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>

         
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columnOptions
                  .filter((col) => selectedColumns.includes(col.key))
                  .map((col) => (
                    <td
                      key={col.key}
                      className="border-b border-gray-300 p-3 text-left whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ maxWidth: "150px" }}
                    >
                      {item[col.key]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
