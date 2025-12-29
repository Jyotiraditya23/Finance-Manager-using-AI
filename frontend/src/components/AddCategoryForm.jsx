import React, { useEffect, useState } from 'react'
import Input from './Input'
import EmojiPickerPopup from './EmojiPickerPopup'
import LoadingCircle from './LoadingCircle';

const AddCategoryForm = ({onAddCategory,initialCategoryData,isEditing}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData)
        }else{
            setCategory({name:"", type:"income",icon:""});
        }
    },[isEditing, initialCategoryData]);


    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ];

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
            setCategory({ name: "", type: "income", icon: "" }); // optional reset
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                label="Category Name"
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />
            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={loading}
                    className='add-btn add-btn-fill'
                >
                    {loading ? (
                        <>
                            <LoadingCircle className="w-4 h-4 animate-spin" /> 
                            {isEditing ? 'Editing...' : 'adding...'}
                        </>
                    ) : (
                        <>{isEditing ? 'Edit Ctegory' : 'Add Category'}</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;
