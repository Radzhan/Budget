import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Category, CategoryApi, transactionApi, transactionObject, Transactions } from "../types";

interface Transaction {
    category: CategoryApi[];
    editCategory: Category;
    mainArray: Transactions[];
    type: transactionObject;
}

const initialState: Transaction = {
    category: [],
    editCategory: {
        title: '',
        type: '',
    },
    mainArray: [],
    type: {
        amounte: '',
        category: '',
        type: '',
    }
}

export const setCategory = createAsyncThunk<void, Category>('transaction/Category', async (arg) => {
    await axiosApi.post('/categories.json', arg)
});

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
});

export const deleteCategory = createAsyncThunk<void, string>('transaction/delete', async (id) => {
    await axiosApi.delete('/categories/' + id + '.json')
});

export const getOneType = createAsyncThunk<Category, string>('transaction/FetchOne', async (id) => {
    const request = await axiosApi.get('/categories/' + id + '.json')
    
    return request.data
});
interface forEdit {
    id: string;
    item: Category;
}
export const editCategory = createAsyncThunk<void, forEdit>('transaction/CategoryEdit', async (arg) => {
    await axiosApi.put('/categories/' + arg.id + '.json', arg.item)
});

export const setTransaction = createAsyncThunk<void, transactionApi>('transaction/Set', async (arg) => {
    await axiosApi.post('/transactions.json', arg)
});

export const getTransactionAndCategory = createAsyncThunk<Transactions[]>('transaction/FetchBoth', async () => {
    const request = await axiosApi.get('/categories.json')
    const requestTransaction = await axiosApi.get('/transactions.json')

    const finallArray: Transactions[] = []

    Object.keys(requestTransaction.data).map((transaction: string) => {
        const object = requestTransaction.data[transaction];

        return Object.keys(request.data).map(category => {
            if (object.category === category) {
                const Object: Transactions = {
                    amounte: requestTransaction.data[transaction].amounte,
                    title: request.data[category].title,
                    type: request.data[category].type,
                    date: requestTransaction.data[transaction].createdAt,
                    id: transaction,
                }
                finallArray.push(Object)
            }
        })
    })
    return finallArray.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0
    });
});

export const deleteTransaction = createAsyncThunk<void, string>('transaction/DeleteTransaction', async (id) => {
    await axiosApi.delete('/transactions/' + id + '.json');
});
interface forMainEdit {
    id: string;
    item: transactionObject;
}

export const editMain = createAsyncThunk<void, forMainEdit>('transaction/Edit', async (arg) => {
    await axiosApi.put('/transactions/' + arg.id + '.json', arg.item);
});

export const getMain = createAsyncThunk<transactionObject, string>('transaction/FetchMainOne', async (id) => {
    const request = await axiosApi.get('/transactions/' + id + '.json');
    console.log(request.data);
    return request.data;
});

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

        builder.addCase(getMain.fulfilled, (state, action) => {
            state.type = action.payload;
        });

        builder.addCase(getTransactionAndCategory.fulfilled, (state, action) => {
            state.mainArray = action.payload;
        });
    }
});

export const transactionReducer = salarySlice.reducer;
export const categoryArray = (state: RootState) => state.transaction.category;
export const mainArray = (state: RootState) => state.transaction.mainArray;
export const mainArrayType = (state: RootState) => state.transaction.type;
export const editOneType = (state: RootState) => state.transaction.editCategory;


