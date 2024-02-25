import BackButton from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import TestingItem from "./TestingItem";
import {useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useTestsProducts} from "../../providers/TestsProductsProvider";

const TestingsPage = () => {
    const {laboratory} = useParams();

    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
    }

    const title = {
        laboratory_1: "Laboratórium 1, suroviny",
        laboratory_2: "Laboratórium 2, výrobky"
    }

    const testingItems = tests[laboratory].map((item, index) => {
        return <TestingItem key={index}
                            test={item}
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