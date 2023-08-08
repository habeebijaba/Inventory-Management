import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyPDFDocument from "./MyPDFDocument.jsx"; // Create this component to define the PDF layout

const PDFExportButton = ({ dataToExport }) => {
  return (
    <div>
    
      <PDFDownloadLink
        document={<MyPDFDocument dataToPrint={dataToExport} />}
        fileName="users.pdf">
        {({ loading }) => (loading ? "Loading..." : "Export PDF")}
      </PDFDownloadLink>
    </div>
  );
};
export default PDFExportButton;
