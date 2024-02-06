/*
import materials from "../../data/materials";
import orders from "../../data/orders";
import products from "../../data/products";

const withTestItem = (WrappedComponent) => {


    let date, name, details;
    if (laboratory === "laboratory_1") {
        const foundMaterial = materials.find((material) =>
            material.material_id === item.material_id);
        date = foundMaterial.arriving_date;
        name = foundMaterial.name;
        details = foundMaterial.supplier;
    } else {
        const foundOrder = orders.find((order) =>
            order.order_id === item.order_id);
        const foundProduct = products.find((product) =>
            product.product_id === foundOrder.order_id);
        date = foundOrder.done_date;
        name = foundProduct.name;
        details = foundProduct.type;
    }

    return <WrappedComponent/>
}

export default withTestItem*/
