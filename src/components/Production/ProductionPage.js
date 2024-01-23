import PageTitle from "../BasicComponents/PageTitle";
import orders from "../../data/orders"
import ProductionItem from "./ProductionItem";

const ProductionPage = () => {


    const productionItems = orders.map((order, index) => {
        return <ProductionItem order={order}
                               key={index}/>
    });

    return <>
        <PageTitle name={"Plán výroby"}/>
        {productionItems}
    </>
}

export default ProductionPage