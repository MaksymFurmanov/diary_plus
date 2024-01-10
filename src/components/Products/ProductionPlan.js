import production_processes from "../../data/production_processes";
import {useEffect, useState} from "react";
import ProductionPlanItem from "./ProductionPlanItem";
import {FaCirclePlus} from "react-icons/fa6";
import ProductionProcessDetails from "./ProductionProcessDetails";
import AddProcess from "./AddProcess";
import {GoArrowRight} from "react-icons/go";

const ProductionPlan = ({productId}) => {
    const [processes, setProcesses] = useState([]);
    const [addProcessToggle, setAddProcessToggle] =
        useState(false);
    const [detailsBox, setDetailsBox] = useState({
        process_queue: -1,
        toggle: false,
        position: {x: 0, y: 0},
    });

    useEffect(() => {
        const filteredProcesses =
            production_processes.filter((process) => {
                return process.product_id === productId;
            });
        setProcesses(filteredProcesses);
    }, [productId]);

    const inputHandler = (e) => {
        const {name, value} = e.target;

        const updatedProcesses = processes.map((process) => {
            if (detailsBox.process_queue === process.queue) {
                return {...process, [name]: value};
            }
            return process;
        });
        setProcesses(updatedProcesses);
    };

    const handleItemClick = (e, queue) => {
        setDetailsBox({
            ...detailsBox,
            position: {x: e.pageX, y: e.pageY},
            toggle: !detailsBox.toggle,
            process_queue: queue
        });
    };

    const closeDetails = () => {
        setDetailsBox({...detailsBox, toggle: false})
    }

    const addHandler = (e) => {
        e.preventDefault();
        setAddProcessToggle(!addProcessToggle);
    }

    const deleteHandler = (e) => {
        e.preventDefault();
    };

    const productionPlanItems = processes.map((process, index) => {
        return (
            <ProductionPlanItem
                key={index}
                handleItemClick={handleItemClick}
                process={process}
                index={index}
                last={processes.length - 1}
            />
        );
    });

    return (
        <div className={"ProductionPlan"}
             onScroll={closeDetails}>
            {productionPlanItems}
            {detailsBox.toggle && (
                <ProductionProcessDetails
                    process={processes.find((process) =>
                        detailsBox.process_queue === process.queue)}
                    inputHandler={inputHandler}
                    deleteHandler={deleteHandler}
                    coordinates={[detailsBox.position.x,
                        detailsBox.position.y]}
                    closeHandler={closeDetails}
                />
            )}
            {addProcessToggle && <>
                <div><GoArrowRight/></div>
                <AddProcess queue={processes.length + 1}/>
            </>}
            <button onClick={addHandler}>
                <FaCirclePlus/>
            </button>
        </div>
    );
};

export default ProductionPlan;