import {MaterialsTest, ProductsTest, TestDisplayData} from "../types";
import {getMaterialById} from "./storage/materials";
import {getOrderById} from "./storage/orders";
import {getProductById} from "./storage/products";

const getTestInfo = (
    test: MaterialsTest | ProductsTest,
    laboratory: 1 | 2
): TestDisplayData => {
    if (laboratory === 1) {
        const material = getMaterialById((test as MaterialsTest).material_id);
        if (!material) throw new Error("Failed to find the material for the test");
        if(!material.arriving_date) throw new Error("Failed to find the arriving date");

        return {
            date: material.arriving_date.toISOString(),
            name: material.name,
            details: material.supplier
        }
    } else {
        const order = getOrderById((test as ProductsTest).order_id);
        if (!order) throw new Error("Failed to find the order for the test");
        if(!order.done_date) throw new Error("Failed to find the done date");

        const product = getProductById(order.product_id);
        if (!product) throw new Error("Failed to find the product for the test");

        return {
            date: order.done_date.toISOString(),
            name: order.customer,
            details: product.name,
            standardsUrl: product?.quality_standards_url
        }
    }
}

export default getTestInfo;