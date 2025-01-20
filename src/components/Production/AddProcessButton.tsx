import {useState} from "react";
import {GoArrowRight} from "react-icons/go";
import AddProcessInput from "../Products/AddProcessInput";
import {FaCirclePlus} from "react-icons/fa6";

const AddProcessButton = ({firstProcess}: {
    firstProcess: boolean
}) => {
    const [addProcessToggle, setAddProcessToggle] = useState(false);

    return (
        <>
            {addProcessToggle && (
                <>
                    {firstProcess && <div><GoArrowRight/></div>}
                    <AddProcessInput/>
                </>
            )}
            <button onClick={() => {
                setAddProcessToggle(!addProcessToggle)
            }}>
                <FaCirclePlus/>
            </button>
        </>
    );
}

export default AddProcessButton;