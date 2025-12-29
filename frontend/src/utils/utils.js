

export const odinNumberSeparator = (num) => {
    // Convert number to string to handle decimals [web:4]
    if (num === null || num === undefined) return ''; // [web:4]
  
    const numStr = String(num); // [web:4]
    const parts = numStr.split('.'); // Split into integer and fractional parts [web:4]
    let integerPart = parts[0]; // [web:4]
    let fractionalPart = parts[1]; // [web:4]
  
    // Regex for Indian numbering system [web:4]
    // It keeps the first three digits, then every two digits [web:4]
    const lastThree = integerPart.substring(integerPart.length - 3); // [web:4]
    const otherNumbers = integerPart.substring(0, integerPart.length - 3); // [web:4]
  
    if (otherNumbers !== '') {
      // Apply commas after every two digits for the otherNumbers* [web:4]
      const formattedOther = otherNumbers.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,'); // [web:4]
      integerPart = formattedOther + ',' + lastThree; // [web:4]
    } else {
      integerPart = lastThree; // No change if less than 4 digits [web:4]
    }
  
    // Combine integer and fractional parts [web:4]
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart; // [web:4]
  }


  

  // Helper function to prepare income line chart data
  // utils/utils.js
export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  // Group incomes by date
  const grouped = transactions.reduce((acc, t) => {
    const dateKey = t.date; // "2025-07-06"
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        totalAmount: 0,
        items: [],
        month: formatDate(new Date(dateKey))
      };
    }

    acc[dateKey].totalAmount += Number(t.amount) || 0;
    acc[dateKey].items.push(t);

    return acc;
  }, {});

  // Convert to array and sort by date ascending
  return Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};

// Helper to format month like "6th Jul"
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "";
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} ${month}`;
};

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
