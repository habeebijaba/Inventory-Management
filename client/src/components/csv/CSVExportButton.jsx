import { CSVLink } from "react-csv";

const CSVExportButton = ({ dataToExport }) => {
  return (
    <div>
      <CSVLink data={dataToExport} filename="users.csv">
        <button>CSV</button>
      </CSVLink>
    </div>
  );
};
export default CSVExportButton;
