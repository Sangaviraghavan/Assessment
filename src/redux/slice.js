import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    schemas: [],
    availableSchemas: [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ],
    loader: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        addSchema: (state, action) => {
            const schema = state.availableSchemas.find(s => s.value === action.payload);
            if (schema) {
                state.schemas.push(schema);
                state.availableSchemas = state.availableSchemas.filter(s => s.value !== action.payload);
            }
        },
        removeSchema: (state, action) => {
            const removedSchema = state.schemas[action.payload];
            state.schemas.splice(action.payload, 1);
            state.availableSchemas.push(removedSchema);
        },
        resetForm: (state) => {
            state.name = '';
            state.schemas = [];
            state.availableSchemas = initialState.availableSchemas;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { setName, addSchema, removeSchema, resetForm, setLoader } = categorySlice.actions;

export default categorySlice.reducer;
