import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import axios from "axios";
import "./reports.scss";
import "react-datepicker/dist/react-datepicker.css";
import FilterModal from "../../components/filterModal/FilterModal";

const columns = [
  { field: "field", header: "Frequency" },
  { field: "numProductsSold", header: "Products Sold" },
  { field: "numSales", header: "Total Sales" },
  { field: "totalRevenue", header: "Total Revenue" },
  { field: "averageRevenue", header: "Average Revenue" },
  { field: "newCustomers", header: "New Customers" },
  { field: "newProducts", header: "New Products" },
];

const columns2 = [
  { field: "id", header: "Id" },
  { field: "customer", header: "Customer" },
  { field: "product", header: "Product" },
  { field: "date", header: "Date" },
  { field: "quantity", header: "Quantity" },
  { field: "totalAmount", header: "TotalAmount" },
  { field: "cashPaid", header: "CashPaid" },
  { field: "balance", header: "Balance" },
];

const Reports = () => {
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const handleFilter = () => {
    const filteredSales = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });

    setFilteredData(filteredSales);
    setIsFilterModalOpen(false);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const fetchProductsAndCustomers = async () => {
    try {
      const [salessResponse, reportResponse] = await Promise.all([
        await axios.get("/api/sales"),
        await axios.get("/api/reports/salesReports"),
      ]);
      setSales(salessResponse.data);
      setFilteredData(salessResponse.data);
      setData(reportResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsAndCustomers();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div className="heading">
        <h1 style={{ marginBottom: "20px", fontSize: "24px" }}>
          Quick Analysis
        </h1>
      </div>
      <Table data={data} columns={columns} />
      <div className="heading">
        <h1></h1>
        <h1 style={{ marginBottom: "20px", fontSize: "24px" }}>
          Filtered Report
        </h1>
        <button onClick={() => setIsFilterModalOpen(true)}>
          Filter by date
        </button>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        startDate={startDate}
        handleStartDate={handleStartDate}
        endDate={endDate}
        handleEndDate={handleEndDate}
        handleFilter={handleFilter}
      />
      <Table data={filteredData} columns={columns2} slug="sales" />
    </div>
  );
};

export default Reports;
