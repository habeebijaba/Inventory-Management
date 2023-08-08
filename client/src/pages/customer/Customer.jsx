import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import axios from "axios";

const columns = [
  { field: "id", header: "ID" },
  { field: "product", header: "Product" },
  { field: "image", header: "Image" },
  { field: "date", header: "Date" },
  { field: "quantity", header: "Quantity" },
  { field: "totalAmount", header: "TotalAmount" },
  { field: "cashPaid", header: "CashPaid" },
  { field: "balance", header: "Balance" },
];

const Customer = () => {
  const [report, setReport] = useState([]);
  const location = useLocation();
  const customerId = location.pathname.split("/")[2];
  const customerName = report[0]?.customer;

  const getCustomerSalesReport = async () => {
    try {
      const res = await axios.get(`/api/customers/${customerId}`);
      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomerSalesReport();
  }, []);

  return (
    <div style={{height:"100vh",marginTop:"10px"}}>
      <div  style={{display:"flex",justifyContent:"space-between"}} >
      <h1 style={{marginBottom:"20px",fontSize: "20px",fontWeight:"300"}}>Customer purchase</h1>

        <h1 style={{marginBottom:"20px",fontSize: "24px",fontWeight:"300"}} >Customer : {customerName}</h1>

      </div>
      <Table data={report} columns={columns} />
    </div>
  );
};

export default Customer;
