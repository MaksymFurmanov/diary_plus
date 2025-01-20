import Alert from "../components/BasicComponents/Alert";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const useExitAlert = (condition: boolean, exitRoute: string) => {
    const [exitAlert, setExitAlert] = useState(false);
    const navigate = useNavigate();

    const exitFunction = () => {
        if (condition) setExitAlert(true);
        else navigate(exitRoute);
    }

    const ExitAlert = exitAlert ? (
        <Alert yesRoute={exitRoute}
               onHide={() => setExitAlert(false)}
        >
            Exit without changes?
        </Alert>
    ) : (
        <></>
    );

    return {ExitAlert, exitFunction};
}

export default useExitAlert;