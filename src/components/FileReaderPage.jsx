import { useState } from 'react';
import {
  readFileAsArrayBuffer,
  getExcelRowCount,
  getExcelHeaders,
  isExcelColumnPopulated,
  findSpecialCharacterCells,
  getExcelRawData,
  getExcelColumnCount,
  getExcelMetadata
} from 'excel-file-reader-browser-ts';

import ExcelPreviewTable from './ExcelPreviewTable';

const ExcelValidatorPage = () => {
  const [rowCount, setRowCount] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [columnCount, setColumnCount] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState('');
  const [columnHasValues, setColumnHasValues] = useState(null);
  const [specialCharsExist, setSpecialCharsExist] = useState(null);
  const [metadata, setMetadata] = useState(null);
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
      const getRawData = await getExcelRawData(buffer);
      const columnCount = await getExcelColumnCount(buffer);
      const meta = await getExcelMetadata(file);
      setRowCount(count);
      setHeaders(allHeaders);
      setSpecialCharsExist(specialChars);
      setTableData(getRawData);
      setColumnCount(columnCount);
      setMetadata(meta);
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
      setColumnHasValues(hasValues);
    } catch (err) {
      console.error(err);
      setError('Error checking column values.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div>
        <p className="mb-2 text-gray-600">
          <strong>excel-file-reader-browser-ts version:</strong> 1.0.11
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-6">Excel File Validator</h1>
      <input id="excel-file-input" type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleValidateFile}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Validate Excel
      </button>
       {/*  add reset button */}
      <button
        onClick={() => {
          setRowCount(null);
          setTableData([]);
          setColumnCount(null);
          setHeaders([]);
          setSelectedHeader('');
          setColumnHasValues(null);
          setSpecialCharsExist(null);
          setMetadata(null);
          setError('');
          setFile(null);
          // Clear file input value
          if (document.getElementById('excel-file-input')) {
            document.getElementById('excel-file-input').value = '';
          }
        }}
        className="bg-gray-400 text-white px-4 py-2 rounded mb-4 ml-2"
      >
        Reset
      </button>


      {error && <p className="text-red-500">{error}</p>}

      {metadata && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">File Metadata</h3>
          {/* show as a json obeject */}
          {/* show file size only in mb */}
          <p>
            file size: {metadata.fileSize} bytes ({(metadata.fileSize / (1024 * 1024)).toFixed(2)} MB)
          </p>
          <br />
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      )}

      {rowCount !== null && (
        <div className="mb-4">
          <p><strong>Total Rows:</strong> {rowCount}</p>
          <p><strong>Total Columns:</strong> {columnCount}</p>
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
      {tableData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Excel Data Preview</h3>
          <div className="p-4">
            <ExcelPreviewTable data={tableData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelValidatorPage;
