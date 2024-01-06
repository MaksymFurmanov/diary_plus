import Button from "./Button.tsx";
import {useState} from "react";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const LogInPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const [passwordToggle, setPasswordToggle] =
        useState(false);
    const passwordHandler = (e) => {
        e.preventDefault();
        setPasswordToggle(!passwordToggle);
    }

    const submitHandler = () => {
    }

    return <div className={"LogInPage"}>
        <div className="log-in-background v-center">
            <h1>PRIHLÁSENIE</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Meno</label>
                    <input type={"text"}
                           name={"login"}
                           value={formData.login}
                           onChange={(e) =>
                               inputHandler(e, 'login')}
                    />
                </div>
                <div>
                    <label>Heslo</label>
                    <input type={passwordToggle ? "text" : "password"}
                           name={"password"}
                           value={formData.password}
                           onChange={(e) =>
                               inputHandler(e, 'password')}
                    />
                    <button className={"password-eye"}
                            onClick={(e) =>
                                passwordHandler(e)}>
                        {passwordToggle
                            ? <IoMdEyeOff/>
                            : <IoMdEye/>
                        }
                    </button>
                </div>
            </form>
        </div>
        <div className={"v-center"}>
            <Button type={"submit"}
                    onClick={() => navigate("/navigation")}>
                PRIHLÁSIŤ SA
            </Button>
        </div>
    </div>
}

export default LogInPage