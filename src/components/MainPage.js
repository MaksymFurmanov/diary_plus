import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    return <div className={"MainPage v-center"}>
        <h1>Diary Plus</h1>
        <Button onClick={() => navigate("/log_in")}>
            PRIHLASENIE
        </Button>
    </div>
}

export default MainPage