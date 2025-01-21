import BackButton from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import TestingItem from "../components/Testing/TestingItem";
import {getProductsTests} from "../utils/storage/testsProducts";
import {getMaterialsTests} from "../utils/storage/testsMaterials";
import {Fragment} from "react";

const TestingsPage = () => {
    const {laboratoryRaw} = useParams();
    const laboratory = Number(laboratoryRaw) as 1 | 2;
    if(!(laboratory in [1, 2])) throw new Error("Laboratory is not found");

    const title = {
        1: "Laboratory 1, materials",
        2: "Laboratory 2, products"
    }

    return <>
        <BackButton name={"Testovanie"}/>
        <div className={"TestingPage"}>
            <h1>{title[laboratory]}</h1>
            <div className={"line"}/>
            <div className={"testing-items"}>
                <TestingItems laboratory={laboratory}/>
            </div>
        </div>
    </>
}

const TestingItems = ({laboratory}: {
    laboratory: 1 | 2
}) => {
    if (laboratory === 1) {
        const tests = getMaterialsTests();
        if(!tests) return <Fragment/>;

        return tests.map((item, index) => {
            return <TestingItem key={index}
                                test={item}
                                laboratory={1}
            />
        })
    } else {
        const tests = getProductsTests();
        if(!tests) return <Fragment/>;

        return tests.map((item, index) => {
            return <TestingItem key={index}
                                test={item}
                                laboratory={2}/>
        })
    }
}

export default TestingsPage;