import BackButton from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import TestingItem from "./TestingItem";
import {useTestMaterials} from "../../providers/TestMaterialsProvider";
import {useTestProducts} from "../../providers/TestProductsProvider";

const TestingsPage = () => {
    const test_materials = useTestMaterials();
    const test_products = useTestProducts();
    const {laboratory} = useParams();

    const data = {
        laboratory_1: test_materials,
        laboratory_2: test_products
    }

    const title = {
        laboratory_1: "Laboratórium 1, suroviny",
        laboratory_2: "Laboratórium 2, výrobky"
    }

    const testingItems = data[laboratory].map((item, index) => {
        return <TestingItem key={index}
                            item={item}
                            laboratory={laboratory}/>
    })

    return <>
        <BackButton name={"Testovanie"}/>
        <div className={"TestingPage"}>
            <h1>{title[laboratory]}</h1>
            <div className={"line"}/>
            <div className={"testing-items"}>
                {testingItems}
            </div>
        </div>
    </>
}

export default TestingsPage;