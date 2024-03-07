import Button from "../BasicComponents/Button.tsx";
import {useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Input from "../BasicComponents/Input.tsx";
import {useServer} from "../../providers/ServerProvider";
import {useSetUser} from "../../providers/UserProvider";
import Alert from "../BasicComponents/Alert";

const LogInPage = () => {
    const setUser = useSetUser();
    const api = useServer();

    const navigate = useNavigate();

    const [userForm, setUserForm] = useState({
        login: "",
        password: "",
    });

    const [passwordToggle, setPasswordToggle] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [authError, setAuthError] = useState(false);

    const passwordHandler = (e) => {
        e.preventDefault();
        setPasswordToggle(!passwordToggle);
    }

    const loginResult = async () => {
        try {
            const response = await fetch(
                `${api}/user/log-in?username=${userForm.login}&password=${userForm.password}`
            );
            if (response.ok) {
                const user = await response.json();

                setUser({
                    ...user, manager:
                        user.department.manager_id === user.employee_id
                });
                navigate("/navigation");
            } else {
                setAuthError(true);
            }
        } catch (e) {
            setConnectionError(true);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        loginResult();
    }

    return <>
        <form onSubmit={submitHandler} className={"LogInPage"}>
            <div className="log-in-background v-center">
                <h1>PRIHLÁSENIE</h1>
                <div className={"white-outline login-inputs"}>
                    <div>
                        <Input type={"text"}
                               name={"login"}
                               position={"close"}
                               size={3}
                               value={userForm.login}
                               setter={setUserForm}
                               state={userForm}
                               autoComplete={"username"}>
                            Meno</Input>
                    </div>
                    <div className={"password"}>
                        <Input type={passwordToggle ? "text" : "password"}
                               position={"close"}
                               size={3}
                               name={"password"}
                               value={userForm.password}
                               setter={setUserForm}
                               state={userForm}
                               autoComplete="current-password">
                            Heslo</Input>
                        <button onClick={(e) =>
                            passwordHandler(e)}>
                            {passwordToggle
                                ? <IoMdEyeOff/>
                                : <IoMdEye/>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div className={"v-center"}>
                <Button type={"submit"}>
                    PRIHLÁSIŤ SA
                </Button>
            </div>
        </form>
        {connectionError &&
            <Alert type={"connection-error"}
                   onHide={() => setConnectionError(false)}>
                Zlé pripojenie na internet.
                Skontrolujte a skúste ešte raz
            </Alert>}
        {authError && <Alert type={"error"}
                             onHide={() => setAuthError(false)}>
            Nesprávne meno alebo heslo.
            Skontrolujte alebo kontaktujte administrátora
        </Alert>}
    </>
}

export default LogInPage