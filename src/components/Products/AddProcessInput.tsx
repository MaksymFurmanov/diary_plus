import React, {useState} from "react";
import {useProductInput} from "../../providers/ProductInputProvider";
import {nanoid} from "@reduxjs/toolkit";
import {ProductionProcess} from "../../types";

const AddProcessInput = () => {
    const [name, setName] = useState<string>("");

    const {product, setProduct} = useProductInput();

    const queue = product.productionProcesses.length;

    const handleAdd = () => {
        if (name !== "") {
            if(!product.id) throw new Error("Product not found");

            setProduct(prevState => {
                return {
                    ...prevState,
                    productionProcesses: [
                        ...prevState.productionProcesses,
                        {
                            id: nanoid(),
                            product_id: product.id,
                            department_id: undefined,
                            name: name,
                            queue: queue,
                            done_name: undefined
                        } as ProductionProcess
                    ]
                }
            });
            setName("");
        }
    }

    return (
        <div className={"AddProcessInput ProductionPlanItem"}>
            <div>
                <p>{`${queue + 1}.`}</p>
                <input type={"text"}
                       value={name}
                       name={"name"}
                       onChange={(e) => {
                           setName(e.target.value)
                       }}
                       onBlur={handleAdd}
                       onKeyPress={e => e.key === "Enter" && handleAdd()}
                />
            </div>
        </div>
    );
}

export default AddProcessInput;