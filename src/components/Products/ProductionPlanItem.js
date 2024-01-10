import {GoArrowRight} from "react-icons/go";

const ProductionPlanItem = ({process, index, last, handleItemClick}) => {
    return <>
        <div className={"ProductionPlanItem"}
             onClick={(e) =>
                 handleItemClick(e, process.queue)}>
            <p>{`${process.queue + 1}. ${process.name}`}</p>
        </div>
        <div>{index !== last && <GoArrowRight/>}</div>
    </>
}

export default ProductionPlanItem