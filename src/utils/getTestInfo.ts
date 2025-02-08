import {MaterialsTest, ProductsTest, TestDisplayData} from "../types";
import store from "../state";
import {selectMaterialById} from "../features/materialsSlice";
import {selectOrderById} from "../features/ordersSlice";
import {selectProductById} from "../features/productsSlice";

const getTestInfo = (
    test: MaterialsTest | ProductsTest,
    laboratory: 1 | 2
): TestDisplayData => {
    const state = store.getState();

    if (laboratory === 1) {
        const material = selectMaterialById(state, (test as MaterialsTest).material_id);
        if (!material) throw new Error("Failed to find the material for the test");
        if(!material.arriving_date) throw new Error("Failed to find the arriving date");

        return {
            date: material.arriving_date.toISOString(),
            name: material.name,
            details: material.supplier
        }
    } else {
        const order = selectOrderById(state, (test as ProductsTest).order_id);
        if (!order) throw new Error("Failed to find the order for the test");
        if(!order.done_date) throw new Error("Failed to find the done date");

        const product = selectProductById(state, order.product_id);
        if (!product) throw new Error("Failed to find the product for the test");

        return {
            date: order.done_date.toString().slice(0, 10),
            name: order.customer,
            details: product.name,
            standardsUrl: product?.quality_standards_url
        }
    }
}

export default getTestInfo;