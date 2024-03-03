import PageTitle from "../BasicComponents/PageTitle";
import ResultsTable from "./ResultsTable";
const QualityControlPage = () => {

    return <>
        <PageTitle name={"Kontrola kvality"}/>
        <div className={"QualityControlPage"}>
            <ResultsTable laboratory={"laboratory_1"}/>
            <ResultsTable laboratory={"laboratory_2"}/>
        </div>
    </>
}

export default QualityControlPage