import { Order } from "../types";

const orders: Order[] = [
    {
        id: "0",
        product_id: "0",
        production_process_id: "0",
        customer: "Kaufland",
        volume: 200,
        deadline: new Date("2023-10-26"),
        done_date: new Date("2023-11-02"),
        pallet_color: "#E32A4B",
    },
    {
        id: "1",
        product_id: "1",
        production_process_id: "1",
        customer: "Lidl",
        volume: 200,
        deadline: new Date("2023-10-26"),
        done_date: new Date("2023-11-02"),
        pallet_color: "#F9CC5A",
    },
    {
        id: "2",
        product_id: "2",
        production_process_id: "2",
        customer: "Kaufland",
        volume: 200,
        deadline: new Date("2023-10-26"),
        done_date: new Date("2023-11-02"),
        pallet_color: "#9DB3FF",
    }
];

export default orders;