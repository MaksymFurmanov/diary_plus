import Input from "../BasicComponents/Input";
import ProductionPlanInput from "./ProductionPlanInput";
import {createProduct, deleteProduct, updateProduct} from "../../utils/storage/products";
import {useProductInput} from "../../providers/ProductInputProvider";
import {FormEvent} from "react";
import MutateButtons from "../BasicComponents/MutateButtons";
import ImageInput from "./ImageInput";
import QualityStandardsInput from "./QualityStandardsInput";
import {useNavigate} from "react-router-dom";

const ProductForm = () => {
    const {product, setProduct} = useProductInput();

    const navigate = useNavigate();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (product.id) {
                updateProduct(product);
            } else {
                createProduct(product);
            }
        } catch (error) {
            console.error(error);
        }

        navigate("/products");
    };

    return (
        <form className={"ProductInfo evenly"} onSubmit={e => submitHandler(e)}>
            <div>
                <ImageInput/>
            </div>
            <div className={"inputs"}>
                <div>
                    <Input name={"name"}
                           value={product.name}
                           setter={setProduct}
                           state={product}
                    >
                        Produkt:
                    </Input>
                    <Input name={"type"}
                           value={product.type}
                           setter={setProduct}
                           state={product}
                    >
                        Typ:
                    </Input>
                    <QualityStandardsInput/>
                    <Input type={"number"}
                           min={1}
                           size={2}
                           name={"per_pallet"}
                           value={product.per_pallet}
                           setter={setProduct}
                           state={product}
                    >
                        Počet na paletu:
                    </Input>
                    <ProductionPlanInput/>
                </div>
                <MutateButtons id={product.id}
                               deleteHandler={deleteProduct}
                />
            </div>
        </form>
    );
}

export default ProductForm;