import {IoMdTrash} from "react-icons/io";

const ProductionProcessDetails = ({details, inputHandler}) => {
    return <div className={"details-box"}>
        <label>Oddelenie:</label>
        <input name={"department"}
               value={details.department}
               onClick={(e) => inputHandler(e)}/>
        <label>Kedy vykonané:</label>
        <input name={"done_name"}
               value={details.done_name}
               onClick={(e) => inputHandler(e)}/>
        <div>
            <IoMdTrash/>
        </div>
    </div>
};

export default ProductionProcessDetails