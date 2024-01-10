import React, {useState} from "react";
import {RxCross2} from "react-icons/rx";

const StockPlace = React.memo(({palletColor}) => {
    const [selected, setSelected] =
        useState(false);

    const selectHandler = () => {
        setSelected(!selected);
    };

    return <div className={"StockPlace"}
                style={{backgroundColor: palletColor}}
                onClick={selectHandler}>{selected && <RxCross2/>}</div>
})

export default StockPlace