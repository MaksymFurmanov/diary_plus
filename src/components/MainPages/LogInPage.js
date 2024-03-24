import Button from "../BasicComponents/Button.tsx";
import {useEffect, useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Alert from "../BasicComponents/Alert";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../state/user/userSlice.ts";
import {useForm} from "react-hook-form";

const LogInPage = () => {
    const {loading, error, success} = useSelector(state => state.user);
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

    /*const loginResult = async (login, password) => {
        try {
            const response = await fetch(
                `${api}/user/log-in?username=${login}&password=${password}`
            );
            if (response.ok) {
                const newUser = await response.json();

                dispatch(setUser(user, {
                    ...newUser,
                    manager: newUser.departments.manager_id === newUser.employee_id
                }));

                localStorage.setItem("user", JSON.stringify(newUser));

                navigate("/navigation");
            } else {
                setAuthError(true);
            }
        } catch (e) {
            setConnectionError(true);
        }
    }*/

    useEffect(() => {
        if(success) navigate("/navigation");
        if(error) {
            if(error === "Authentication failed") {
                setAuthError(true);
            } else if (error === "Network error") {
                setConnectionError(true);
            } else {
                console.error(error);
            }
        }
    }, [error, navigate, success]);

    const submitHandler = (data) => {
        dispatch(logIn(data));
    }

    const errorHandler = (e) => {
        console.log(e);
    }

    return <>
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
        {loading && <Alert>Loading</Alert>}
    </>
}

export default LogInPage