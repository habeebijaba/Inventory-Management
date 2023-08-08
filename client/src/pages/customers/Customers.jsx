import React, { useEffect, useRef, useState } from "react";
import "./customers.scss";
import axios from "axios";
import Add from "../../components/add/Add";
import Table from "../../components/table/Table";

const fields = [
  { field: "name", headerName: "Name", type: "string" },
  { field: "email", headerName: "Email", type: "email" },
  { field: "mobile", headerName: "Mobile", type: "number" },
  { field: "house", headerName: "House", type: "string" },
  { field: "street", headerName: "Street", type: "string" },
  { field: "pincode", headerName: "Pincode", type: "number" },
  { field: "district", headerName: "District", type: "string" },
  { field: "state", headerName: "State", type: "string" },
];

const columns = [
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
  { field: "mobile", header: "Mobile" },
  { field: "address", header: "Address" },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  // const printRef = useRef(null);
  // const printRef = useRef(null);

  const getCustomers = async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await axios.post("/api/customers", {
        formData,
      });
      setCustomers((prevcustomers) => [...prevcustomers, res.data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Customers</h1>
        <div className="controlls">
          <input
            type="text"
            placeholder="Enter customer name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button onClick={() => setOpen(true)}>Add new Customer</button>
        </div>
      </div>
      {/* <DataTable /> */}
      <Table data={filteredCustomers} columns={columns} slug="users" />
      {open && (
        <Add
          slug="customer"
          columns={fields}
          setOpen={setOpen}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Customers;
