import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import axios from "axios";

const columns = [
  { field: "id", header: "ID" },
  { field: "customer", header: "Customer" },
  { field: "date", header: "Date" },
  { field: "quantity", header: "Quantity" },
  { field: "totalAmount", header: "TotalAmount" },
  { field: "cashPaid", header: "CashPaid" },
  { field: "balance", header: "Balance" },
];

const Product = () => {
  const [report, setReport] = useState([]);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const productName = report[0]?.product;

  const getProductSalesReport = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}`);
      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductSalesReport();
  }, []);

  return (
    <div style={{ height: "100vh", marginTop: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "300" }}>
          Product sale
        </h1>
        <h1
          style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "300" }}>
          Product : {productName}
        </h1>
      </div>
      <Table data={report} columns={columns} />
    </div>
  );
};

export default Product;
