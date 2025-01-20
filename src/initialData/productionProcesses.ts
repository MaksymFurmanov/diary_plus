import {ProductionProcess} from "../types";

const productionProcesses: ProductionProcess[] = [
    {
        id: "0",
        product_id: "1",
        department_id: "3",
        name: "Testing of raw materials",
        queue: 0,
        done_name: "Tested raw materials"
    },
    {
        id: "1",
        product_id: "1",
        department_id: "1",
        name: "Transport of raw materials",
        queue: 1,
        done_name: "Prepared raw materials"
    },
    {
        id: "2",
        product_id: "1",
        department_id: "0",
        name: "Separation",
        queue: 2,
        done_name: "Separation completed"
    },
    {
        id: "3",
        product_id: "1",
        department_id: "0",
        name: "Standardization",
        queue: 3,
        done_name: "Standardization completed"
    },
    {
        id: "4",
        product_id: "1",
        department_id: "0",
        name: "Homogenization and heat treatment",
        queue: 4,
        done_name: "Heat treatment completed"
    },
    {
        id: "5",
        product_id: "1",
        department_id: "3",
        name: "Packaging and labeling",
        queue: 5,
        done_name: "Packaged"
    }
];

export default productionProcesses;