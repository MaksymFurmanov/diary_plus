import {useNavigate} from "react-router-dom";
import Button from "../components/BasicComponents/Button";

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className={"MainPage v-center"}>
            <h1>Diary Plus</h1>
            <Button onClick={() => navigate("/log_in")}>
                LOG IN
            </Button>
        </div>
    );
}

export default Main