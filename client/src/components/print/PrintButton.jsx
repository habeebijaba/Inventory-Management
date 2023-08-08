import ReactToPrint from 'react-to-print';
import DataTable from 'react-data-table-component';

const MyPrintableDataTable = ({ dataToPrint }) => {
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
  ];
  
  return (
    <DataTable title="Users" columns={columns} data={dataToPrint} />
  );
};

const PrintButton = ({ dataToPrint, printRef }) => {
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => printRef.current}
      />
      <div style={{ display: 'none' }}>
        <MyPrintableDataTable ref={printRef} dataToPrint={dataToPrint} />
      </div>
    </div>
  );
};

export default PrintButton