import Button from "../BasicComponents/Button.tsx";
import {useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Input from "../BasicComponents/Input.tsx";
import {useServer} from "../../providers/SereverProvider";
import {useSetUser} from "../../providers/UserProvider";

const LogInPage = () => {
    const navigate = useNavigate();
    const api = useServer();
    const setUser = useSetUser();

    const [userForm, setUserForm] = useState({
        login: "",
        password: "",
        wrong: false
    });

    const [passwordToggle, setPasswordToggle] = useState(false);
    const passwordHandler = (e) => {
        e.preventDefault();
        setPasswordToggle(!passwordToggle);
    }

    const loginResult = async () => {
        try {
            const response = await fetch(
                `${api}/user/log_in?username=${userForm.login}&password=${userForm.password}`
            );
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                navigate("/navigation");
            } else {
                setUserForm(prevState => ({...prevState, wrong: true}));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        loginResult();
    }

    return <form onSubmit={submitHandler} className={"LogInPage"}>
        <div className="log-in-background v-center white-outline">
            <h1>PRIHLÁSENIE</h1>
            <div>
                <Input type={"text"}
                       name={"login"}
                       size={3}
                       value={userForm.login}
                       setter={setUserForm}
                       state={userForm}>
                    Meno</Input>
            </div>
            <div>
                <Input type={passwordToggle ? "text" : "password"}
                       size={3}
                       name={"password"}
                       value={userForm.password}
                       setter={setUserForm}
                       state={userForm}>
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
        </div>
        <div className={"v-center"}>
            <Button type={"submit"}>
                PRIHLÁSIŤ SA
            </Button>
        </div>
    </form>
}

export default LogInPage