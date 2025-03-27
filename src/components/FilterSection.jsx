import React, { useState } from "react";
import UploadSidebar from "./UploadSidebar";

const FilterSection = ({ selectedColumns, setSelectedColumns, columnOptions }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColumnChange = (columnKey) => {
    setSelectedColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((col) => col !== columnKey) : [...prev, columnKey]
    );
  };

  return (
    <div className="flex items-center gap-4 py-4 bg-gray-100 rounded-lg">
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition"
        onClick={() => setIsSidebarOpen(true)}
      >
        Upload Document
      </button>

      
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer  transition"
        onClick={() => setIsModalOpen(true)}
      >
        Select Columns
      </button>

     
      <UploadSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Select Columns</h2>

            {/* Column Checkboxes */}
            <div className="flex flex-col gap-2">
              {columnOptions.map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(key)}
                    onChange={() => handleColumnChange(key)}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
