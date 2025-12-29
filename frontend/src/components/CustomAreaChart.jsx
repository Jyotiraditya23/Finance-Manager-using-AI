import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomAreaChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center">
        No data available
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <defs>
          {/* Gradient fill for the area */}
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`₹${value}`, "Total Amount"]}
          labelFormatter={(label) => `Date: ${label}`}
        />

        {/* Replace Line with Area */}
        <Area
          type="monotone"
          dataKey="totalAmount"
          stroke="#4F46E5"
          fillOpacity={1}
          fill="url(#colorIncome)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
