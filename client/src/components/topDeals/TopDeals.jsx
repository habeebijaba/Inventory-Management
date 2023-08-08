import React, { useEffect, useState } from "react";
import "./topDeals.scss";
import { topDealUsers } from "../../data.js";
import axios from "axios";

const TopDeals = () => {
  const [report, setReport] = useState([]);

  const getCustomerSalesReport = async () => {
    try {
      const res = await axios.get("/api/reports/topDeals");
      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomerSalesReport();
  }, []);

  return (
    <div className="cardContainer">
      <h1>Top Deals</h1>
      <div className="list">
        {report.map((user) => (
          <div className="listItem" key={user._id}>
            <div className="user">
              <img className="avatar" src="/avatar1.png" alt="" />
              <div className="username">
                <span>{user.name}</span>
              </div>
            </div>
            <span className="amount">₹ {user.totalPurchaseAmount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
