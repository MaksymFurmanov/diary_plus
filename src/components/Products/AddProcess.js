import {useState} from "react";

const AddProcess = ({queue, setProcesses}) => {
    const [input, setInput] = useState("");

    const inputHandler = (e) => {
        setInput(e.target.value);
    }

    const handleAdd = () => {
        if(input !== ""){
            setProcesses(prevState => [...prevState, {
                department_id: "",
                name: input,
                queue: queue,
                done_name: ""
            }]);
            setInput("");
        }
    }

    return <div className={"AddProcess ProductionPlanItem"}>
        <div>
            <p>{`${queue + 1}.`}</p>
            <input type={"text"}
                   value={input}
                   name={"name"}
                   onChange={inputHandler}
                   onBlur={handleAdd}
                   onKeyPress={e => e.key === "Enter" && handleAdd()}/>
        </div>
    </div>
}

export default AddProcess;