import StockPlace from "./StockPlace";
import products from "../../data/products";
import orders from "../../data/orders";

const StockBox = ({group, type}) => {
    const size = group.length;

    let className = "";
    if (size === 6) {
        className = "vertical-stock-box"
    } else if (size === 8) {
        className = "horizontal-stock-box"
    }

    const places = group.map((place, index) => {
        let palletColor = "#F8F8F8";

        if (type === "entry") {
            if (place.order_id !== null) {
                const foundOrder = orders.find((order) =>
                    place.order_id === order.order_id);
                if (foundOrder) {
                    palletColor = foundOrder.pallet_color;
                }
            }
        } else if (type === "output") {
            if (place.product_id !== null) {
                const foundProduct = products.find((product) =>
                    place.product_id === product.product_id);
                if (foundProduct) {
                    palletColor = foundProduct.pallet_color;
                }
            }
        }

        return (
            <StockPlace key={index} palletColor={palletColor} />
        );
    });


    return <div className={`StockBox ${className}`}>
        {places}
    </div>
}

export default StockBox