import Button from "./Button";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    const enterHandler = () => {
        navigate("/");
    }

    return <div className={"MainPage"}>
        <h1>Diary Plus</h1>
        <Button click={enterHandler}>
            PRIHLASENIE
        </Button>
    </div>
}

export default MainPage