import { Material } from "../types";

const materials: Material[] = [
    {
        id: "0",
        name: "1L Milk, Whole",
        supplier: "Bočkového L. Farm",
        volume: 14,
        per_pallet: 10,
        date_of_order: new Date("05.11.2023"),
        arriving_date: new Date("09.11.2023"),
        pallet_color: "#81FFBB"
    },
    {
        id: "1",
        name: "1L Milk, Whole",
        supplier: "Zelené právo Farm",
        volume: 24,
        per_pallet: 10,
        date_of_order: new Date("05.11.2023"),
        arriving_date: new Date("09.11.2023"),
        pallet_color: "#81D2FF"
    },
    {
        id: "2",
        name: "1L Milk, Whole",
        supplier: "Orlová M. Farm",
        volume: 16,
        per_pallet: 10,
        date_of_order: new Date("05.11.2023"),
        arriving_date: new Date("09.11.2023"),
        pallet_color: "#DE81FF"
    },
    {
        id: "3",
        name: "1L Milk, Whole",
        supplier: "Orlová M. Farm",
        volume: 20,
        per_pallet: 10,
        date_of_order: new Date("05.11.2023"),
        arriving_date: null,
        pallet_color: "#F04C6A"
    }
];

export default materials;