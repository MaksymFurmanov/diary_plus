import products from "../../data/products"
import PageTitle from "../BasicComponents/PageTitle";
import Button from "../BasicComponents/Button.tsx";
import {useNavigate} from "react-router-dom";
import {BsPlusCircleFill} from "react-icons/bs";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";

const ProductsPage = () => {
    const navigate = useNavigate();

    const productCards = products.map((product, index) => {
        return <div key={index} className={"product-card"}>
            <img src={product.img} alt={""}/>
            <p>Product: {product.name}</p>
            <p>Typ: {product.type}</p>
            <Button onClick={() =>
                navigate(`edit/${product.product_id}`)}
                    colorType={2}>
                Viac
            </Button>
        </div>
    })

    return <>
        <PageTitle name={"Produkty"}/>
        <div className={"ProductsPage"}>
            <div className={"evenly"}>
                <div className={"arrow"}>
                    <button className={"left-arrow"}>
                        <IoIosArrowBack/>
                    </button>
                </div>
                {productCards}
                <div className={"arrow"}>
                    <button className={"right-arrow"}>
                        <IoIosArrowForward/>
                    </button>
                </div>
            </div>
            <button className={"plus-button"}
                    onClick={() => navigate("new_product")}>
                <BsPlusCircleFill/>
            </button>
        </div>
    </>
}

export default ProductsPage;