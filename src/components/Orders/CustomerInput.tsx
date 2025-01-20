import Input from "../BasicComponents/Input";
import {useOrderInput} from "../../providers/OrderInputProvider";
import orders from "../../initialData/orders";
import {Order} from "../../types";

const CustomerInput = () => {
    const {order, setOrder} = useOrderInput();

    return (
        <>
            <Input
                name={"customer"}
                value={order.customer}
                setter={setOrder}
                state={order}
                list={"customerList"}>
                Customer:
            </Input>
            <datalist id="customerList">
                {orders.map((order: Order, index: number) => (
                    <option key={index} value={order.customer}/>
                ))}
            </datalist>
        </>
    );
}

export default CustomerInput;