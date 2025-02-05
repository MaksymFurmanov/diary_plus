import Input from "../BasicComponents/Input";
import SelectProductType from "./SelectProductType";
import MutateButtons from "../BasicComponents/MutateButtons";
import products from "../../initialData/products";
import {OrderType, useOrderInput} from "../../providers/OrderInputProvider";
import CustomerInput from "./CustomerInput";
import SelectProductName from "./SelectProductName";
import {FormEvent} from "react";
import PalletColor from "../BasicComponents/PalletColor";
import {OrderInput} from "../../types";
import {createOrder, deleteOrder, updateOrder} from "../../utils/storage/orders";

const OrderForm = () => {
    const {order, setOrder}: OrderType = useOrderInput();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (order.id) {
                updateOrder(order);
            } else {
                createOrder(order);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const PalletColorElement = PalletColor<OrderInput>;

    return (
        <form className={"OrderInfo"}
              onSubmit={e => submitHandler(e)}
        >
            <div className={"input-field"}>
                <SelectProductName/>
                <SelectProductType products={products}/>
                <CustomerInput/>
                <Input
                    type={"number"}
                    min={1}
                    name={"volume"}
                    value={order.volume}
                    setter={setOrder}
                    state={order}
                >
                    Volume:
                </Input>

                <Input type={"date"}
                       name={"deadline"}
                       value={order.deadline}
                       setter={setOrder}
                       state={order}
                >
                    Deadline:
                </Input>

                <PalletColorElement state={order}
                                    setter={setOrder}
                                    nameInput={"pallet_color"}
                />
            </div>
            <MutateButtons id={order.id}
                           deleteHandler={deleteOrder}
            />
        </form>
    );
}

export default OrderForm;