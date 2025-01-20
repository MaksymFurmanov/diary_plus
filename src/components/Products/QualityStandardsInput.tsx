import {useProductInput} from "../../providers/ProductInputProvider";
import {ChangeEvent} from "react";

const QualityStandardsInput = () => {
    const {product, setProduct} = useProductInput();

    const fileInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;

        if (files) {
            setProduct(prevState => ({
                ...prevState,
                standardsFile: files[0],
                standardsDisplay: files[0].name
            }));
        }
    };

    return (
        <div className={"standards-input-container"}>
            <label>
                Quality standards:
            </label>
            <input className={"hidden-input"}
                   type={"file"}
                   name={"standardsFile"}
                   id={"standardsFile"}
                   onChange={fileInputHandler}
            />
            <label htmlFor={"standardsFile"}
                   className={"standards-input"}>
                {product.standardsDisplay || "Add file"}
            </label>
        </div>
    );
}

export default QualityStandardsInput;