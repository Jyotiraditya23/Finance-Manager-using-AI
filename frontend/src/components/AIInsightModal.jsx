import React from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Activity, Target } from 'lucide-react';

const AIInsightModal = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const { summary, highlights, prediction, generatedAt } = data;
  
  if (!highlights) {
    return (
      <div className="text-center py-10 text-black-500">
        No insights available. Please try again.
      </div>
    );
  }

  const {
    currentMonthTotal,
    previousMonthTotal,
    percentageChange,
    categoryBreakdown,
    averageDailySpending,
    transactionCount
  } = highlights;

  const isIncrease = percentageChange > 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        
      {/* AI Summary Section */}
      {summary && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <div className="bg-purple-600 p-2 rounded-lg flex-shrink-0">
              <Activity className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Monthly Analysis
              </h3>
              <p className=" text-black dark:text-black leading-relaxed text-sm">
                {summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-blue-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Current Month
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(currentMonthTotal)}
          </p>
        </div>

        {/* Previous Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-gray-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Previous Month
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(previousMonthTotal)}
          </p>
        </div>

        {/* Percentage Change */}
        <div className={`rounded-lg p-4 border ${
          isIncrease 
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
            : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isIncrease ? (
              <TrendingUp size={16} className="text-red-600" />
            ) : (
              <TrendingDown size={16} className="text-green-600" />
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Change
            </span>
          </div>
          <p className={`text-2xl font-bold ${
            isIncrease ? 'text-red-600' : 'text-green-600'
          }`}>
            {isIncrease ? '+' : ''}{percentageChange?.toFixed(1)}%
          </p>
        </div>

        {/* Average Daily */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-purple-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Daily Average
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(averageDailySpending)}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryBreakdown && Object.keys(categoryBreakdown).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-base mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <Target size={18} className="text-purple-600" />
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => {
                const percentage = (amount / currentMonthTotal) * 100;
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {category}
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {percentage.toFixed(1)}% of total
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Next Month Prediction */}
      {prediction && (prediction.amount || prediction.reason) && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 p-2 rounded-lg flex-shrink-0">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-black">
                Next Month Prediction
              </h3>
              {prediction.amount && (
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                  {formatCurrency(parseInt(prediction.amount))}
                </p>
              )}
              {prediction.reason && (
                <p className="text-gray-700 dark:text-black leading-relaxed text-sm">
                  {prediction.reason}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Additional Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">Total Transactions:</span> {transactionCount}
        </div>
        {generatedAt && (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Generated: {formatDate(generatedAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightModal;