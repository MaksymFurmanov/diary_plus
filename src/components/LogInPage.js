import Button from "./Button";
import {useState} from "react";
import eye from "../fig/img/mdi_eye.svg"
import eyeClosed from "../fig/img/closed_eye.png"
import {useNavigate} from "react-router-dom";

const LogInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const passwordHandler = () => {
        setPasswordToggle(!passwordToggle);
    }
    const inputHandler = (e, type) => {
        switch (type) {
            case "login":
                setFormData(prevState => (
                    {...prevState, login: e.target.value}
                ));
                break
            case "password":
                setFormData(prevState => (
                    {...prevState, password: e.target.value}
                ));
                break
            default:
        }
    }

    return <div className={"LogInPage"}>
        <div className="log-in-background v-center">
            <h1>PRIHLÁSENIE</h1>
            <form>
                <div>
                    <label>Meno</label>
                    <input type={"text"}
                           value={formData.login}
                           onChange={(e) =>
                               inputHandler(e, 'login')}
                    />
                </div>
                <div>
                    <label>Heslo</label>
                    <input type={passwordToggle ? "text" : "password"}
                           value={formData.password}
                           onChange={(e) =>
                               inputHandler(e, 'password')}
                    />
                    {passwordToggle
                        ? <img className={"eye-img"}
                             alt={""}
                             src={eyeClosed}
                             onClick={passwordHandler}
                        />
                        : <img className={"eye-img"}
                               alt={""}
                               src={eye}
                               onClick={passwordHandler}
                        />}
                </div>
            </form>
        </div>
        <div className={"v-center"}>
            <Button click={() => navigate("/navigation")}>
                PRIHLÁSIŤ SA
            </Button>
        </div>
    </div>
}

export default LogInPage