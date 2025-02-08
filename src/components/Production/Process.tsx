import React from 'react';
import {FaCheck} from 'react-icons/fa';
import {ProductionProcess} from "../../types";
import {useUser} from "../../providers/UserProvider";
import {isManager} from "../../utils/storage/departments";
import {useDispatch} from "react-redux";
import {markProcessDone} from "../../features/ordersSlice";

const Process = ({orderId, production_process, nextProcessQueue}: {
    orderId: string,
    production_process: ProductionProcess,
    nextProcessQueue?: number
}) => {
    const {user} = useUser();
    if (!user) throw new Error("No user found");

    const dispatch = useDispatch();

    const doneHandler = () => {
        dispatch(markProcessDone({orderId, productionProcess: production_process}));
    }

    const isDone = nextProcessQueue !== undefined
        ? nextProcessQueue > production_process.queue : true;

    const changeAccess = isManager(
        user.employee_id,
        production_process.department_id ? ["2", production_process.department_id] : ["2"]
    ) && production_process.queue === nextProcessQueue;

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

export default Process;
