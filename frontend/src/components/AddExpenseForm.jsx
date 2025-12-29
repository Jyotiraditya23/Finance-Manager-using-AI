import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from './Input'
import LoadingCircle from './LoadingCircle'

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={expense.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label="Expense source"
        placeholder="e.g., Salary, FreeLance, Bonus"
        type="text"
      />
      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        label="Amount"
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        placeholder="e.g., 500.00"
        type="number"
      />
      <Input
        label="Date"
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        placeholder=""
        type="date"
      />
      <div className='flex justify-end mt-6'>
        <button
          onClick={handleAddExpense}
          className='add-btn add-btn-fill'
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingCircle className='w-4 h-4 animate-spin' />
              Adding...
            </>
          ) : (
            <>
              Add Expense
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;