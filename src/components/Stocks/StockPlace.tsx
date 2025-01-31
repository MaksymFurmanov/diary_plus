import React, {CSSProperties} from "react";
import {RxCross2} from "react-icons/rx";
import Tooltip from '@mui/material/Tooltip';

const StockPlace = React.memo(({palletColor, style, date, selected, onClick}: {
    palletColor: string,
    style: CSSProperties,
    date: Date | null,
    selected: boolean,
    onClick: () => void
}) => {
    return (
        <Tooltip disableFocusListener
                 disableTouchListener
                 title={date && (<p>{date.toISOString()}</p>)}
        >
            <div className={"StockPlace"}
                 style={{...style, backgroundColor: palletColor}}
                 onClick={onClick}>
                {selected && <RxCross2/>}
            </div>
        </Tooltip>
    );
})

export default StockPlace