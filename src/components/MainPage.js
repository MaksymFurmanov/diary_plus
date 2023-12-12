import Button from "./Button";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    const enterHandler = () => {
        navigate("/log_in");
    }

    return <div className={"MainPage align-center"}>
        <h1>Diary Plus</h1>
        <Button click={enterHandler}>
            PRIHLASENIE
        </Button>
    </div>
}

export default MainPage