import PageTitle from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import products from "../../data/products";
import addImage from "../../fig/img/add_image.png"
import Button from "../BasicComponents/Button.tsx";
import PalletColor from "../BasicComponents/PalletColor";
import ProductionPlan from "./ProductionPlan";
import Input from "../BasicComponents/Input.tsx";

const ProductInfo = ({existing}) => {
    let {productId} = useParams();
    productId = parseInt(productId);

    const [product, setProduct] = useState({
        product_id: null,
        name: "",
        type: "",
        per_pallet: 20,
        pallet_color: "",
        img: addImage,
        quality_standards: "",
        changed: false
    });
    const textInputHandler = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value, changed: true});
    };
    const numberInputHandler = (e) => {
        const {name, value} = e.target;
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setProduct({...product, [name]: value, changed: true});
        }
    };

    const imageInputHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProduct({
                    ...product,
                    img: reader.result,
                    changed: true
                });
            };
            reader.readAsDataURL(file);
        }
    };

    //fetch data later
    useEffect(() => {
        if (existing) {
            const existingProduct = products.find((product) =>
                product.product_id === productId);
            if (existingProduct) setProduct(existingProduct);
        }
    }, [existing, productId]);

    const unsavedChangesHandler = () => {
        if (product.changed) {
            return "/products"
        }
        return "/products"
    }

    const deleteHandler = () => {

    }

    const saveHandler = () => {

    }

    return <>
        <PageTitle name={existing ? "Produkt" : "Nový produkt"}
                   prev={unsavedChangesHandler()}/>
        <form className={"ProductInfo evenly"}>
            <div>
                <div className={"add-product-image"}>
                    <input type={"file"}
                           accept={"image/*"}
                           name={"img"}
                           value={undefined}
                           id={"img"}
                           style={{display: "none"}}
                           onChange={imageInputHandler}
                    />
                    <label htmlFor={"img"}>
                        <img src={product.img}
                             alt={""}/>
                    </label>
                </div>
                <PalletColor/>
            </div>
            <div className={"inputs"}>
                <div>
                    <Input name={"name"}
                           value={product.name}
                           onChange={textInputHandler}>
                        Produkt:
                    </Input>
                    <Input name={"type"}
                           value={product.type}
                           onChange={textInputHandler}>
                        Typ:
                    </Input>
                    <Input type={"file"}
                           name={"quality_standards"}
                           value={product.quality_standards}
                           onChange={textInputHandler}>
                        Štandardy kvality:
                    </Input>
                    <Input type={"number"}
                           min={1}
                           size={2}
                           name={"per_pallet"}
                           value={product.per_pallet}
                           onChange={numberInputHandler}>
                        Počet na paletu:
                    </Input>
                    <div>
                        <label htmlFor={"production_plan"}>
                            Produkčný plán:
                        </label>
                        <ProductionPlan productId={productId}/>
                    </div>
                </div>
                <div>
                    {existing
                        ? <>
                            <Button onClick={deleteHandler}
                                    type={"delete"}>VYMAZAŤ</Button>
                            <Button onClick={saveHandler}
                                    type={"edit"}>ÚPRAVIŤ</Button>
                        </>
                        : <Button type={"submit"}>PRIDAŤ</Button>
                    }
                </div>
            </div>
        </form>
    </>
}

export default ProductInfo