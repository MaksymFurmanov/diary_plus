import {useState} from "react";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useServer} from "../providers/ServerProvider";
import {useSetUser} from "../providers/UserProvider";
import Button from "../components/BasicComponents/Button.tsx";
import Alert from "../components/BasicComponents/Alert";

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [connectionError, setConnectionError] = useState(false);
    const [authError, setAuthError] = useState(false);

    const loginHandler = async (login, password) => {
        try {
            const response = {ok: true}
            if (response.ok) {
                const newUser: User = {
                  employee_id: 10,
      login: "",
      password: ""
                };

                setUser({
                    ...newUser,
                    manager: isManager(newUser)
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

    return (
        <>
            <LoginForm />
            {connectionError &&
                (<Alert type={"connection-error"}
                       onHide={() => setConnectionError(false)}>
                    Bad internet connection.
Please check and try again.
                </Alert>)

            }
            {authError && <Alert type={"error"}
                                 onHide={() => setAuthError(false)}>
                Incorrect username or password.
Please check or contact administrator.
            </Alert>}
        </>
    );
}

export default LogIn