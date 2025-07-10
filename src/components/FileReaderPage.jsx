import React, { useState } from 'react';
import {
  readFileAsArrayBuffer,
  getExcelRowCount,
  getExcelHeaders,
  isExcelColumnPopulated,
  findSpecialCharacterCells,
} from 'excel-file-reader-browser-ts';

const ExcelValidatorPage = () => {
  const [rowCount, setRowCount] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState('');
  const [columnHasValues, setColumnHasValues] = useState(null);
  const [specialCharsExist, setSpecialCharsExist] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.name.endsWith('.xlsx')) {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Please upload a valid .xlsx file.');
      setFile(null);
    }
  };

  const handleValidateFile = async () => {
    if (!file) return;

    try {
      const buffer = await readFileAsArrayBuffer(file);

      const count = await getExcelRowCount(buffer);
      const allHeaders = await getExcelHeaders(buffer);
      const specialChars = await findSpecialCharacterCells(buffer);

      setRowCount(count);
      setHeaders(allHeaders);
      setSpecialCharsExist(specialChars);
      setColumnHasValues(null); // Reset
    } catch (err) {
      console.error(err);
      setError('Error processing the Excel file.');
    }
  };

  const handleCheckColumnValues = async () => {
    if (!file || !selectedHeader) return;

    try {
      const buffer = await readFileAsArrayBuffer(file);
      const hasValues = await isExcelColumnPopulated(buffer, selectedHeader);
      console.log(`Column "${selectedHeader}" has values:`, hasValues);
      setColumnHasValues(hasValues);
    } catch (err) {
      console.error(err);
      setError('Error checking column values.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Excel File Validator</h2>

      <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleValidateFile}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Validate Excel
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {rowCount !== null && (
        <div className="mb-4">
          <p><strong>Total Rows:</strong> {rowCount}</p>
          <p><strong>Special Characters Found:</strong> {specialCharsExist ? 'Yes' : 'No'}</p>
          <p><strong>Headers:</strong> {headers.join(', ')}</p>

          {headers.length > 0 && (
            <div className="mt-4">
              <label>Select a Header to Check Values:</label>
              <select
                value={selectedHeader}
                onChange={(e) => setSelectedHeader(e.target.value)}
                className="block mt-1 p-2 border rounded"
              >
                <option value="">-- Select --</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>

              <button
                onClick={handleCheckColumnValues}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Check Column
              </button>

              {columnHasValues !== null && (
                <p className="mt-2">
                  <strong>Values in Column:</strong>{' '}
                  {columnHasValues ? `Column "${selectedHeader}" has values:` : '❌ No'}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelValidatorPage;
