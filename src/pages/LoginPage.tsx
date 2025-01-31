import {useState} from "react";
import Alert from "../components/BasicComponents/Alert";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
    const [connectionError, setConnectionError] = useState(false);
    const [authError, setAuthError] = useState(false);

    return (
        <>
            <LoginForm setConnectionError={setConnectionError}
                       setAuthError={setAuthError}
            />

            {connectionError && (
                <Alert type={"connection-error"}
                       onHide={() => setConnectionError(false)}
                >
                    Bad internet connection.
                    Please check and try again.
                </Alert>
            )}

            {authError && (
                <Alert type={"error"}
                       onHide={() => setAuthError(false)}
                >
                    Incorrect username or password.
                    Please check or contact administrator.
                </Alert>
            )}
        </>
    );
}

export default LoginPage