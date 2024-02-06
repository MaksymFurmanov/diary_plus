import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Fragment, useState} from "react";
import ProductionProcess from "./ProductionProcess";
import arrowImg from "../../fig/img/arrow_wave.svg";
import {useProducts} from "../../providers/ProductsProvider";
import {useProductionProcesses} from "../../providers/ProductionProcessesProvider";

const ProductionItem = ({order}) => {
    const [showToggle, setShowToggle] = useState(true);
    const products = useProducts();
    const production_processes = useProductionProcesses();

    const product = products.find((product) =>
        product.product_id === order.product_id);

    const actualProcess = production_processes
        .find((production_process) =>
            production_process.production_process_id
            === order.production_process_id);

    const lastProcess = production_processes.length - 1;

    const processes = production_processes.map((production_process,
                                                index) => {
        return <Fragment key={index}>
                <ProductionProcess key={`process-${index}`}
                                   production_process={production_process}
                                   actualProcess={actualProcess}/>
                {production_process.queue !== lastProcess
                    && <img key={`arrow-${index}`}
                            src={arrowImg}
                            alt=""/>}
            </Fragment>
        }
    );

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