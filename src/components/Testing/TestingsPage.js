import BackButton from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";

const TestingsPage = () => {
    const {laboratory} = useParams();

    const title = {
        laboratory_1: "Testovanie surovín",
        laboratory_2: "Testovanie výrobkov"
    }

    return <div>
        <BackButton name={title[laboratory]}/>
        <div className={"TestingPage"}>

        </div>
    </div>
}

export default TestingsPage;