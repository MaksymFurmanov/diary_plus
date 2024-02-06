import {ButtonHTMLAttributes, FC} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    colorType?: number
}

const Button: FC<ButtonProps> = ({
                                     children,
                                     colorType,
                                     ...rest}) => {
    const colorStyles = colorType === 2
        ? {backgroundColor: 'white', color: 'black'}
        : {backgroundColor: 'black', color: 'white'}

    return <button className={"Button"}
                   style={colorStyles}
                   {...rest}>
        {children}
    </button>
}

export default Button