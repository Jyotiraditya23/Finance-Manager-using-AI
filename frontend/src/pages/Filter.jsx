import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'
import { Search } from 'lucide-react';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import TransactionInfoCard from '../components/TransactionInfoCard';
import moment from 'moment';

const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER,{
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      console.log("Transactions: ", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log("error in fetching filter information");
      toast.error("Error in applying filter");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div>
      <Dashboard activeMenu="Filters">
        <div className='p-6 max-w-7xl mx-auto'>
          {/* Header */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Filter Transactions</h2>
          </div>
          
          {/* Filter Card */}
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6'>
            <div className='flex items-center justify-between mb-6'>
              <h5 className='text-lg font-semibold text-gray-800'>Select the Filters</h5>
            </div>
            
            <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="type">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="startDate">Start Date</label>
                <input
                  id="startdate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor="endDate">End Date</label>
                <input
                  id="enddate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              
              <div>
                <label htmlFor="sortfield" className='block text-sm font-medium text-gray-700 mb-2'>Sort Field</label>
                <select
                  value={sortField}
                  id="sortfield"
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  onChange={(e)=> setSortField(e.target.value)}
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sortOrder" className='block text-sm font-medium text-gray-700 mb-2'>Sort Order</label>
                <select
                  id="sortorder"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              
              <div className='sm:col-span-3 md:col-span-6 lg:col-span-1 flex items-end'>
                <div className='flex w-full gap-2'>
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className='flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                  <button 
                    onClick={handleSearch} 
                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center'
                    disabled={loading}
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Transactions Results */}
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
            <div className='mb-4'>
              <h5 className='text-lg font-semibold text-gray-800'>Transactions</h5>
            </div>
            
            {loading ? (
              <div className='text-center py-8'>
                <p className='text-gray-500'>Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-gray-500'>Select the filters and click apply to filter the transactions</p>
              </div>
            ) : (
              <div className='space-y-3'>
                {transactions.map((transaction) => (
                  <TransactionInfoCard
                    key={transaction.id}
                    title={transaction.name}
                    icon={transaction.icon}
                    date={moment(transaction.date).format('Do MMM YYYY')}
                    amount={transaction.amount}
                    type={transaction.type}
                    hideDeleteBtn
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Filter