import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const TestsMaterialsContext = createContext(undefined);
const SetTestsMaterialsContext = createContext(undefined);

const TestsMaterialsProvider = ({children}) => {
    const [testsMaterials, setTestsMaterials, loading] = useReadData("tests-materials");

    return <SetTestsMaterialsContext.Provider value={setTestsMaterials}>
        <TestsMaterialsContext.Provider value={testsMaterials}>
            {loading ? <p>Loading...</p>: children}
        </TestsMaterialsContext.Provider>
    </SetTestsMaterialsContext.Provider>
}

export const useTestsMaterials = () => useContext(TestsMaterialsContext);
export const useSetTestsMaterials = () => useContext(SetTestsMaterialsContext);

export default TestsMaterialsProvider