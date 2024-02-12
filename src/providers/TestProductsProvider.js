import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const TestProductsContext = createContext(undefined);
const SetTestProductsContext = createContext(undefined);

const TestProductsProvider = ({children}) => {
    const [testProducts, setTestProducts, loading] = useReadData("tests-products");

    return <SetTestProductsContext.Provider value={setTestProducts}>
        <TestProductsContext.Provider value={testProducts}>
            {loading ? <p>Loading...</p>: children}
        </TestProductsContext.Provider>
    </SetTestProductsContext.Provider>
}

export const useTestProducts = () => useContext(TestProductsContext);
export const useSetTestProducts = () => useContext(SetTestProductsContext);

export default TestProductsProvider