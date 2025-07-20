const ExcelPreviewTable = ({ data }) => {
  if (data.length === 0) return <p>No data available</p>;

  const headers = data[0];
  const rows = data.slice(1);

  // Function to copy table data as tab-separated values
  const copyTableData = () => {
    const tsv = [headers, ...rows]
      .map(row => row.map(cell => (cell == null ? '' : cell)).join('\t'))
      .join('\n');
    navigator.clipboard.writeText(tsv).then(() => {
      // Show a toast notification
      const toast = document.createElement('div');
      toast.textContent = 'Copied Successfully!';
      toast.style.position = 'fixed';
      toast.style.bottom = '32px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = '#323232';
      toast.style.color = '#fff';
      toast.style.padding = '10px 24px';
      toast.style.borderRadius = '6px';
      toast.style.zIndex = 9999;
      toast.style.fontSize = '1rem';
      toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 1800);
    });
  };

  return (
    <div>
      <button
        className="mb-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={copyTableData}
      >
        Copy Table Data
      </button>
      <div className="overflow-auto max-h-[500px] border rounded-md">
        <table className="min-w-full border-collapse table-auto text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border p-2 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIndex) => (
              <tr key={rIndex} className="hover:bg-gray-50">
                {row.map((cell, cIndex) => (
                  <td key={cIndex} className="border p-2">
                    {cell}
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

export default ExcelPreviewTable;
