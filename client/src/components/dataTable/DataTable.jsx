import React from "react";
import "./dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    // type: "number",
    width: 200,
    sortable: false,

    editable: true,
    valueGetter: (params) =>
      `${params.row.HouseName || ""}\n${params.row.street || ""}\n${
        params.row.pin
      }, ${params.row.district}, ${params.row.state}`,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 96052184860,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    HouseName: "ijaba",
    street: "purakkad",
    pin: 673522,
    district: "calicut",
    state: "kerala",
    mobile: 9605218486,
  },
];

const DataTable = () => {
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;


