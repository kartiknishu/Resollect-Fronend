import React, { useState } from "react";
import TableComponent from "../components/TableComponent";
import FilterSection from "../components/FilterSection";
import MoreFiltersModal from "../components/MoreFiltersModal";
import data from "../components/data.json";

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    loanType: "",
    region: "",
    minDPD: "",
    maxDPD: "",
  });

  const category = [
    "All",
    "Pre Sarfaesi",
    "13(3)Responses",
    "Symbolic Possession",
    "DM Order",
    "Physical Possessions",
    "Auctions",
  ];

  // Column Options
  const columnOptions = [
    { key: "loanNumber", label: "Loan Number" },
    { key: "loanType", label: "Loan Type" },
    { key: "borrower", label: "Borrower" },
    { key: "borrowerAddress", label: "Borrower Address" },
    { key: "coBorrower1", label: "Co-Borrower 1" },
    { key: "coBorrower1Address", label: "Co-Borrower 1 Address" },
    { key: "currentDPD", label: "Current DPD" },
    { key: "sanctionedAmount", label: "Sanctioned Amount" },
    { key: "region", label: "Region" },
  ];
  
  const [selectedColumns, setSelectedColumns] = useState(columnOptions.map((col) => col.key));

  // Apply Filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter Data based on search & filters
  const filteredData = data.data.filter((item) => {
    const matchesSearch =
      item.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.loanNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      (filters.loanType ? item.loanType === filters.loanType : true) &&
      (filters.region ? item.region === filters.region : true) &&
      (filters.minDPD ? item.currentDPD >= Number(filters.minDPD) : true) &&
      (filters.maxDPD ? item.currentDPD <= Number(filters.maxDPD) : true);

    return matchesSearch && matchesFilters;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 my-4">
        {category.map((item) => (
          <button
            key={item}
            className="border border-gray-300 rounded-md text-sm font-semibold py-1 px-3 focus:bg-blue-400 focus:text-white focus:border-blue-300"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search & Filter Section */}
      <div className="flex w-full justify-between flex-wrap">
        <div className="flex items-center">
        <input
  type="text"
  placeholder="Search by Loan Number or Customer Name..."
  className="border w-96 border-gray-300 rounded-md p-2 focus:ring-0 focus:ring-black"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
        </div>
        <div className="flex space-x-2 ">
          {/* Column Selection */}
          <FilterSection
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            columnOptions={columnOptions}
          />

          {/* More Filters Button */}
          <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setIsFiltersOpen(true)}
          >
            More Filters
          </button>

          </div>
          
        </div>
      </div>

      {/* Table */}
      <div className="bg-white">
        <TableComponent filteredData={filteredData} selectedColumns={selectedColumns} columnOptions={columnOptions} />
      </div>

      {/* More Filters Modal */}
      <MoreFiltersModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} applyFilters={applyFilters} />
    </div>
  );
};

export default Portfolio;
