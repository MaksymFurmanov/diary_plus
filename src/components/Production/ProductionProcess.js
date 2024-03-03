import React from 'react';
import {FaCheck} from 'react-icons/fa';
import {useUser} from "../../providers/UserProvider";

const ProductionProcess = ({production_process, queue, doneHandler}) => {
    const user = useUser();

    const changeAccess = (
        user.department_id === production_process.department_id ||
        user.employee_id === 0
    ) && queue + 1 === production_process.queue;

    const isDone = production_process.queue <= queue;

    return <div className={"ProductionProcess v-center"}>
        <div
            style={{
                cursor: changeAccess ? 'pointer' : 'default',
                borderColor: changeAccess ? 'yellow' : 'black',
                background: isDone ? "#F8F8F8" : "black",
                color: isDone ? 'black' : '#F8F8F8'
            }}
            className="process-item"
            onClick={changeAccess ? doneHandler : undefined}
        >
            <p>{production_process.name}</p>
        </div>
        <FaCheck style={{
            visibility:
                isDone ? "" : "hidden"
        }}/>
    </div>
};

export default ProductionProcess;
