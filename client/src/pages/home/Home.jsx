import React, { useEffect, useState } from "react";
import "./home.scss";
import TopDeals from "../../components/topDeals/TopDeals";
import ChartBox from "../../components/chartBox/ChartBox";
// import { chartBoxUser, chartBoxProduct, chartBoxRevenue } from "../../data.js";
import RevenueChart from "../../components/revenueChart/RevenueChart";
import axios from "axios";

const Home = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalProducts, settotalProducts] = useState([]);
  const [totalSales, settotalSales] = useState([]);
  const [totalRevenue, settotalRevenue] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState([]);
  const [todaySales, setTodaySales] = useState([]);

  const fetchProductsAndCustomers = async () => {
    try {
      const [
        totalUsersResponse,
        totalProductsResponse,
        totalSalesResponse,
        totalRevenueResponse,
        todayRevenueResponse,
        todaySalesResponse,
      ] = await Promise.all([
        axios.get("/api/reports/totalUsers"),
        axios.get("/api/reports/totalProducts"),
        axios.get("/api/reports/totalSales"),
        axios.get("/api/reports/totalRevenue"),
        axios.get("/api/reports/todayRevenue"),
        axios.get("/api/reports/todaySales"),
      ]);
      setTotalUsers(totalUsersResponse.data);
      settotalProducts(totalProductsResponse.data);
      settotalSales(totalSalesResponse.data);
      settotalRevenue(totalRevenueResponse.data);
      setTodayRevenue(todayRevenueResponse.data);
      setTodaySales(todaySalesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsAndCustomers();
  }, []);

  return (
    <div className="home">
      <div className="box box2">
        <ChartBox {...totalUsers} />
      </div>
      <div className="box box3">
        <ChartBox {...totalProducts} />
      </div>
      <div className="box box1">
        <ChartBox {...totalSales} />
      </div>
      <div className="box box2">
        <ChartBox {...totalRevenue} />
      </div>
      <div className="box box3">
        <ChartBox {...todayRevenue} />
      </div>
      <div className="box box1">
        <ChartBox {...todaySales} />
      </div>
      <div className="box box4">
        <TopDeals />
      </div>
      <div className="box box5">
        <RevenueChart />
      </div>
    </div>
  );
};

export default Home;
