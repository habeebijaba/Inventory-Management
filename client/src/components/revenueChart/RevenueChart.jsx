import React, { useEffect, useState } from "react";
import "./revenueChart.scss";
import axios from "axios";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueChart = () => {
  const [data, serData] = useState([]);

  const getRevenueAnalysisData = async () => {
    try {
      const res = await axios.get("/api/reports/revenueAnalysis");
      serData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRevenueAnalysisData();
  }, []);

  return (
    <div className="revenueChartBox">
      <h1>Revenue Analysis</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            // width={500}
            // height={400}
            data={data}
            margin={{
              top: 15,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="electronic"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
