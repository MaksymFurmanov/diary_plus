import {FC, InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    size?: number,
    position?: string,
}

const Input: FC<InputProps> = ({
                                   children,
                                   name,
                                   type = "text",
                                   size,
                                   position,
                                   ...rest
                               }) => {
    let width;
    switch (size) {
        case 0:
            width = "3em";
            break;
        case 1:
            width = "3em";
            break;
        case 2:
            width = "10em";
            break;
        case 3:
            width = "20em";
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
                <label htmlFor={name}>{children}</label>
                <input type={type}
                       name={name}
                       id={name}
                       style={{width: width}}
                       {...rest}/>
            </>
            : <select style={{width: width}} {...rest}>
                {children}
            </select>}
    </div>
}

export default Input;