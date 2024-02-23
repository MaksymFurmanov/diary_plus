import {MdInvertColors} from "react-icons/md";
import {useEffect, useRef, useState} from "react";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const PalletColor = ({state, setter, nameInput}) => {
    const [prevColor, setPrevColor] = useState(state[nameInput]);
    const textRef = useRef(null);

    useEffect(() => {
        if (state[nameInput] === "") {
            const color = getRandomColor();
            setter(prevState =>
                ({...prevState, [nameInput]: color}));
            setPrevColor(color);
        }
    }, [nameInput, setter, state]);
    const inputHandler = (e) => {
        setter(prevState =>
            ({...prevState, [nameInput]: e.target.value}));
    };
    const textOnFocusHandler = () => {
        setPrevColor(state[nameInput]);
    };

    const textOnBlurHandler = () => {
        const hexColor = /^#([0-9A-F]{3}){1,2}$/i;
        if (!hexColor.test(state[nameInput])) {
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
                value={state[nameInput]}
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
                    value={state[nameInput]}
                />
            </div>
        </div>
    );
};

export default PalletColor;
