import {useParams} from "react-router-dom";
import TestingItem from "../components/Testing/TestingItem";
import {getProductsTests} from "../utils/storage/testsProducts";
import {getMaterialsTests} from "../utils/storage/testsMaterials";
import {Fragment} from "react";
import PageTitle from "../components/BasicComponents/PageTitle";

const title = {
    1: "Laboratory 1, materials",
    2: "Laboratory 2, products"
}

const TestingsPage = () => {
    const {laboratory_type} = useParams();
    const laboratory = Number(laboratory_type) as 1 | 2;

    if (!(laboratory in [1, 2])) throw new Error("Laboratory is not found");

    return <>
        <PageTitle name={"Testing"}/>
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
    const tests = laboratory === 1
        ? getMaterialsTests()
        : getProductsTests();
    if (!tests) return <Fragment/>;

    return (
        <>
            {tests.map((item, index) => {
                return (
                    <TestingItem key={index}
                                 test={item}
                                 laboratory={laboratory}
                    />
                );
            })}
        </>
    )
}

export default TestingsPage;