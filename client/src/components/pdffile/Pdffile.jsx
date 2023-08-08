import React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import Table from "../table/Table";

// const columns = [
//     { field: "id", header: "ID" },
//     { field: "name", header: "Name" },
//     { field: "email", header: "Email" },
//     { field: "mobile", header: "Mobile" },
//     { field: "address", header: "Address" },
//   ];

const PdfExportAndPrint = ({ data ,columns}) => {
  const pdfExportComponent = React.useRef(null);

  const handlePrint = () => {
    pdfExportComponent.current.save();
  };

  return (
    <div>
      <PDFExport ref={pdfExportComponent}>
    
      <Table data={data} columns={columns}  />
      
        
      </PDFExport>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PdfExportAndPrint;
