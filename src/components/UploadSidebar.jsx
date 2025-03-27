import React, { useState } from "react";

const UploadSidebar = ({ isOpen, onClose }) => {
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentRemark, setDocumentRemark] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const resetForm = () => {
    setDocumentName("");
    setDocumentType("");
    setDocumentRemark("");
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      documentName,
      documentType,
      documentRemark,
      selectedFile,
    });

    setShowPopup(true); // Show the success popup
    resetForm(); // Reset the form fields

    // Hide the popup and close sidebar after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50 p-6`}
    >
      <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4">Upload Document</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Document Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Document Type</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="pdf">PDF</option>
            <option value="doc">Word Document</option>
            <option value="xls">Excel Sheet</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Document Remark</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            value={documentRemark}
            onChange={(e) => setDocumentRemark(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Select Document</label>
          <input type="file" className="w-full border p-2 border-gray-300 rounded-md" onChange={handleFileChange} required />
          {selectedFile && <p className="text-gray-600 text-sm mt-1">{selectedFile.name}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-md transition-opacity">
          ✅ Document submitted successfully!
        </div>
      )}
    </div>
  );
};

export default UploadSidebar;
