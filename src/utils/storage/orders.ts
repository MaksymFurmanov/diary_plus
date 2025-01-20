import {Order, OrderInput, ProductionProcess} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import {getProductionProcessesByProduct} from "./productionProcesses";

export const getOrders = (): Order[] | null => {
    const departmentsRaw = localStorage.getItem("departments");
    if (!departmentsRaw) return null;
    return JSON.parse(departmentsRaw) as Order[];
}

export const getOrderById = (orderId?: string): Order | null => {
    if(!orderId) return null;
    const ordersRaw = localStorage.getItem("orders");
    if (!ordersRaw) throw new Error("DashboardPage not found");

    const data: Order[] = JSON.parse(ordersRaw) as Order[];
    return data.find((order) => order.id === orderId) || null;
}

export const createOrder = (orderInput: OrderInput): void => {
    const ordersRaw = localStorage.getItem("orders");

    let data: Order[] = ordersRaw
        ? JSON.parse(ordersRaw) as Order[]
        : [];

    const id = nanoid();

    data.push({
        id: id,
        product_id: orderInput.product_id,
        production_process_id: null,
        customer: orderInput.customer,
        deadline: new Date(orderInput.deadline),
        done_date: null,
        volume: orderInput.volume,
        pallet_color: orderInput.pallet_color
    } as Order);

    localStorage.setItem("orders", JSON.stringify(data));
}

export const updateOrder = (orderInput: OrderInput): void => {
    const ordersRaw = localStorage.getItem("orders");
    if (!ordersRaw) throw new Error("DashboardPage not found");

    let data: Order[] = JSON.parse(ordersRaw) as Order[];

    const oldOrder = data.find((order) => order.id === orderInput.id);
    if (!oldOrder) throw new Error("The order not found");

    data = data.map((order: Order) => {
        if (order.id === orderInput.id) {
            return {
                id: oldOrder.id,
                product_id: orderInput.product_id,
                production_process_id: oldOrder.production_process_id,
                customer: orderInput.customer,
                deadline: new Date(orderInput.deadline),
                done_date: oldOrder.done_date,
                volume: orderInput.volume,
                pallet_color: orderInput.pallet_color
            } as Order;
        }

        return order;
    });

    localStorage.setItem("orders", JSON.stringify(data));
}

export const deleteOrder = (orderId: string): void => {
    const ordersRaw = localStorage.getItem("orders");
    if (!ordersRaw) throw new Error("DashboardPage not found");

    let data: Order[] = JSON.parse(ordersRaw) as Order[];

    const orderExists = data.some((order) => order.id === orderId);
    if (!orderExists) throw new Error("The order not found");

    data = data.filter((order: Order) =>
        order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(data));
}

export const markProcessDone = (
    orderId: string,
    productionProcess: ProductionProcess
) => {
    const orders = getOrders();
    if (!orders) return null;

    const order = getOrderById(orderId);
    if(!order) return null;

    const productionProcesses = getProductionProcessesByProduct(order.product_id);
    if (!productionProcesses) return null;

    const data = orders.map((orderItem) => {
        if (orderItem.id === orderId) {
            return {
                ...orderItem,
                production_process_id: productionProcess.id,
                done_date: productionProcess.queue + 1 === productionProcesses.length
                    ? new Date() : null
            }
        }

        return orderItem;
    });

    localStorage.setItem("orders", JSON.stringify(data))
}