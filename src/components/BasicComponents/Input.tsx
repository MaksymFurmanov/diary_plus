import {EventHandler, FC, InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    setter: Function,
    state: object,
    size?: number,
    position?: string,
    options?: JSX.Element[] | JSX.Element
}

const Input: FC<InputProps> = ({
                                   children,
                                   setter,
                                   state,
                                   name,
                                   type = "text",
                                   size,
                                   position,
                                   options,
                                   ...rest
                               }) => {

    let inputHandler: EventHandler<any>;
    switch (type) {
        case "number":
            inputHandler = (e) => {
                const {name, value} = e.target;
                if (!isNaN(value)) {
                    setter({...state, [name]: parseInt(value), changed: true});
                }
            };
            break;
        case "checkbox":
            inputHandler = (e) => {
                const {name, checked} = e.target;
                setter({...state, [name]: checked, changed: true});
            }
            break;
        default:
            inputHandler = (e) => {
                const {name, value} = e.target;
                setter({...state, [name]: value, changed: true});
            };
    }

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

    return (
        <div className={"Input"}
             style={{justifyContent: positionType}}>
            {type !== "select"
                ? <>
                    <label htmlFor={name}>{children}</label>
                    <input type={type}
                           name={name}
                           id={name}
                           onChange={inputHandler}
                           style={{width: width}}
                           {...rest}/>
                </>
                : <>
                    <label htmlFor={name}>{children}</label>
                    <select id={name}
                            name={name}
                            onChange={inputHandler}
                            style={{width: width}}
                            {...rest}>
                        <option value={-1}></option>
                        {options && options}
                    </select>
                </>}
        </div>
    );
}

export default Input;