import {FC, InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    size?: number,
    position?: string,
}

const Input: FC<InputProps> = ({
                                   children,
                                   size,
                                   position,
                                   type = "text",
                                   ...rest
                               }) => {
    let width;
    switch (size) {
        case 0:
            width = "2em";
            break;
        case 1:
            width = "3em";
            break;
        case 2:
            width = "10em";
            break;
        case 3:
            width = "13em";
            break;
        default:
            width = "18em";
    }

    let positionType;
    switch (position) {
        case "close":
            positionType = "none"
            break;
        default:
            positionType = "space-between"
    }

    return <div className={"Input"}
                style={{justifyContent: positionType}}>
        {type !== "select"
            ? <>
                <label>{children}</label>
                <input type={type}
                       style={{width: width}}
                       {...rest}/>
            </>
            : <select style={{width: width}} {...rest}>
                {children}
            </select>}
    </div>
}

export default Input;