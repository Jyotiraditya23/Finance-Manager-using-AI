import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const Transactions = ({transactions, onMore, type, title}) => {
  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-semibold text-gray-800'>{title}</h5>
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
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default Transactions