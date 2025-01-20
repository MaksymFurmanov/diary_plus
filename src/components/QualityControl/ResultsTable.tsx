import ResultsItem from "./ResultsItem";
import {Fragment} from "react";
import {MaterialsTest, ProductsTest} from "../../types";
import {getMaterialsTests} from "../../utils/storage/testsMaterials";
import {getProductsTests} from "../../utils/storage/testsProducts";

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
                <ResultsItems/>
            </div>
        </div>
    );
}

const ResultItems = ({laboratory}: {
    laboratory: 1 | 2
}) => {
    let items: MaterialsTest[] | ProductsTest[]
    if (laboratory === 1) {
        items = getMaterialsTests();
    } else {
        items = getProductsTests();
    }

    return items.map((test, index) => {
        return (
            test.document_url
                ? <ResultsItem key={index}
                               laboratory={laboratory}
                               test={test}/>
                : <Fragment key={index}/>
        )
    })
}

export default ResultsTable