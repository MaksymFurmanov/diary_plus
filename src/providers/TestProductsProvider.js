import {createContext, useContext, useState} from "react";
import testProductsData from "../data/test_products";

const TestProductsContext = createContext(undefined);
const SetTestProductsContext = createContext(undefined);

const TestProductsProvider = ({children}) => {
    const [testProducts, setTestProducts] = useState(testProductsData);

    return <SetTestProductsContext.Provider value={setTestProducts}>
        <TestProductsContext.Provider value={testProducts}>
            {children}
        </TestProductsContext.Provider>
    </SetTestProductsContext.Provider>
}

export const useTestProducts = () => useContext(TestProductsContext);
export const useSetTestProducts = () => useContext(SetTestProductsContext);

export default TestProductsProvider