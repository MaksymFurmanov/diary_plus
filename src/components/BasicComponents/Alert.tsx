import React, {FC, ReactNode} from "react";
import Button from "./Button";
import {FaCheck, FaExclamationCircle, FaTrash, FaWifi} from "react-icons/fa";
import {IoIosWarning} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {ImCross} from "react-icons/im";
import {CircularProgress} from "@mui/material";

type AlertTypes = "loading"
    | "trashBin"
    | "check"
    | "decline"
    | "error"
    | "connection-error";

interface AlertProps {
    children: string;
    type?: AlertTypes;
    yesRoute?: string;
    noRoute?: string;
    onHide?: () => void;
}

const Alert: FC<AlertProps> = ({children, type, yesRoute, noRoute, onHide}) => {
    const navigate = useNavigate();

    let iconSVG: JSX.Element | null;
    let buttons: JSX.Element | null = null;

    switch (type) {
        case "loading":
            iconSVG = <CircularProgress/>;
            break;
        case "trashBin":
            iconSVG = <FaTrash/>;
            buttons = <>
                {yesRoute && <Button onClick={() => navigate(yesRoute)} colorType={2}>ÁNO</Button>}
                {noRoute && <Button onClick={() => navigate(noRoute)} colorType={2}>NIE</Button>}
            </>
            break;
        case "check":
            iconSVG = <FaCheck/>;
            buttons = <>
                {yesRoute && <Button onClick={() => navigate(yesRoute)} colorType={2}>ÁNO</Button>}
                {noRoute && <Button onClick={() => navigate(noRoute)} colorType={2}>NIE</Button>}
            </>
            break;
        case "decline":
            iconSVG = <ImCross/>;
            buttons = <>
                {yesRoute && <Button onClick={() => navigate(yesRoute)}
                                     colorType={2}>ÁNO</Button>}
                {noRoute && <Button onClick={() => navigate(noRoute)}
                                    colorType={2}>NIE</Button>}
            </>
            break;
        case "error":
            iconSVG = <FaExclamationCircle/>;
            buttons = onHide ? <Button onClick={onHide}
                                       colorType={2}>OK</Button> : null;
            break;
        case "connection-error":
            iconSVG = <FaWifi/>;
            buttons = onHide ? <Button onClick={onHide}
                                       colorType={2}>OK</Button> : null;
            break;
        default:
            iconSVG = <IoIosWarning/>;
            buttons = <>
                {yesRoute && <Button onClick={() => navigate(yesRoute)}
                                     colorType={2}>ÁNO</Button>}
                {onHide && <Button onClick={onHide}
                                   colorType={2}>NASPÄŤ</Button>}
            </>
    }

    return (
        <div className="Alert">
            <div className="alert-box">
                <picture>{iconSVG}</picture>
                <p>{children}</p>
                <div>{buttons}</div>
            </div>
        </div>
    );
};

export default Alert;
