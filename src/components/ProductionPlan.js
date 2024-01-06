import production_processes from "../data/production_processes";
import {useEffect, useState} from "react";
import ProductionPlanItem from "./ProductionPlanItem";

const ProductionPlan = ({productId}) => {
    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        const filteredProcesses = production_processes.filter(process => {
            return process.product_id === productId;
        });
        setProcesses(filteredProcesses);
    }, [productId]);


    const productionPlanItems = processes.map((process, index) => {
        return <ProductionPlanItem key={index}
                                   process={process}
                                   index={index}
                                   last={processes.length - 1}/>
    })


    return <div className={"ProductionPlan"}>
        {productionPlanItems}
    </div>
}

export default ProductionPlan;