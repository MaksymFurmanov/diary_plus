import React from 'react';
import {FaCheck} from 'react-icons/fa';
import {useServer} from "../../providers/ServerProvider";
import {useOrders, useSetOrders} from "../../providers/OrdersProvider";
import {useUser} from "../../providers/UserProvider";

const ProductionProcess = ({order, production_process, queue, lastProcess}) => {
    const user = useUser();
    const api = useServer();
    const orders = useOrders();
    const setOrders = useSetOrders();

    const changeAccess = (
        user.department_id === production_process.department_id ||
        user.employee_id === 0
    ) && queue + 1 === production_process.queue;

    const isDone = production_process.queue <= queue;

    const loadDone = () => {
        try {
            return fetch(
                `${api}/orders/done`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order.order_id)
                });
        } catch (e) {
            console.log(e.message);
        }
    }

    const doneHandler = () => {
        loadDone().then(() => {
            const newOrders = [...orders];
            const index = orders.findIndex((orderItem) =>
                orderItem.order_id === order.order_id);
            newOrders[index] = {...newOrders[index], queue: order.queue + 1};
            setOrders(prevState => [...prevState, newOrders]);
            if (order.queue === lastProcess + 1) {
                loadDone();
            }
        });
    }

    return (
        <div className={"v-center"}>
            <div
                style={{
                    cursor: changeAccess ? 'pointer' : 'default',
                    borderColor: changeAccess ? 'yellow' : 'black',
                    background: isDone ? "#F8F8F8" : "black",
                    color: isDone ? 'black' : '#F8F8F8'
                }}
                className="process-item"
                onClick={changeAccess ? doneHandler : undefined}
            >
                <p>{production_process.name}</p>
            </div>
            <FaCheck style={{
                visibility:
                    isDone ? "" : "hidden"
            }}/>
        </div>
    );
};

export default ProductionProcess;
