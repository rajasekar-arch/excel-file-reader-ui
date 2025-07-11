const ExcelPreviewTable = ({ data }) => {
  if (data.length === 0) return <p>No data available</p>;

  const headers = data[0];
  const rows = data.slice(1);

  return (
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
  );
};

export default ExcelPreviewTable;
