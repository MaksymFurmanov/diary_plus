import PageTitle from "../components/BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getProductById} from "../utils/storage/products";
import ProductForm from "../components/Products/ProductForm";
import useExitAlert from "../hooks/useExitAlert";
import {useProductInput} from "../providers/ProductInputProvider";

const ProductPage = ({existing}: { existing: boolean }) => {
    const {productId} = useParams();

    const {product, setProduct} = useProductInput();

    const {ExitAlert, exitFunction} = useExitAlert(product.changed && existing, "products");

    useEffect(() => {
        if (!existing) return;
        
        const existingProduct = getProductById(productId);
        if (!existingProduct) throw new Error("Product not found");

        setProduct(prevState => {
            return {
                ...prevState,
                id: existingProduct.id,
                name: existingProduct.name,
                type: existingProduct.type,
                per_pallet: existingProduct.per_pallet,
                img_url: existingProduct.img_url,
                quality_standards_url: existingProduct.quality_standards_url
            }
        });

        //set quality standards file name
/*        if (existingProduct.quality_standards) {
            const docRef = ref(storage, existingProduct.quality_standards);
            getFileName(docRef).then((name) => {
                setProduct(prevState =>
                    ({...prevState, standardsDisplay: name}));
            });
        }*/
    }, [existing, productId, setProduct]);

    return <>
        <PageTitle name={existing ? "Produkt" : "Nový produkt"}
                   onBack={exitFunction}/>

        <ProductForm/>

        {ExitAlert}
    </>
}

export default ProductPage