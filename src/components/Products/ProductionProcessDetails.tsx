import {IoMdTrash} from "react-icons/io";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ProductionProcess} from "../../types";
import {useProductInput} from "../../providers/ProductInputProvider";
import {DetailsBoxType} from "./ProductionPlanInput";
import useClickOutside from "../../hooks/useClickOutside";
import DepartmentInput from "../DepartmentInput";

const ProductionProcessDetails = ({
                                      detailsBoxData,
                                      closeHandler
                                  }: {
    detailsBoxData: DetailsBoxType,
    closeHandler: () => void
}) => {
    const {product, setProduct} = useProductInput();

    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    const {x, y} = detailsBoxData.position;
    useEffect(() => {
        if (containerRef.current) {
            const {offsetWidth, offsetHeight} = containerRef.current;
            setDimensions({width: offsetWidth, height: offsetHeight});
        }
    }, []);

    useClickOutside(containerRef, closeHandler);

    const process = product.productionProcesses.find((process: ProductionProcess) =>
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

    return detailsBoxData && !!process ? (
        <div className={"ProductionProcessDetails white-outline"}
             style={{
                 left: x - dimensions.width / 2 + "px",
                 top: y - dimensions.height + "px"
             }}
             ref={containerRef}
        >
            <div>
                <label>Name:</label>
                <input name={"name"}
                       id={"name"}
                       value={process.name}
                       onChange={inputHandler}
                />
            </div>
            <DepartmentInput state={process}
                             setter={inputHandler}
            />
            <div>
                <label htmlFor={"done_name"}>
                    Done label:
                </label>
                <input name={"done_name"}
                       id={"done_name"}
                       value={process.done_name || ""}
                       onChange={inputHandler}
                />
            </div>
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