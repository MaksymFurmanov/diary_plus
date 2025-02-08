import {useParams} from "react-router-dom";
import TestingItem from "../components/Testing/TestingItem";
import {Fragment} from "react";
import PageTitle from "../components/BasicComponents/PageTitle";
import {RootState} from "../state";
import {MaterialsTest, ProductsTest} from "../types";
import {selectMaterialsTests} from "../features/materialsTestsSlice";
import {selectProductsTests} from "../features/productsTestsSlice";
import {useSelector} from "react-redux";

const title = {
    1: "Laboratory 1, materials",
    2: "Laboratory 2, products"
}

const TestingsPage = () => {
    const {laboratory_type} = useParams();
    const laboratory = Number(laboratory_type) as 1 | 2;
    console.log(laboratory, laboratory in [1, 2]);

    if (![1, 2].includes(laboratory)) throw new Error("Laboratory is not found");

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
    const testsSelector: (state: RootState) => MaterialsTest[] | ProductsTest[] =
        laboratory === 1 ? selectMaterialsTests : selectProductsTests
    let tests = useSelector(testsSelector);
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