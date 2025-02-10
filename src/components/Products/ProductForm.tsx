import Input from "../BasicComponents/Input";
import ProductionPlanInput from "./ProductionPlanInput";
import {useProductInput} from "../../providers/ProductInputProvider";
import {FormEvent} from "react";
import MutateButtons from "../BasicComponents/MutateButtons";
import ImageInput from "./ImageInput";
import QualityStandardsInput from "./QualityStandardsInput";
import {useNavigate} from "react-router-dom";
import {addProduct, editProduct, removeProduct} from "../../features/productsSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state";
import uploadToStorage from "../../utils/uploadToStorage";

const ProductForm = () => {
    const {product, setProduct} = useProductInput();
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (product.imageFile) {
                const url = await uploadToStorage(product.imageFile,
                    `products/img`,
                    product.img_url);

                setProduct(prevState => {
                    return {...prevState, img_url: url}
                });
            }
            if (product.standardsFile) {
                const url = await uploadToStorage(product.standardsFile,
                    `products/quality_standards`,
                    product.quality_standards_url);

                setProduct(prevState => {
                    return {...prevState, quality_standards_url: url}
                });
            }
            if (product.id) {
                dispatch(editProduct(product));
            } else {
                dispatch(addProduct(product));
            }
        } catch (error) {
            console.error(error);
        }

        navigate("/products");
    };

    const deleteHandler = () => {
        if (!product.id) return;
        dispatch(removeProduct(product.id));
    }

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
                               deleteHandler={deleteHandler}
                />
            </div>
        </form>
    );
}

export default ProductForm;