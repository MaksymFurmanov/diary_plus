import { Order, OrderInput, ProductionProcess } from "../../types";
import { nanoid } from "@reduxjs/toolkit";

export const getOrders = (ordersRaw: string | null): Order[] => {
  return ordersRaw ? JSON.parse(ordersRaw) as Order[] : [];
};

export const getOrderById = (orders: Order[], orderId ? : string): Order | null => {
  return orderId ? orders.find(order => order.id === orderId) || null : null;
};

export const createOrder = (orders: Order[], orderInput: OrderInput): Order[] => {
  const id = nanoid();

  return [
        ...orders,
    {
      id,
      product_id: orderInput.product_id,
      production_process_id: null,
      customer: orderInput.customer,
      deadline: new Date(orderInput.deadline),
      done_date: null,
      volume: orderInput.volume,
      pallet_color: orderInput.pallet_color
        }
    ];
};

export const updateOrder = (orders: Order[], orderInput: OrderInput): Order[] => {
  return orders.map(order =>
    order.id === orderInput.id ?
    {
      ...order,
      product_id: orderInput.product_id,
      customer: orderInput.customer,
      deadline: new Date(orderInput.deadline),
      volume: orderInput.volume,
      pallet_color: orderInput.pallet_color
    } :
    order
  );
};

export const deleteOrder = (orders: Order[], orderId: string): Order[] => {
  return orders.filter(order => order.id !== orderId);
};

export const markProcessDone = (
  orders: Order[],
  orderId: string,
  productionProcess: ProductionProcess,
  productionProcesses: ProductionProcess[]
): Order[] => {
  return orders.map(order =>
    order.id === orderId ?
    {
      ...order,
      production_process_id: productionProcess.id,
      done_date: productionProcess.queue + 1 === productionProcesses.length ? new Date() : null
    } :
    order
  );
};