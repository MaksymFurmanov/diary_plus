import Button from "../BasicComponents/Button.tsx";
import {useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Input from "../BasicComponents/Input.tsx";

const LogInPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const [passwordToggle, setPasswordToggle] =
        useState(false);
    const passwordHandler = (e) => {
        e.preventDefault();
        setPasswordToggle(!passwordToggle);
    }

    const submitHandler = () => {
    }

    return <div className={"LogInPage"}>
        <div className="log-in-background v-center white-outline">
            <h1>PRIHLÁSENIE</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <Input type={"text"}
                           name={"login"}
                           size={3}
                           value={formData.login}
                           setter={setFormData}
                           state={formData}>
                        Meno</Input>
                </div>
                <div>
                    <Input type={passwordToggle ? "text" : "password"}
                           size={3}
                           name={"password"}
                           value={formData.password}
                           setter={setFormData}
                           state={formData}>
                        Heslo</Input>
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