import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {ChangeEvent, useState} from "react";

const PasswordInput = ({value, onChange}: {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);

    return (
        <div className={"password-input"}>
            <label>Heslo</label>
            <input type={passwordToggle ? "text" : "password"}
                   autoComplete="current-password"
                   value={value}
                   onChange={onChange}
            />
            <button onClick={() => setPasswordToggle(!passwordToggle)}>
                {passwordToggle
                    ? <IoMdEyeOff/>
                    : <IoMdEye/>
                }
            </button>
        </div>
    );
}

export default PasswordInput;