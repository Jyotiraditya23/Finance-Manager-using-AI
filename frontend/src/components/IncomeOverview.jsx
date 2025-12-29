import React, { useEffect, useState } from "react";
import CustomAreaChart from "./CustomAreaChart";
import { Plus } from "lucide-react";
import { prepareIncomeLineChartData } from "../utils/utils";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log("Chart results:", result);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Add Income Button */}
          <button
            className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-gray-700 disabled:border-gray-400"
            onClick={onAddIncome}
          >
            <Plus size={15} /> Add Income
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-10">
        <CustomAreaChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;