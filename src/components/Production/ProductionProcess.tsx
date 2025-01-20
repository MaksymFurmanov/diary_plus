import React from 'react';
import {FaCheck} from 'react-icons/fa';
import {ProductionProcess} from "../../types";
import {useUser} from "../../providers/UserProvider";
import {isManager} from "../../utils/storage/departments";
import {markProcessDone} from "../../utils/storage/orders";

const ProductionProcess = ({orderId, production_process, isDone}: {
    orderId: string,
    production_process: ProductionProcess,
    isDone: boolean
}) => {
    const user = useUser();
    if(!user) throw new Error("No user found");

    const doneHandler = () => {
        markProcessDone(orderId, production_process);
    }

    const changeAccess = isManager(user.employee_id, production_process.department_id);

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
            visibility: isDone ? "visible" : "hidden"
        }}/>
    </div>
};

export default ProductionProcess;
