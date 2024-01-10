import {useState} from "react";

const AddProcess = ({queue}) => {
    const [input, setInput] = useState("");
    const inputHandler = (e) => {
        setInput(e.target.value);
    }

    return <div className={"AddProcess ProductionPlanItem"}>
        <div>
            <p>{`${queue}.`}</p>
            <input type={"text"}
                   value={input}
                   name={"name"}
                   onChange={inputHandler}/>
        </div>
    </div>
}

export default AddProcess;