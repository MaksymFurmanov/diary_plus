import {Order, OrderInput, ProductionProcess} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import {getProductionProcessesByProduct} from "./productionProcesses";

export const getOrders = (): Order[] => {
    const ordersRaw = localStorage.getItem("orders");
    return ordersRaw ? JSON.parse(ordersRaw) as Order[] : [];
};

export const createOrder = (orderInput: OrderInput): Order[] => {
    const orders = getOrders();
    const id = nanoid();

    const newOrder: Order = {
        id,
        product_id: orderInput.product_id,
        production_process_id: null,
        customer: orderInput.customer,
        deadline: new Date(orderInput.deadline),
        done_date: null,
        volume: orderInput.volume,
        pallet_color: orderInput.pallet_color
    };

    const updatedOrders = [...orders, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return updatedOrders;
};

export const updateOrder = (orderInput: OrderInput): Order[] => {
    const orders = getOrders();
    const oldOrder = orders.find((order) => order.id === orderInput.id);
    if (!oldOrder) throw new Error("The order not found");

    const updatedOrders = orders.map((order) =>
        order.id === orderInput.id
            ? {
                ...order,
                product_id: orderInput.product_id,
                production_process_id: oldOrder.production_process_id,
                customer: orderInput.customer,
                deadline: new Date(orderInput.deadline),
                done_date: oldOrder.done_date,
                volume: orderInput.volume,
                pallet_color: orderInput.pallet_color
            }
            : order
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return updatedOrders;
};

export const deleteOrder = (orderId: string): Order[] => {
    const orders = getOrders();
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    if (updatedOrders.length === orders.length) throw new Error("The order not found");

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return updatedOrders;
};

export const markDone = (orderId: string, productionProcess: ProductionProcess): Order[] => {
    const orders = getOrders();
    const order = orders.find(order => order.id === orderId) || null
    if (!order) throw new Error("Order not found");

    const productionProcesses = getProductionProcessesByProduct(order.product_id);
    if (!productionProcesses) throw new Error("Production process not found");

    const isDone = productionProcess.queue + 1 === productionProcesses.length;

    const updatedOrders = orders.map((orderItem) =>
        orderItem.id === orderId
            ? {
                ...orderItem,
                production_process_id: productionProcess.id,
                done_date: isDone ? new Date() : null
            }
            : orderItem
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return updatedOrders;
};