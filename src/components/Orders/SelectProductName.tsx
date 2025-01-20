import Input from "../BasicComponents/Input";
import products from "../../initialData/products";
import {Product} from "../../types";
import {useOrderInput} from "../../providers/OrderInputProvider";
import {Fragment} from "react";

const SelectProductName = () => {
    const {order, setOrder} = useOrderInput();

    const uniqueProductsSet = new Set();
    const productNameOptions: JSX.Element[] = products
        .map((product: Product, index: number) => {
            if (!uniqueProductsSet.has(product.name)) {
                uniqueProductsSet.add(product.name);
                return (
                    <option key={index} value={product.name}>
                        {product.name}
                    </option>
                );
            } else return <Fragment key={index}/>;
        });

    return (
        <Input
            type={"select"}
            name={"product_name"}
            value={order.product_name}
            setter={setOrder}
            state={order}
            options={productNameOptions}>
            Product:
        </Input>
    );
}

export default SelectProductName;