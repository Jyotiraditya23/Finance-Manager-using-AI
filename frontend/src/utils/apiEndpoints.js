export const BASE_URL = "https://managerai-latest.onrender.com/api/v1.0";
// export const BASE_URL = "http://localhost:8080/api/v1.0"
const CLOUDINARY_CLOUD_NAME="dafpv5o10";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO:"/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    GET_ALL_EXPENSES: "/expenses",
    CATEGORY_BY_TYPE : (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    ADD_EXPENSE: "/expenses",
    DELETE_INCOME:(incomeId) => `/incomes/${incomeId}`,
    DELETE_EXPENSE:(expenseId) => `/expenses/${expenseId}`,
    INCOME_EXCEL_DOWNLOAD: "excel/download/income",
    EXPENSE_EXCEL_DOWNLOAD: "excel/download/expense",
    EMAIL_INCOME: "/email/income-excel",
    EMAIL_EXPENSE: "/email/expense-excel",
    APPLY_FILTER: "/filter",
    DASHBOARD_DATA: "/dashboard",
    AI_EXPENSE_INSIGHT:"/insights/monthly",
    AI_EXPENSE_PREDICTION:"/insights/prediction",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}