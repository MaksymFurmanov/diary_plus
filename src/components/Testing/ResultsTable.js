import ResultsItem from "./ResultsItem";
import {useTestMaterials} from "../../providers/TestMaterialsProvider";
import {useTestProducts} from "../../providers/TestProductsProvider";

const ResultsTable = ({laboratory}) => {
    const test_materials = useTestMaterials();
    const test_products = useTestProducts();

    const data = {
        laboratory_1: test_materials,
        laboratory_2: test_products
    }

    const title = {
        laboratory_1: "Laboratórium 1, suroviny",
        laboratory_2: "Laboratórium 2, výrobky"
    }

    const resultItems = data[laboratory].map((item, index) => {
        return <ResultsItem key={index}
                            laboratory={laboratory}
                            item={item}/>
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