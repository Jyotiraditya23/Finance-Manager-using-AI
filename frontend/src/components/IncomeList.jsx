import { Download, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-gray-700 disabled:border-gray-400"
            onClick={handleEmail}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} />
                Email
              </>
            )}
          </button>
          <button
            disabled={loading}
            className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-black hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-gray-700 disabled:border-gray-400"
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* Income List */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income.id || income._id} // supports both API formats
              title={income.name}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income.id || income._id)}
            />
          ))
        ) : (
          <p className="text-gray-400 mt-3">No income added yet.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
