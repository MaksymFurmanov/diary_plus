import {useProductInput} from "../../providers/ProductInputProvider";
import {ChangeEvent} from "react";
import ProductPlaceholder from "../../../public/product_placeholder.webp";

const ImageInput = () => {
    const {product, setProduct} = useProductInput();

    const imageInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;

        if (files) {
            const reader = new FileReader();
            const file: File = files[0];

            reader.onload = () => {
                setProduct(prevState => ({
                    ...prevState,
                    imageDisplay: reader.result,
                    imageFile: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={"add-product-image"}>
            <input type={"file"}
                   accept={"image/*"}
                   name={"img"}
                   id={"img"}
                   style={{display: "none"}}
                   onChange={imageInputHandler}
            />
            <label htmlFor={"img"}>
                <img src={product.imageDisplay
                    ? product.imageDisplay
                    : ProductPlaceholder
                }
                     alt={""}
                />
            </label>
        </div>
    );
}

export default ImageInput;