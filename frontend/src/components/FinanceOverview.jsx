import React from 'react'
import { odinNumberSeparator } from '../utils/utils';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
  const COLORS = ["#59168B","#a0090e","#016630"];
  const balanceData = [
    {name : "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expense", amount: totalExpense},
  ];
  
  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold text-gray-800'>Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${odinNumberSeparator(totalBalance)}`}
        color={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview