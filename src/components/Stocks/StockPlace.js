import React, {useState} from "react";
import {RxCross2} from "react-icons/rx";
import Tooltip from '@mui/material/Tooltip';

const StockPlace = React.memo(({palletColor, date}) => {
    const [selected, setSelected] =
        useState(false);

    const selectHandler = () => {
        setSelected(!selected);
    };

    return <Tooltip disableFocusListener disableTouchListener title={date}>
        <div className={"StockPlace"}
             style={{backgroundColor: palletColor}}
             onClick={selectHandler}>
            {selected && <RxCross2/>}
        </div>
    </Tooltip>
})

export default StockPlace