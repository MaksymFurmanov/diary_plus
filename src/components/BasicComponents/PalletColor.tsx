import {MdInvertColors} from "react-icons/md";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import getRandomColor from "../../utils/getRandomColor";

interface PalletColorProps<T> {
    state: T;
    setter: Dispatch<SetStateAction<T>>;
    nameInput: string & keyof T;
}

function PalletColor<T>({state, setter, nameInput}: PalletColorProps<T>) {
    const initialValue = state[nameInput] as string;
    const [prevColor, setPrevColor] = useState<string>(initialValue);
    const textRef = useRef(null);

    useEffect(() => {
        if (state[nameInput] === "") {
            const color = getRandomColor();
            setter(prevState =>
                ({...prevState, [nameInput]: color}));
            setPrevColor(color);
        }
    }, [nameInput, setter, state]);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setter(prevState =>
            ({...prevState, [nameInput]: e.target.value}));
    };

    const textOnFocusHandler = () => {
        setPrevColor(state[nameInput] as string);
    };

    const textOnBlurHandler = () => {
        const hexColor = /^#([0-9A-F]{3}){1,2}$/i;
        if (!hexColor.test(state[nameInput] as string)) {
            setter(prevState => ({...prevState, [nameInput]: prevColor}));
        }
    };

    return (
        <div className="PalletColor v-center">
            <h3>Farba palety:</h3>
            <input
                type="color"
                name={nameInput}
                id={nameInput}
                value={state[nameInput] as string}
                onChange={e => inputHandler(e)}
            />
            <div className={"evenly"}>
                <MdInvertColors/>
                <input
                    type="text"
                    maxLength={7}
                    onFocus={textOnFocusHandler}
                    onChange={e => inputHandler(e)}
                    onBlur={textOnBlurHandler}
                    ref={textRef}
                    value={state[nameInput] as string}
                />
            </div>
        </div>
    );
}

export default PalletColor;
