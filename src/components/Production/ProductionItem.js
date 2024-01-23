import products from "../../data/products";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import production_processes from "../../data/production_processes";
import ProductionProcess from "./ProductionProcess";
import arrowImg from "../../fig/img/arrow_wave.svg";

const ProductionItem = ({order}) => {
    const [showToggle, setShowToggle] = useState(true);

    const product = products.find((product) =>
        product.product_id === order.product_id);

    const actualProcess = production_processes
        .find((production_process) =>
            production_process.production_process_id
            === order.production_process_id);

    const lastProcess = production_processes.length - 1;

    const arrow = (<img src={arrowImg} alt=""/>);

    const processes = production_processes.map((production_process,
                                                index) => <>
        <ProductionProcess key={index}
                           production_process={production_process}
                           actualProcess={actualProcess}/>
        {production_process.queue !== lastProcess
            && arrow}
    </>);

    return <div className={"ProductionItem"}>
        <div className={"order-info"}>
            <div>
                <span onClick={() => setShowToggle(!showToggle)}>
                    {showToggle ? <IoIosArrowDown/> : <IoIosArrowUp/>}
                </span>
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