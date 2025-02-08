import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import {Order} from "../../types";
import ProcessesList from "./ProcessesList";
import {selectProductionProcessesByProduct} from "../../features/productionProcessesSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../state";
import {selectProductById} from "../../features/productsSlice";

const ProductionItem = ({order}: { order: Order }) => {
    const [showToggle, setShowToggle] = useState(true);

    const product = useSelector((state: RootState) => selectProductById(state, order.product_id));
    if (!product) {
        throw new Error(`Product of the order 
        ${order.customer + " " + order.volume} not found`);
    }

    const production_processes = useSelector((state: RootState) =>
        selectProductionProcessesByProduct(state, order.product_id));
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
                    <p>{order.deadline.toString().slice(0, 10)}</p>
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
                                       lastDoneId={order.production_process_id}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductionItem