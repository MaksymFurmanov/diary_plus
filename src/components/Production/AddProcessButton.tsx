import {useState} from "react";
import {GoArrowRight} from "react-icons/go";
import AddProcessInput from "../Products/AddProcessInput";
import {FaCirclePlus} from "react-icons/fa6";

const AddProcessButton = ({firstProcess}: {
    firstProcess: boolean
}) => {
    const [addProcessToggle, setAddProcessToggle] = useState(false);

    const addHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddProcessToggle(!addProcessToggle);
    }

    return (
        <>
            {addProcessToggle && (
                <>
                    {firstProcess && <div><GoArrowRight/></div>}
                    <AddProcessInput/>
                </>
            )}

            <button onClick={(e) => addHandler(e)}>
                <FaCirclePlus/>
            </button>
        </>
    );
}

export default AddProcessButton;