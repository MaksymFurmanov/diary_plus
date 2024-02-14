import { MdInvertColors } from "react-icons/md";
import { useRef, useState } from "react";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const PalletColor = () => {
    const [color, setColor] = useState(getRandomColor());
    const [prevColor, setPrevColor] = useState(color);
    const textRef = useRef(null);
    const colorInputHandler = (e) => {
        setColor(e.target.value);
    };

    const textOnFocusHandler = () => {
        setPrevColor(color);
    };

    const textInputHandler = (e) => {
        setColor(e.target.value);
    };

    const textOnBlurHandler = () => {
        const hexColor = /^#([0-9A-F]{3}){1,2}$/i;
        if (!hexColor.test(color)) {
            setColor(prevColor);
        }
    };

    return (
        <div className="PalletColor v-center">
            <h3>Farba palety:</h3>
            <input
                type="color"
                value={color}
                onChange={(e) => colorInputHandler(e)}
            />
            <div className={"evenly"}>
                <MdInvertColors />
                <input
                    type="text"
                    name={"pallet_color"}
                    id={"pallet_color"}
                    maxLength={7}
                    onFocus={textOnFocusHandler}
                    onChange={(e) => textInputHandler(e)}
                    onBlur={textOnBlurHandler}
                    ref={textRef}
                    value={color}
                />
            </div>
        </div>
    );
};

export default PalletColor;
