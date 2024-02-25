import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Fragment, useState} from "react";
import ProductionProcess from "./ProductionProcess";
import arrowImg from "../../fig/img/arrow_wave.svg";
import {useProducts} from "../../providers/ProductsProvider";
import {useProductionProcesses} from "../../providers/ProductionProcessesProvider";

const ProductionItem = ({order, setOrder}) => {
    const [showToggle, setShowToggle] = useState(true);
    const products = useProducts();
    let production_processes = useProductionProcesses();
    production_processes = production_processes.filter((production_process) =>
        production_process.product_id === order.product_id);

    const product = products.find((product) =>
        product.product_id === order.product_id);

    const actualProcess = production_processes
        .find((production_process) =>
            production_process.production_process_id
            === order.production_process_id);

    const lastProcess = production_processes.length;

    const processes = production_processes.map((production_process, index) => (
        <Fragment key={index}>
            <ProductionProcess
                key={`process-${index}`}
                order={order}
                setOrder={setOrder}
                production_process={production_process}
                queue={actualProcess !== undefined
                    ? actualProcess.queue
                    : -1}
                lastProcess={lastProcess}
            />
            {production_process.queue !== lastProcess - 1 &&
                <img
                    key={`arrow-${index}`}
                    src={arrowImg}
                    alt=""
                />
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
            <p>{`${product.name}: ${product.type}`}</p>
            <p>{order.volume + ' ks'}</p>
            <p>{order.customer}</p>
        </div>
        <div className={"line"}/>
        {showToggle && <div className={"production-info"}>
            {processes}
        </div>}
    </div>
}

export default ProductionItem