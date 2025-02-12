import {IoMdTrash} from "react-icons/io";
import {ChangeEvent, useRef} from "react";
import {Department, ProductionProcess} from "../../types";
import {useProductInput} from "../../providers/ProductInputProvider";
import {DetailsBoxType} from "./ProductionPlanInput";
import useClickOutside from "../../hooks/useClickOutside";
import Input from "../BasicComponents/Input";

const ProductionProcessDetails = ({
                                      departments,
                                      detailsBoxData,
                                      closeHandler
                                  }: {
    departments: Department[],
    detailsBoxData: DetailsBoxType,
    closeHandler: () => void
}) => {
    const {product, setProduct} = useProductInput();

    const containerRef = useRef(null);

    const {x, y} = detailsBoxData.position;

    useClickOutside(containerRef, closeHandler);

    const process = product.productionProcesses
        .find((process: ProductionProcess) =>
            process.queue === detailsBoxData.process_queue
        )
    if (!process) return <></>;

    const inputHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        const updatedProcesses = product.productionProcesses
            .map((process: ProductionProcess) => {
                if (detailsBoxData.process_queue === process.queue) {
                    return {...process, [name]: value};
                }
                return process;
            });

        setProduct((prevState) => {
            return {
                ...prevState,
                productionProcesses: updatedProcesses
            }
        });
    };

    return detailsBoxData.toggle ? (
        <div className={"ProductionProcessDetails white-outline"}
             style={{
                 left: x + "px",
                 bottom: `calc(100vh - ${y}px)`
             }}
             ref={containerRef}
        >

            <label>Name:</label>
            <input name={"name"}
                   id={"name"}
                   value={process.name}
                   onChange={inputHandler}
            />


            <label htmlFor={"department_id"}>
                Department:
            </label>
            <select name={"department_id"}
                    id={"department_id"}
                    value={process.department_id}
                    onChange={inputHandler}
            >
                <>
                    {departments.map((department: Department,
                                      index: number) => {
                        return (
                            <option value={department.id} key={index}>
                                {department.name}
                            </option>
                        )
                    })}
                </>
            </select>


            <label htmlFor={"done_name"}>
                Done label:
            </label>
            <input name={"done_name"}
                   id={"done_name"}
                   value={process.done_name || ""}
                   onChange={inputHandler}
            />

            <DeleteButton processId={process.id}/>
        </div>
    ) : <></>;
}

const DeleteButton = ({processId}: {
    processId: string
}) => {
    const {setProduct} = useProductInput();

    const deleteHandler = () => {
        setProduct(prevState => {
            return {
                ...prevState,
                productionProcesses: prevState.productionProcesses
                    .filter((processItem: ProductionProcess) =>
                        processItem.id !== processId
                    )
            }
        });
    }

    return (
        <button onClick={deleteHandler}>
            <IoMdTrash/>
        </button>
    );
}

export default ProductionProcessDetails