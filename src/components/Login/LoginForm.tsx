import Button from "../BasicComponents/Button";
import PasswordInput from "./PasswordInput";
import {User} from "../../types";
import {useUser} from "../../providers/UserProvider";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";

interface LoginFormProps {
    setAuthError: Dispatch<SetStateAction<boolean>>;
    setConnectionError: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({setAuthError, setConnectionError}: LoginFormProps) => {
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        try {
            const response = {ok: true};
            if (response.ok) {
                const newUser: User = {
                    employee_id: "10",
                    login: login,
                    password: password
                };

                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));

                navigate("/navigation");
            } else {
                setAuthError(true);
            }
        } catch (e) {
            console.log(e);
            setConnectionError(true);
        }
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        loginHandler();
    };

    return (
        <form onSubmit={submitHandler} className={"LogInPage"}>
            <div className="log-in-background v-center">
                <h1>PRIHLÁSENIE</h1>
                <div className={"white-outline login-inputs"}>
                    <div className={"login-input"}>
                        <label>Username</label>
                        <input
                            type="text"
                            autoComplete="username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <PasswordInput
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className={"v-center"}>
                <Button type="submit">LOG IN</Button>
            </div>
        </form>
    );
};

export default LoginForm;