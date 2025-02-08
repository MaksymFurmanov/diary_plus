import ResultsItem from "./ResultsItem";
import {Fragment} from "react";
import {MaterialsTest, ProductsTest} from "../../types";
import {useSelector} from "react-redux";
import {RootState} from "../../state";
import {selectMaterialsTests} from "../../features/materialsTestsSlice";
import {selectProductsTests} from "../../features/productsTestsSlice";

const title = {
    1: "Laboratory 1, materials",
    2: "Laboratory 2, products"
}

const ResultsTable = ({laboratory}: {
    laboratory: 1 | 2
}) => {

    return (
        <div className={"ResultsTable"}>
            <div className={"results-head"}>
                <h3>{title[laboratory]}</h3>
            </div>
            <div className={"results-body"}>
                <ResultItems laboratory={laboratory}/>
            </div>
        </div>
    );
}

const ResultItems = ({laboratory}: {
    laboratory: 1 | 2
}) => {
    const testsSelector: (state: RootState) => MaterialsTest[] | ProductsTest[] =
        laboratory === 1 ? selectMaterialsTests : selectProductsTests
    let tests = useSelector(testsSelector);

    if (!tests) return <></>;

    return (
        <>
            {tests.map((test, index) => {
                return (
                    test.document_url
                        ? <ResultsItem key={index}
                                       laboratory={laboratory}
                                       test={test}/>
                        : <Fragment key={index}/>
                )
            })}
        </>
    )
}

export default ResultsTable