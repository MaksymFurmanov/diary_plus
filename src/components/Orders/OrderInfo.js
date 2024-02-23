import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PageTitle from "../BasicComponents/PageTitle";
import Input from "../BasicComponents/Input.tsx";
import Button from "../BasicComponents/Button.tsx";
import {useOrders, useSetOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";

const OrderInfo = ({existing}) => {
    let {orderId} = useParams();
    orderId = parseInt(orderId);
    const navigate = useNavigate();
    const orders = useOrders();
    const setOrders = useSetOrders();
    const products = useProducts();
    const [loadDataItem, loading] = useLoadDataItem();

    const [order, setOrder] = useState({
        order_id: null,
        product_name: "",
        product_id: "",
        customer: "",
        volume: 100,
        deadline: "",
        changed: false
    });

    const existingOrder = orders.find(order => order.order_id === orderId);
    const existingProduct = existingOrder
        ? products.find(product => existingOrder.product_id === product.product_id)
        : null;
    useEffect(() => {
        if (existing && existingOrder && existingProduct) {
            setOrder(prevState => ({
                ...prevState,
                ...existingOrder,
                product_name: existingProduct.name
            }));
        }
    }, [existing, existingOrder, existingProduct, orderId]);

    const uniqueProductsSet = new Set();
    const productNameOptions = products.map((product, index) => {
        if (!uniqueProductsSet.has(product.name)) {
            uniqueProductsSet.add(product.name);
            return <option key={index} value={product.name}>
                {product.name}
            </option>
        } else return null;
    });

    const productTypeOptions = products
        .filter(product => product.name === order.product_name)
        .map((product, index) => (
            <option key={index} value={product.product_id}>
                {product.type}
            </option>
        ));

    const customerList = orders.map((order, index) => (
       <option key={index} value={order.customer}/>
    ));

    const submitHandler = (e) => {
        e.preventDefault();

        loadDataItem('orders', order).then((newOrder) => {
            const orderIndex = orders.findIndex((orderItem) =>
                orderItem.order_id === order.order_id);
            if (orderIndex !== -1) {
                const newOrders = [...orders];
                newOrders[orderIndex] =
                    {...orders[orderIndex], ...newOrder};
                setOrders(newOrders);
            } else {
                setOrders(prevState => [...prevState, newOrder]);
            }
            navigate("/orders/products_to_product");
        });
    }

    return loading ? <p>Loading...</p> : <>
        <PageTitle name={existing ? "Objednávka" : "Nová objednávka"}
                   prev={"/orders/products_to_product"}/>
        <form className={"OrderInfo"} onSubmit={e => submitHandler(e)}>
            <div className={"input-field"}>
                <Input
                    type={"select"}
                    name={"product_name"}
                    value={order.product_name}
                    setter={setOrder}
                    state={order}
                    options={productNameOptions}>
                    Produkt:
                </Input>
                <Input
                    type={"select"}
                    name={"product_id"}
                    value={order.product_id}
                    setter={setOrder}
                    state={order}
                    options={productTypeOptions}>
                    Typ:
                </Input>
                <Input
                    name={"customer"}
                    value={order.customer}
                    setter={setOrder}
                    state={order}
                    list={"customerList"}>
                    Zákazník:
                </Input>
                <datalist id="customerList">
                    {customerList}
                </datalist>
                <Input
                    type={"number"}
                    min={1}
                    name={"volume"}
                    value={order.volume}
                    setter={setOrder}
                    state={order}>
                    Počet:
                </Input>
                <Input
                    name={"deadline"}
                    value={order.deadline}
                    setter={setOrder}
                    state={order}>
                    Konečný termín:
                </Input>
            </div>
            <div className={"bottom-buttons"}>
                {existing
                    ? <><Button>VYMAZAŤ</Button>
                        <Button>ÚPRAVIŤ</Button>
                    </>
                    : <Button>PRIDAŤ</Button>
                }
            </div>
        </form>
    </>;
};

export default OrderInfo;