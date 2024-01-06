import {GoArrowRight} from "react-icons/go";
import {useState} from "react";
import ProductionProcessDetails from "./ProductionProcessDetails";

const ProductionPlanItem = ({process, index, last}) => {
    const [details, setDetails] = useState({
        department: "",
        done_name: "",
        showToggle: false
    });
    const inputHandler = (e) => {
        const {name, value} = e.target;
        return setDetails({...details, [name]: value});
    }


    return <>
        {details.showToggle && <ProductionProcessDetails details={details} inputHandler={inputHandler}/>}
        <div className={"production-plan_item"} key={index}
             onClick={() => setDetails({...details, showToggle: !details.showToggle})}>
            <p>{`${process.queue + 1}. ${process.name}`}</p>
        </div>
        <div>{index !== last && <GoArrowRight/>}</div>
    </>
}

export default ProductionPlanItem