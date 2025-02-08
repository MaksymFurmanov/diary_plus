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
import {useDispatch} from "react-redux";
import {addOrder, editOrder, removeOrder} from "../../features/ordersSlice";
import {useNavigate} from "react-router-dom";

const OrderForm = () => {
    const {order, setOrder}: OrderType = useOrderInput();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (order.id) {
                dispatch(editOrder(order));
            } else {
                dispatch(addOrder(order));
            }
        } catch (error) {
            console.error(error);
        }
        navigate("/dashboard/orders");
    }

    const deleteHandler = () => {
        if(!order.id) return;
        dispatch(removeOrder(order.id))
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
                           deleteHandler={deleteHandler}
            />
        </form>
    );
}

export default OrderForm;