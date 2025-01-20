import {GoArrowRight} from "react-icons/go";
import {ProductionProcess} from "../../types";
import {MouseEvent, Dispatch, SetStateAction} from "react";
import {DetailsBoxType} from "./ProductionPlanInput";

const ProductionPlanProcess = ({process, setDetailsBox, index, last}: {
    process: ProductionProcess,
    setDetailsBox: Dispatch<SetStateAction<DetailsBoxType>>,
    index: number,
    last: number
}) => {
    const handleItemClick = (
        e: MouseEvent<HTMLDivElement>,
        queue: number
    ) => {
        setDetailsBox((prevState) => {
            return {
                ...prevState,
                position: {x: e.pageX, y: e.pageY},
                process_queue: queue
            }
        });
    }

    return (
        <>
            <div className={"ProductionPlanItem"}
                 onClick={(e) =>
                     handleItemClick(e, process.queue)}
            >
                <p>{`${process.queue + 1}. ${process.name}`}</p>
            </div>
            <div>{index !== last && <GoArrowRight/>}</div>
        </>
    );
}

export default ProductionPlanProcess