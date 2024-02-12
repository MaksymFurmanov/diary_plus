import {FaArrowRight} from "react-icons/fa6";
import {useState} from "react";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";

const TestingItem = ({item, laboratory}) => {
    const materials = useMaterials();
    const orders = useOrders();
    const products = useProducts();

    const [status, setStatus] = useState(item.status);
    const selectHandler = (e) => {
        setStatus(e.target.value);
    }

    let date, name, details;
    if (laboratory === "laboratory_1") {
        const foundMaterial = materials.find((material) =>
            material.material_id === item.material_id);
        date = foundMaterial.arriving_date;
        name = foundMaterial.name;
        details = foundMaterial.supplier;
    } else {
        const foundOrder = orders.find((order) =>
            order.order_id === item.order_id);
        const foundProduct = products.find((product) =>
            product.product_id === foundOrder.order_id);
        date = foundOrder.done_date;
        name = foundProduct.name;
        details = foundProduct.type;
    }

    return <div className={"TestingItem"}>
        <p>{date}</p>
        <p>{item.test_id}</p>
        <p>{name}</p>
        <p>{details}</p>
        <select value={status}
                onChange={(e) =>
                    selectHandler(e)}>
            <option value={0}>
                Čaká sa vzorka
            </option>
            <option value={1}>
                Vzorka pripravená
            </option>
            <option value={2}>
                Testuje sa
            </option>
            <option value={3}>
                Čaká sa na schválenie
            </option>
        </select>
        <p style={{
            backgroundColor: "#F8F8F8",
            color: "black"
        }}>
            {item.document}
        </p>
        <button>
            {<FaArrowRight/>}
        </button>
    </div>
}

export default TestingItem;