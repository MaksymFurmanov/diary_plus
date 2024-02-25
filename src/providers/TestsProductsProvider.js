import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const TestsProductsContext = createContext(undefined);
const SetTestsProductsContext = createContext(undefined);

const TestsProductsProvider = ({children}) => {
    const [testsProducts, setTestsProducts, loading] = useReadData("tests-products");

    return <SetTestsProductsContext.Provider value={setTestsProducts}>
        <TestsProductsContext.Provider value={testsProducts}>
            {loading ? <p>Loading...</p>: children}
        </TestsProductsContext.Provider>
    </SetTestsProductsContext.Provider>
}

export const useTestsProducts = () => useContext(TestsProductsContext);
export const useSetTestsProducts = () => useContext(SetTestsProductsContext);

export default TestsProductsProvider