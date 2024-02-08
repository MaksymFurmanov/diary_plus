import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";

const withMessage = ({WrappedComponent, children, icon, link_1, link_2}) => {
    /*const navigate = useNavigate();*/

    let iconSVG;
    switch (icon){
        case "trashBin":
            break;
        case "warning":
            break;
        default:

    }

    return <>
        <WrappedComponent style={{zIndex: "-100"}}/>
        <div className={"Message"}>
            <div className={"message-box"}>
                <picture>
                    {iconSVG}
                </picture>
                <p>{children}</p>
                <div>
                    {link_2
                        ? <><Button>ÁNO</Button>
                            <Button>NIE</Button></>
                        : <Button>OK</Button>}
                </div>
            </div>
        </div>
    </>
}

export default withMessage