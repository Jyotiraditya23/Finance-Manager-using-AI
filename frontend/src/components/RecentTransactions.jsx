import { ArrowRight, Key } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onMore}) => {
  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg font-semibold text-gray-800'>
          Recent Transactions
        </h4>
        <button 
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200' 
          onClick={onMore}
        >
          More <ArrowRight className='text-base' size={15} />
        </button>
      </div>
      <div className='mt-6 space-y-3'>
        {transactions?.slice(0,5)?.map(item => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions