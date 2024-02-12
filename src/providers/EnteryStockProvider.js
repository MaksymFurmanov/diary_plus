import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const EnteryStockContext = createContext(undefined);
const SetEnteryStockContext = createContext(undefined);

const EnteryStockProvider = ({children}) => {
    const [enteryStock, setEnteryStock, loading] =
        useReadData("entery-stock-places");

    return <SetEnteryStockContext.Provider value={setEnteryStock}>
        <EnteryStockContext.Provider value={enteryStock}>
            {loading ? <p>Loading...</p>: children}
        </EnteryStockContext.Provider>
    </SetEnteryStockContext.Provider>
}

export const useEnteryStock = () => useContext(EnteryStockContext);
export const useSetEnteryStock = () => useContext(SetEnteryStockContext);

export default EnteryStockProvider;