import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createOrder, deleteOrder, getOrders, markDone, updateOrder} from "../utils/storage/orders";
import {Order, OrderInput, ProductionProcess} from "../types";
import {RootState} from "../state";

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: getOrders(),
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderInput>) => {
            state.orders = createOrder(action.payload);
        },
        editOrder: (state, action: PayloadAction<OrderInput>) => {
            state.orders = updateOrder(action.payload);
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            state.orders = deleteOrder(action.payload);
        },
        markProcessDone: (state, action: PayloadAction<{ orderId: string; productionProcess: ProductionProcess }>) => {
            state.orders = markDone(action.payload.orderId, action.payload.productionProcess);
        },
    },
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderById = (state: RootState, orderId?: string) =>
    orderId ? state.orders.orders.find(orderItem => orderItem.id === orderId) || null : null;

export const {addOrder, editOrder, removeOrder, markProcessDone} = orderSlice.actions;
export default orderSlice.reducer;