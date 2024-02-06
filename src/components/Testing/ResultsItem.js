import Button from "../BasicComponents/Button.tsx";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";

const ResultsItem = ({item, laboratory}) => {
    const materials = useMaterials();
    const orders = useOrders();
    const products = useProducts();

    let date, name, details, standards = null;
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
        standards = foundProduct.quality_standards;
    }

    const handleDownload = (type) => {
        const link = document.createElement('a');
        link.href = type !== "standards" ? standards : item.file;
        link.download = type !== "standards"
            ? `${name}_${details}_quality_standards`
            : `${item.test_id}.pdf`;
        link.click();
    };

    return <div className={"ResultsItem"}>
        <div className={"test-info side-white-border"}>
            <p>{date}</p>
            <p>{item.test_id}</p>
            <p>{name}</p>
            <p>{details}</p>
        </div>
        <div className={"document-boxes"}>
            {laboratory === "laboratory_2" && <div>
                <p>Štandardy</p>
                <p onClick={() =>
                    handleDownload("standards")}>
                    OTVORIŤ</p>
            </div>}
            <div>
                <p>{item.file}</p>
                <p onClick={() => handleDownload("standards")}>
                    OTVORIŤ</p>
            </div>
        </div>
        <div>
            <Button colorType={2}>SCHVALIŤ</Button>
            <Button colorType={2}>ZAMIETNUŤ</Button>
        </div>
    </div>
}

export default ResultsItem;