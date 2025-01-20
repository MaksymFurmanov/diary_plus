import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import ProductionPlanProcess from "./ProductionPlanProcess";
import ProductionProcessDetails from "./ProductionProcessDetails";
import {getProductionProcessesByProduct} from "../../utils/storage/productionProcesses";
import {useProductInput} from "../../providers/ProductInputProvider";
import AddProcessButton from "../Production/AddProcessButton";

export type DetailsBoxType = {
    process_queue: number,
    toggle: boolean,
    position: { x: number, y: number },
}

const ProductionPlanInput = () => {
    const {product, setProduct} = useProductInput();

    const [detailsBox, setDetailsBox] = useState<DetailsBoxType>({
        process_queue: -1,
        toggle: false,
        position: {x: 0, y: 0},
    });

    useEffect(() => {
        const filteredProcesses = getProductionProcessesByProduct(product.id);
        if (!filteredProcesses) return;

        setProduct((prevState) => {
            return {
                ...prevState,
                productionProcesses: filteredProcesses
            }
        });
    }, [product.id, setProduct]);

    const closeDetails = () => {
        setDetailsBox({...detailsBox, toggle: false})
    }

    return (
        <div>
            <label htmlFor={"production_plan"}>
                Production plan:
            </label>
            <div className={"ProductionPlan"}
                 onScroll={closeDetails}
            >
                <ProductionPlanItems setDetailsBox={setDetailsBox} />

                <ProductionProcessDetails
                    detailsBoxData={detailsBox}
                    closeHandler={closeDetails}
                />

                <AddProcessButton firstProcess={
                    product.productionProcesses.length === 0}/>
            </div>
        </div>
    );
};

const ProductionPlanItems = ({setDetailsBox}: {
    setDetailsBox: Dispatch<SetStateAction<DetailsBoxType>>
}) => {
    const {product} = useProductInput();

    return useMemo(() =>
        product.productionProcesses
            .sort((a, b) => a.queue - b.queue)
            .map((process, index) => {
                return (
                    <ProductionPlanProcess
                        key={index}
                        process={process}
                        setDetailsBox={setDetailsBox}
                        index={index}
                        last={product.productionProcesses.length - 1}
                    />
                );
            }), [product.productionProcesses]);
}

export default ProductionPlanInput;