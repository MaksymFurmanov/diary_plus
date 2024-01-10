import {createContext, useContext, useState} from "react";
import output_stock_pallets from "../data/output_stock_place";

const OutputStockContext = createContext(undefined);
const SetOutputStockContext = createContext(undefined);

const OutputStockProvider = ({children}) => {
    const [outputStock, setOutputStock] = useState(output_stock_pallets);

    return <SetOutputStockContext.Provider value={setOutputStock}>
        <OutputStockContext.Provider value={outputStock}>
            {children}
        </OutputStockContext.Provider>
    </SetOutputStockContext.Provider>
}

export const useOutputStock = () => useContext(OutputStockContext);
export const useSetOutputStock = () => useContext(SetOutputStockContext);

export default OutputStockProvider;