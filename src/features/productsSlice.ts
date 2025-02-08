import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product, ProductInput} from "../types";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../utils/storage/products";
import {RootState} from "../state";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: getProducts(),
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductInput>) => {
            state.products = createProduct(action.payload);
        },
        editProduct: (state, action: PayloadAction<ProductInput>) => {
            state.products = updateProduct(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = deleteProduct(action.payload);
        },
    },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (state: RootState, productId?: string) =>
    productId ? state.products.products.find(productItem => productItem.id === productId) || null : null;

export const {addProduct, editProduct, removeProduct} = productSlice.actions;
export default productSlice.reducer;