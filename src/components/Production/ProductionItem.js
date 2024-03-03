import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Fragment, useState} from "react";
import ProductionProcess from "./ProductionProcess";
import {ReactComponent as ArrowImg} from "../../fig/img/arrow_wave.svg";
import {useProductionProcesses} from "../../providers/ProductionProcessesProvider";
import {useServer} from "../../providers/ServerProvider";
import {useOrders, useSetOrders} from "../../providers/OrdersProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import {useSetTestsProducts} from "../../providers/TestsProductsProvider";

const ProductionItem = ({order}) => {
    const orders = useOrders();
    const setOrders = useSetOrders();
    let production_processes = useProductionProcesses();
    production_processes = production_processes.filter((production_process) =>
        production_process.product_id === order.product_id);
    const setTestsProducts = useSetTestsProducts();
    const api = useServer();

    const [loadDataItem] = useLoadDataItem();

    const [showToggle, setShowToggle] = useState(true);

    const lastProcess = production_processes.length;

    const loadDone = async () => {
        try {
            const response = await fetch(
                `${api}/orders/done`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order.order_id)
                });
            return await response.json();
        } catch (e) {
            console.log(e.message);
        }
    }

    const doneHandler = () => {
        loadDone().then(newOrder => {
            const newOrders = [...orders];
            let index = orders.findIndex(orderItem =>
                orderItem.order_id === newOrder.order_id);
            newOrders[index] = {...newOrder};
            setOrders(newOrders);

            if (order.productionProcess?.queue === lastProcess - 2) {
                loadDone().then(() => {
                    loadDataItem("tests-products", {order_id: order.order_id})
                        .then(newTestProduct => {
                            setTestsProducts(prevState => [...prevState, newTestProduct]);
                        });
                });
            }
        });
    }

    const processes = production_processes.map((production_process, index) => (
        <Fragment key={index}>
            <ProductionProcess
                key={`process-${index}`}
                production_process={production_process}
                queue={order.productionProcess?.queue !== undefined
                    ? order.productionProcess?.queue
                    : -1}
                doneHandler={doneHandler}
            />
            {production_process.queue !== lastProcess - 1 &&
                <ArrowImg className={"arrow"}
                          key={`arrow-${index}`}/>
            }
        </Fragment>
    ));

    return <div className={"ProductionItem"}>
        <div className={"order-info"}>
            <div>
                <picture onClick={() => setShowToggle(!showToggle)}>
                    {showToggle ? <IoIosArrowDown/> : <IoIosArrowUp/>}
                </picture>
                <p>{order.deadline}</p>
            </div>
            <p>{`${order.product.name}: ${order.product.type}`}</p>
            <p>{order.volume + ' ks'}</p>
            <p>{order.customer}</p>
        </div>
        <div className={"line"}/>
        {showToggle && <div style={{overflowX: "scroll"}}>
            <div className={"production-info"}>
                {processes}
            </div>
        </div>}
    </div>
}

export default ProductionItem