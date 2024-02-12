import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const TestMaterialsContext = createContext(undefined);
const SetTestMaterialsContext = createContext(undefined);

const TestMaterialsProvider = ({children}) => {
    const [testMaterials, setTestMaterials, loading] = useReadData("tests-materials");

    return <SetTestMaterialsContext.Provider value={setTestMaterials}>
        <TestMaterialsContext.Provider value={testMaterials}>
            {loading ? <p>Loading...</p>: children}
        </TestMaterialsContext.Provider>
    </SetTestMaterialsContext.Provider>
}

export const useTestMaterials = () => useContext(TestMaterialsContext);
export const useSetTestMaterials = () => useContext(SetTestMaterialsContext);

export default TestMaterialsProvider