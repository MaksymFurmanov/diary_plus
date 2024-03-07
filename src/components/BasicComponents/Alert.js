import React from "react";
import Button from "./Button.tsx";
import {FaCheck, FaExclamationCircle, FaTrash, FaWifi} from "react-icons/fa";
import {IoIosWarning} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {ImCross} from "react-icons/im";

const Alert = ({children, type, yesRoute, noRoute, onHide}) => {
    const navigate = useNavigate();

    let iconSVG, buttons;
    switch (type) {
        case "trashBin":
            iconSVG = <FaTrash/>;
            buttons = <>
                    <Button onClick={() => navigate(yesRoute)}
                            colorType={2}>ÁNO</Button>
                    <Button onClick={() => navigate(noRoute)}
                            colorType={2}>NIE</Button>
                </>
            break;
        case "check":
            iconSVG = <FaCheck/>;
            buttons = <>
                    <Button onClick={() => navigate(yesRoute)}
                            colorType={2}>ÁNO</Button>
                    <Button onClick={() => navigate(noRoute)}
                            colorType={2}>NIE</Button>
                </>
            break;
        case "decline":
            iconSVG = <ImCross/>;
            buttons = <>
                    <Button onClick={() => navigate(yesRoute)}
                            colorType={2}>ÁNO</Button>
                    <Button onClick={() => navigate(noRoute)}
                            colorType={2}>NIE</Button>
                </>
            break;
        case "error":
            iconSVG = <FaExclamationCircle/>;
            buttons = <Button onClick={onHide}
                              colorType={2}>OK</Button>;
            break;
        case "connection-error":
            iconSVG = <FaWifi/>;
            buttons = <Button onClick={onHide}
                              colorType={2}>OK</Button>;
            break;
        default:
            iconSVG = <IoIosWarning/>;
            buttons = <>
                    <Button onClick={() => navigate(yesRoute)}
                            colorType={2}>ÁNO</Button>
                    <Button onClick={onHide}
                            colorType={2}>NASPÄŤ</Button>
                </>
    }

    return <>
        <div className={"Alert"}>
            <div className={"alert-box"}>
                <picture>{iconSVG}</picture>
                <p>{children}</p>
                <div>{buttons}</div>
            </div>
        </div>
    </>
};

export default Alert;
