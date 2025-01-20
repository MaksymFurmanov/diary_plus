import PageTitle from "../BasicComponents/PageTitle";
import ResultsTable from "./ResultsTable";
const QualityControlPage = () => {

    return <>
        <PageTitle name={"Kontrola kvality"}/>
        <div className={"QualityControlPage"}>
            <ResultsTable laboratory={1}/>
            <ResultsTable laboratory={2}/>
        </div>
    </>
}

export default QualityControlPage