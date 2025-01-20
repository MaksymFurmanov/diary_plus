import {Product} from "../../types";
import Input from "../BasicComponents/Input";
import {useOrderInput} from "../../providers/OrderInputProvider";

const SelectProductType = ({products}: {
    products: Product[]
}) => {
    const {order, setOrder} = useOrderInput();

    const productTypeOptions: JSX.Element[] = products
        .filter((product: Product) => {
            return product.name === order.product_name
        })
        .map((product: Product, index: number) => (
            <option key={index} value={product.id}>
                {product.type}
            </option>
        ));

    return (
        <Input type={"select"}
               name={"product_id"}
               value={order.id}
               setter={setOrder}
               state={order}
               options={productTypeOptions}>
            Type:
        </Input>
    );
}

export default SelectProductType;