import React from 'react';
import ExcelJS from 'exceljs';

const ExportExcel = ({ data }) => {
  const handleExportExcel = () => {
    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers to the worksheet
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data to the worksheet
    data.forEach((item) => {
      const values = Object.values(item);
      worksheet.addRow(values);
    });

    // Set response headers for the browser to download the file
    const filename = 'exported_data.xlsx';
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <button onClick={handleExportExcel}>Excel</button>
  );
};

export default ExportExcel;
