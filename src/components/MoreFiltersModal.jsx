import React, { useState } from "react";

const MoreFiltersModal = ({ isOpen, onClose, applyFilters }) => {
  const [loanType, setLoanType] = useState("");
  const [region, setRegion] = useState("");
  const [minDPD, setMinDPD] = useState("");
  const [maxDPD, setMaxDPD] = useState("");

  const loanTypeOptions = [
    "Home Loan",
    "Personal Loan",
    "Car Loan",
    "Business Loan",
    "Education Loan",
  ];

  const regionOptions = ["North", "South", "East", "West", "Central"];

  if (!isOpen) return null;

  // Handle Apply Filter button
  const handleApplyFilters = () => {
    applyFilters({ loanType, region, minDPD, maxDPD }); // Send selected filters to parent
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">More Filters</h2>

        {/* Loan Type Filter - Dropdown */}
        <label className="block mb-2">
          Loan Type:
          <select
            className="w-full border p-2 rounded-md"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          >
            <option value="">Select Loan Type</option>
            {loanTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {/* Region Filter - Dropdown */}
        <label className="block mb-2">
          Region:
          <select
            className="w-full border p-2 rounded-md"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {regionOptions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </label>

        {/* Min & Max DPD */}
        <div className="flex space-x-4">
          <label className="block mb-2 w-1/2">
            Min DPD:
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              value={minDPD}
              onChange={(e) => setMinDPD(e.target.value)}
            />
          </label>

          <label className="block mb-2 w-1/2">
            Max DPD:
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              value={maxDPD}
              onChange={(e) => setMaxDPD(e.target.value)}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreFiltersModal;
