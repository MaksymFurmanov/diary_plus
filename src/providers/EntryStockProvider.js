import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const EntryStockContext = createContext(undefined);
const SetEntryStockContext = createContext(undefined);

const EntryStockProvider = ({children}) => {
    const [entryStock, setEntryStock, loading] =
        useReadData("entry-stock-places");

    return <SetEntryStockContext.Provider value={setEntryStock}>
        <EntryStockContext.Provider value={entryStock}>
            {loading ? <p>Loading...</p>: children}
        </EntryStockContext.Provider>
    </SetEntryStockContext.Provider>
}

export const useEntryStock = () => useContext(EntryStockContext);
export const useSetEntryStock = () => useContext(SetEntryStockContext);

export default EntryStockProvider;