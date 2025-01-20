import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import {Order} from "../../types";
import {getProductionProcessesByProduct} from "../../utils/storage/productionProcesses";
import {getProductById} from "../../utils/storage/products";
import ProcessesList from "./ProcessesList";

const ProductionItem = ({order}: { order: Order }) => {
    const [showToggle, setShowToggle] = useState(true);

    const product = getProductById(order.product_id);
    if (!product) {
        throw new Error(`Product of the order 
        ${order.customer + " " + order.volume} not found`);
    }

    const production_processes =
        getProductionProcessesByProduct(order.product_id);
    if (!production_processes) {
        throw new Error(`Production of the order 
        ${order.customer + " " + product.name} not found`);
    }

    return (
        <div className={"ProductionItem"}>
            <div className={"order-info"}>
                <div>
                    <picture onClick={() => setShowToggle(!showToggle)}>
                        {showToggle ? <IoIosArrowDown/> : <IoIosArrowUp/>}
                    </picture>
                    <p>{order.deadline.toISOString().slice(0, 8)}</p>
                </div>
                <p>{`${product.name}: ${product.type}`}</p>
                <p>{order.volume + ' ks'}</p>
                <p>{order.customer}</p>
            </div>

            <div className={"line"}/>

            {showToggle && (
                <div style={{overflowX: "scroll"}}>
                    <div className={"production-info"}>
                        <ProcessesList production_processes={production_processes}
                                       orderId={order.id}
                                       current_id={order.production_process_id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductionItem