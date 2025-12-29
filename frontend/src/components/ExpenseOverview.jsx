import React, { useEffect, useState } from "react";
import CustomAreaChart from "./CustomAreaChart";
import { Plus, Sparkles } from "lucide-react";
import { prepareIncomeLineChartData } from "../utils/utils";

const ExpenseOverview = ({ transactions, onAddExpense, onGetRecommendations, loading }) => {
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
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-1">
            Track your spending over time and analyze your expense patterns.
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* AI Recommendations Button */}
          <button
            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-purple-500 disabled:border-gray-400"
            onClick={onGetRecommendations}
            disabled={loading}
          >
            <Sparkles size={15} />
            {loading ? 'Generating...' : 'AI Recommendations'}
          </button>

          {/* Add Expense Button */}
          <button
            className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-gray-700 disabled:border-gray-400"
            onClick={onAddExpense}
          >
            <Plus size={15} /> Add Expense
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

export default ExpenseOverview;