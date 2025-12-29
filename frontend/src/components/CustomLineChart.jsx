import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center">
        No data available
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* X-axis uses month or date (whichever you prefer) */}
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`₹${value}`, "Total Amount"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        {/* The key here must match 'totalAmount' */}
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
