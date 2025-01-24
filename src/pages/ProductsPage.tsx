import {useNavigate} from "react-router-dom";
import {BsPlusCircleFill} from "react-icons/bs";
import PageTitle from "../components/BasicComponents/PageTitle";
import ProductsGallery from "../components/Products/ProductsGallery";

const ProductsPage = () => {
    const navigate = useNavigate();

    return <>
        <PageTitle name={"Produkty"}/>
        <div className={"ProductsPage"}>
            <ProductsGallery/>
            
            <button className={"plus-button"}
                    onClick={() => navigate("new_product")}>
                <BsPlusCircleFill/>
            </button>
        </div>
    </>
}

export default ProductsPage;