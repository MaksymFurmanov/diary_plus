import PageTitle from "../components/BasicComponents/PageTitle";
import ResultsTable from "../components/QualityControl/ResultsTable";

const QualityControl = () => {

    return <>
        <PageTitle name={"Kontrola kvality"}/>
        <div className={"QualityControlPage"}>
            <ResultsTable laboratory={"laboratory_1"}/>
            <ResultsTable laboratory={"laboratory_2"}/>
        </div>
    </>
}

export default QualityControl