import React, { useEffect, useState } from "react";
import "./sales.scss";
import axios from "axios";
import AddSales from "../../components/addSales/AddSales";
import Table from "../../components/table/Table";

const fields = [
  { field: "customer", headerName: "Customer", type: "string" },
  { field: "product", headerName: "Product", type: "string" },
  { field: "date", headerName: "Date", type: "date" },
  { field: "quantity", headerName: "Quantity", type: "number" },
  { field: "totalAmount", headerName: "totalAmount", type: "number" },
  { field: "cashPaid", headerName: "cashPaid", type: "number" },
];

const columns = [
  { field: "id", header: "Id" },
  { field: "customer", header: "Customer" },
  { field: "product", header: "Product" },
  { field: "date", header: "Date" },
  { field: "quantity", header: "Quantity" },
  { field: "totalAmount", header: "TotalAmount" },
  { field: "cashPaid", header: "CashPaid" },
  { field: "balance", header: "Balance" },
];

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState([]);
  const [filter, setFilter] = useState("");

  const getSales = async () => {
    try {
      const res = await axios.get("/api/sales");
      setSales(res.data);
    } catch (error) {}
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await axios.post("/api/sales", {
        formData,
      });
      setSales((prevsales) => [...prevsales, res.data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = sales.filter((sale) =>
    sale.customer?.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="sales">
      <div className="info">
        <h1>Sales</h1>
        <div className="controlls">
          <input
            type="text"
            placeholder="Enter customer name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button onClick={() => setOpen(true)}>Create new Sale</button>
        </div>
      </div>
      {/* <DataTable /> */}
      <Table data={filteredCustomers} columns={columns} slug="sales" />
      {open && (
        <AddSales
          slug="sale"
          columns={fields}
          setOpen={setOpen}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Sales;
