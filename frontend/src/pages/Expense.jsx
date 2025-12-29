import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import DeleteAlert from '../components/DeleteAlert';
import ExpenseOverview from '../components/ExpenseOverview';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import AIInsightModal from '../components/AIInsightModal';

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAIInsightModal, setOpenAIInsightModal] = useState(false);
  const [aiInsightData, setAiInsightData] = useState(null);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      console.log("Expense API Response:", response.data);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details", error);
      toast.error(error.response?.data?.message || "Failed to load expense data");
    } finally {
      setLoading(false);
    }
  }

  // Get AI Recommendations - Call both endpoints
  const handleGetAIRecommendations = async () => {
    setAiLoading(true);
    try {
      // Call both endpoints in parallel
      const [insightResponse, predictionResponse] = await Promise.all([
        axiosConfig.get(API_ENDPOINTS.AI_EXPENSE_INSIGHT),
        axiosConfig.get(API_ENDPOINTS.AI_EXPENSE_PREDICTION)
      ]);

      if (insightResponse.status === 200 && predictionResponse.status === 200) {
        // Combine both responses into one object
        const combinedData = {
          ...insightResponse.data,
          prediction: predictionResponse.data
        };
        
        setAiInsightData(combinedData);
        setOpenAIInsightModal(true);
        toast.success("AI insights generated successfully!");
      }
    } catch (error) {
      console.error("Failed to fetch AI insights", error);
      toast.error(error.response?.data?.message || "Failed to generate AI insights");
    } finally {
      setAiLoading(false);
    }
  }

  //delete expense
  const deleteExpense = async(id) => {
    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error in deleting expense ",error );
      toast.error("Error in deleting expense");
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch expense categories:", error);
      toast.error(error.response?.data?.message || "Failed to fetch expense categories");
    }
  }

  // Save the expense details
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    // Validation
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      
      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.log("Error adding expense", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  }

  const handleDownloadExpenseDetails = async() => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType : "blob"});
      let filename = "expense_details.xlsx"
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded expense details successfully");

    } catch (error) {
      console.error("Error downloading expense details: ",error);
      toast.error("Failed to download expense");
    }
  }

  const handleEmailExpenseDetails = async() => {
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if(response.status === 200){
        toast.success("Expense details emailed successfully");
      }
    }catch(error){
      console.error("Error emailing expense details: ", error);
      toast.error("Failed to email expense");
    } 
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Expense">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              {/* overview of expense with line chart */}
              <ExpenseOverview 
                transactions={expenseData} 
                onAddExpense={() => setOpenAddExpenseModal(true)}
                onGetRecommendations={handleGetAIRecommendations}
                loading={aiLoading}
              />
            </div>

            <ExpenseList 
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({show:true, data:id})}
              onDownload={handleDownloadExpenseDetails}
              onEmail={handleEmailExpenseDetails}
            />

            {/* add expense modal */}
            <Modal
              isOpen={openAddExpenseModal}
              onClose={() => setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              <AddExpenseForm
                onAddExpense={(expense) => handleAddExpense(expense)}
                categories={categories}
              />
            </Modal>

            {/* Delete Expense modal */}
            <Modal 
              isOpen={openDeleteAlert.show}
              onClose={()=> setOpenDeleteAlert({show:false ,data:null})}
              title="Delete Expense"
            >
              <DeleteAlert
                content="Are you sure you want to delete this expense details? "
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>

            {/* AI Insight Modal */}
            <Modal
              isOpen={openAIInsightModal}
              onClose={() => setOpenAIInsightModal(false)}
              title="AI Expense Insights"
            >
              <AIInsightModal data={aiInsightData} />
            </Modal>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Expense