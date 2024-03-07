import React from "react";
import {RxCross2} from "react-icons/rx";
import Tooltip from '@mui/material/Tooltip';

const StockPlace = React.memo(({palletColor, style, date, selected, onClick}) => {
    return <Tooltip disableFocusListener disableTouchListener title={date}>
        <div className={"StockPlace"}
             style={{...style, backgroundColor: palletColor}}
             onClick={onClick}>
            {selected !== undefined && <RxCross2/>}
        </div>
    </Tooltip>
})

export default StockPlace