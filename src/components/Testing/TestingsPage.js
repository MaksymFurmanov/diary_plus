import BackButton from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";

const TestingsPage = () => {
    const {laboratory} = useParams();


    const title = {
        laboratory_1: "Laboratórium 1, suroviny",
        laboratory_2: "Laboratórium 2, výrobky"
    }

/*    const testingItems = map.{

    }*/

    return <div>
        <BackButton name={"Testovanie"}/>
        <div className={"TestingPage"}>
            <h1>{title[laboratory]}</h1>
            <div className={"line"}/>
            {}
        </div>
    </div>
}

export default TestingsPage;