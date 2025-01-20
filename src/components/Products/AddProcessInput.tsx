import React, {useState} from "react";
import {useProductInput} from "../../providers/ProductInputProvider";
import {nanoid} from "@reduxjs/toolkit";

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
                            department_id: "",
                            product_id: product.id as string,
                            name: name,
                            queue: queue,
                            done_name: ""
                        }
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