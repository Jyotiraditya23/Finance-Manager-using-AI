import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, color, showTextAnchor }) => {
  // Custom label for center text
  const renderCenterLabel = () => {
    return (
      <g>
        <text x="50%" y="35%" textAnchor="middle" fontSize="14" fill="#666" fontWeight="500">
          {label}
        </text>
        <text x="50%" y="42%" textAnchor="middle" fontSize="20" fill="#333" fontWeight="700">
          {totalAmount}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold text-sm mb-1">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-2 mt-4">
        {payload.map((entry, index) => {
          const matchingData = data.find(item => item.name === entry.value);
          return (
            <li key={`legend-${index}`} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">{entry.value}</span>
              <span className="ml-auto font-semibold text-gray-900">
                ₹{matchingData ? matchingData.amount.toLocaleString('en-IN') : '0'}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          {showTextAnchor && renderCenterLabel()}
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;