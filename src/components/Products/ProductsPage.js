import PageTitle from "../BasicComponents/PageTitle";
import Button from "../BasicComponents/Button.tsx";
import {useNavigate} from "react-router-dom";
import {BsPlusCircleFill} from "react-icons/bs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useProducts} from "../../providers/ProductsProvider";
import placeholder from "../../fig/img/product_placeholder.webp"
import {useState} from "react";
import {useSelector} from "react-redux";

const ProductsPage = () => {
    const user = useSelector(state => state.user.userInfo);
    const products = useProducts();

    const navigate = useNavigate();
    const [cardsIndex, setCardsIndex] = useState(0);

    const productCards = products.map((product, index) => {
        return <div key={index} className={"product-card"}>
            <img src={product.img || placeholder} alt={""}/>
            <p>Product: {product.name}</p>
            <p>Typ: {product.type}</p>
            {user.manager && <Button onClick={() =>
                navigate(`edit/${product.product_id}`)}
                                     colorType={2}>
                Viac
            </Button>}
        </div>
    });

    const swipeHandler = (direction) => {
        if (direction === 'left' && cardsIndex > 0) {
            setCardsIndex(cardsIndex - 1);
        } else if (direction === 'right' && cardsIndex < products.length - 3) {
            setCardsIndex(cardsIndex + 1);
        }
    }

    return <>
        <PageTitle name={"Produkty"}/>
        <div className={"ProductsPage"}>
            <div className={"evenly"}>
                <div className={"h-center"} style={{zIndex: 3}}>
                    <button className={"products-arrow"}
                            onClick={() =>
                                swipeHandler("left")}
                            disabled={cardsIndex === 0}>
                        <IoIosArrowBack/>
                    </button>
                </div>
                <div className={"product-cards"}>
                    <div style={{transform: `translateX(-${cardsIndex * 100 / 3}%)`}}>
                        {productCards}
                    </div>
                </div>
                <div className={"h-center"} style={{zIndex: 3}}>
                    <button className={"products-arrow"}
                            onClick={() =>
                                swipeHandler("right")}
                            disabled={cardsIndex >= products.length - 3}>
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