import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategorModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //fetch category details
  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // to constantly update category
  useEffect(() => {
    fetchCategoryDetails();
  }, []);


  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    // check if category already exists
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    });

    if (isDuplicate) {
      toast.error("Category name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });

      //used to add ctegory
      if (response.status === 200 || response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category", error);
      toast.error(error.response?.data?.message || "failed to add category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategorModal(true);
  }

  const handleUpdateCategory = async(updatedCategory) => {
     const {id, name, type, icon} = updatedCategory;
     if(!name.trim()){
      toast.error("Category name is required");
      return;
     }
     if(!id){
      toast.error("Category ID is missing for updates");
      return;
     }

     try{
      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name, type, icon});
      setOpenEditCategorModal(false);
      setSelectedCategory(null);
      toast.success("Category added successfully");
      fetchCategoryDetails();
     }catch(error) {
        console.error("Error updating category:", error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Failed to update category"); 
     }
  }
  return (
    <div>
      <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto">
          {/* add button to add category */}
          <div className=" flex justify-between items-center mb-5">
            <h2 className=" text-2xl font-semibold">All Categories</h2>
            <button
              onClick={() => setOpenAddCategoryModal(true)}
              className="bg-green-200 border border-green-500 text-green-800 px-1 py-1 rounded-md flex items-center gap-1 transition-colors duration-200 hover:bg-green-300 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400">
              <Plus size={15} />
              Add Category
            </button>
          </div>

          {/* Category list  */}
          <CategoryList
            Categories={categoryData}
            onEditCategory={handleEditCategory}
          />

          {/* Adding category modal */}
          <Modal
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
            tittle="Add Category"
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>
          {/* updating category modal */}
          <Modal
            isOpen={openEditCategoryModal}
            onClose={() =>{
              setOpenEditCategorModal(false);
              setSelectedCategory(null);
            }}
            tittle="Edit Category"
          >
            <AddCategoryForm 
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpdateCategory}
              isEditing={true}
            />
          </Modal>
        </div>
      </Dashboard>
    </div>
  );
};

export default Category;
