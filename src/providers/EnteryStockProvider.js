import {createContext, useContext, useState} from "react";
import entery_stock_pallets from "../data/entery_stock_place";

const EnteryStockContext = createContext(undefined);
const SetEnteryStockContext = createContext(undefined);

const EnteryStockProvider = ({children}) => {
    const [enteryStock, setEnteryStock] = useState(entery_stock_pallets);

    return <SetEnteryStockContext.Provider value={setEnteryStock}>
        <EnteryStockContext.Provider value={enteryStock}>
            {children}
        </EnteryStockContext.Provider>
    </SetEnteryStockContext.Provider>
}

export const useEnteryStock = () => useContext(EnteryStockContext);
export const useSetEnteryStock = () => useContext(SetEnteryStockContext);

export default EnteryStockProvider;