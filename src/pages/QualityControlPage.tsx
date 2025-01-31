import PageTitle from "../components/BasicComponents/PageTitle";
import ResultsTable from "../components/QualityControl/ResultsTable";

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