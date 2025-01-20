import {useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useServer} from "../providers/ServerProvider";
import {useSetUser} from "../providers/UserProvider";
import Button from "../components/BasicComponents/Button.tsx";
import Alert from "../components/BasicComponents/Alert";

const LogIn = () => {
    const api = useServer();
    const setUser = useSetUser();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const [passwordToggle, setPasswordToggle] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [authError, setAuthError] = useState(false);

    const passwordHandler = (e) => {
        e.preventDefault();
        setPasswordToggle(!passwordToggle);
    }

    const loginResult = async (login, password) => {
        try {
            const response = await fetch(
                `${api}/user/log-in?username=${login}&password=${password}`
            );
            if (response.ok) {
                const newUser = await response.json();

                setUser({
                    ...newUser,
                    manager: newUser.department.manager_id === newUser.employee_id
                });

                localStorage.setItem("user", JSON.stringify(newUser));

                navigate("/navigation");
            } else {
                setAuthError(true);
            }
        } catch (e) {
            console.log(e)
            setConnectionError(true);
        }
    }

    /*    useEffect(() => {
            if (success) navigate("/navigation");
            if (error) {
                if (error === "Authentication failed") {
                    setAuthError(true);
                } else if (error === "Network error") {
                    setConnectionError(true);
                } else {
                    console.error(error);
                }
            }
        }, [error, navigate, success]);*/

    const submitHandler = (data) => {
        loginResult(data.login, data.password);
    }

    const errorHandler = (e) => {
        console.error(e);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler, errorHandler)} className={"LogInPage"}>
                <div className="log-in-background v-center">
                    <h1>PRIHLÁSENIE</h1>
                    <div className={"white-outline login-inputs"}>
                        <div className={"login-input"}>
                            <label>Meno</label>
                            <input type={"text"}
                                   autoComplete={"username"}
                                   {...register('login')}/>
                        </div>
                        <div className={"password-input"}>
                            <label>Heslo</label>
                            <input type={passwordToggle ? "text" : "password"}
                                   autoComplete="current-password"
                                   {...register('password')}/>
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
            {/*{loading && <Alert>Loading</Alert>}*/}
        </>
    );
}

export default LogIn