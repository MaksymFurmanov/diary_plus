import { FaCheck } from "react-icons/fa";
import { useUser } from "../../providers/UserProvider";
import { useEffect, useState } from "react";

const ProductionProcess = ({ production_process, actualProcess }) => {
    const user = useUser();

    const isDone = production_process.queue < actualProcess.queue;
    const [doneToggle, setDoneToggle] = useState(isDone);

    const changeAccess = (
        user.department_id === production_process.department_id ||
        user.employee_id === 0
    ) && actualProcess.queue === production_process.queue;

    const [styles, setStyles] = useState({
        cursor: changeAccess ? 'pointer' : 'default',
        borderColor: changeAccess ? 'yellow' : 'black',
        background: isDone ? "#F8F8F8" : "black",
        color: isDone ? 'black' : '#F8F8F8'
    });

    useEffect(() => {
        setStyles(prevState => {
            return {
                ...prevState,
                background: doneToggle ? "#F8F8F8" : "black",
                color: doneToggle ? 'black' : '#F8F8F8'
            }
        });
    }, [doneToggle]);

    const handleToggle = () => {
        if (changeAccess) {
            setDoneToggle(prevDoneToggle => !prevDoneToggle);
        }
    };

    return (
        <div className={"v-center"}>
            <div
                style={styles}
                className="process-item"
                onClick={handleToggle}
            >
                <p>{production_process.name}</p>
            </div>
            <FaCheck style={{visibility:
                    isDone || doneToggle ? "" : "hidden"}}/>
        </div>
    );
};

export default ProductionProcess;