import PageTitle from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import addImage from "../../fig/img/add_image.png"
import Button from "../BasicComponents/Button.tsx";
import PalletColor from "../BasicComponents/PalletColor";
import ProductionPlan from "./ProductionPlan";
import Input from "../BasicComponents/Input.tsx";
import {useProducts} from "../../providers/ProductsProvider";

const ProductInfo = ({existing}) => {
    let {productId} = useParams();
    productId = parseInt(productId);
    const products = useProducts();

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
    useEffect(() => {
        if (existing) {
            const existingProduct = products.find((product) =>
                product.product_id === productId);
            if (existingProduct) setProduct(existingProduct);
        }
    }, [existing, productId, products]);

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
                           setter={setProduct}
                           state={product}>
                        Produkt:
                    </Input>
                    <Input name={"type"}
                           value={product.type}
                           setter={setProduct}
                           state={product}>
                        Typ:
                    </Input>
                    <Input type={"file"}
                           name={"quality_standards"}
                           value={product.quality_standards}
                           setter={setProduct}
                           state={product}>
                        Štandardy kvality:
                    </Input>
                    <Input type={"number"}
                           min={1}
                           size={2}
                           name={"per_pallet"}
                           value={product.per_pallet}
                           setter={setProduct}
                           state={product}>
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