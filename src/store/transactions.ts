import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Category, CategoryApi, transactionApi } from "../types";

interface Transaction {
    category: CategoryApi[];
    editCategory: Category;
}

const initialState: Transaction = {
    category: [],
    editCategory: {
        title: '',
        type: '',
    }
}

export const setCategory = createAsyncThunk<void, Category>('transaction/Category', async (arg) => {
    await axiosApi.post('/categories.json', arg)
})

export const getCategory = createAsyncThunk<CategoryApi[]>('transaction/Category', async () => {
    const request = await axiosApi.get('/categories.json');

    const newCategory = Object.keys(request.data).map(id => {
        const category = request.data[id];
        return {
            ...category,
            id
        }
    });

    return newCategory;
})

export const deleteCategory = createAsyncThunk<void, string>('transaction/delete', async (id) => {
    await axiosApi.delete('/categories/' + id + '.json')
})

export const getOneType = createAsyncThunk<Category, string>('transaction/FetchOne', async (id) => {
    const request = await axiosApi.get('/categories/' + id + '.json')

    return request.data
})
interface forEdit {
    id: string;
    item: Category;
}
export const editCategory = createAsyncThunk<void, forEdit>('transaction/CategoryEdit', async (arg) => {
    await axiosApi.put('/categories/' + arg.id + '.json', arg.item)
})

export const setTransaction = createAsyncThunk<void, transactionApi>('transaction/Set', async (arg) => {
    await axiosApi.post('/transactions.json', arg)
})

export const salarySlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.category = action.payload;
        });
        builder.addCase(getOneType.fulfilled, (state, action) => {
            state.editCategory = action.payload;
        });
    }
});

export const transactionReducer = salarySlice.reducer;
export const categoryArray = (state: RootState) => state.transaction.category
export const editOneType = (state: RootState) => state.transaction.editCategory


