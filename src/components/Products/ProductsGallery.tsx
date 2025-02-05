import {isManager} from "../../utils/storage/departments";
import {useState} from "react";
import {useUser} from "../../providers/UserProvider";
import Button from "../BasicComponents/Button";
import {useNavigate} from "react-router-dom";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {getProducts} from "../../utils/storage/products";
import {Product} from "../../types";

const Placeholder = "../../assets/product_placeholder.webp";

const ProductsGallery = () => {
    const [cardsIndex, setCardsIndex] = useState(0);

    const products = getProducts();
    if (!products) return <></>;

    const swipeHandler = (direction: "left" | "right") => {
        if (direction === 'left' && cardsIndex > 0) {
            setCardsIndex(cardsIndex - 1);
        } else if (direction === 'right' && cardsIndex < products.length - 3) {
            setCardsIndex(cardsIndex + 1);
        }
    }

    return (
        <div className={"evenly"}>
            <div className={"h-center"} style={{zIndex: 3}}>
                <button className={"products-arrow"}
                        onClick={() => swipeHandler("left")}
                        disabled={cardsIndex === 0}>
                    <IoIosArrowBack/>
                </button>
            </div>

            <div className={"product-cards"}>
                <div style={{transform: `translateX(-${cardsIndex * 100 / 3}%)`}}>
                    <ProductCards products={products}/>
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
    );
}

const ProductCards = ({products}: {
    products: Product[]
}) => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["2", "1"]);

    const navigate = useNavigate();

    return (
        <>
            {products.map((product, index) => {
                return (
                    <div key={index} className={"product-card"}>
                        <img src={product.img_url || Placeholder} alt={""}/>
                        <p>Product: {product.name}</p>
                        <p>Type: {product.type}</p>
                        {manager && (
                            <Button onClick={() =>
                                navigate(`/products/${product.id}`)} colorType={2}
                            >
                                More
                            </Button>
                        )}
                    </div>
                );
            })}
        </>
    )
}

export default ProductsGallery;