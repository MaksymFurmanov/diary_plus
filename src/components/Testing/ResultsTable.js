import ResultsItem from "./ResultsItem";
import {useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useTestsProducts} from "../../providers/TestsProductsProvider";
import {Fragment} from "react";

const ResultsTable = ({laboratory}) => {
    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
    }

    const title = {
        laboratory_1: "Laboratórium 1, suroviny",
        laboratory_2: "Laboratórium 2, výrobky"
    }

    const resultItems = tests[laboratory].map((test, index) => {
        return test.document
            ? <ResultsItem key={index}
                           laboratory={laboratory}
                           test={test}/>
            : <Fragment key={index}/>
    })

    return <div className={"ResultsTable"}>
        <div className={"results-head"}>
            <h3>{title[laboratory]}</h3>
        </div>
        <div className={"results-body"}>
            {resultItems}
        </div>
    </div>
}

export default ResultsTable