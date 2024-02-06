import {createContext, useContext, useState} from "react";
import testMaterialsData from "../data/test_materials";

const TestMaterialsContext = createContext(undefined);
const SetTestMaterialsContext = createContext(undefined);

const TestMaterialsProvider = ({children}) => {
    const [testMaterials, setTestMaterials] = useState(testMaterialsData);

    return <SetTestMaterialsContext.Provider value={setTestMaterials}>
        <TestMaterialsContext.Provider value={testMaterials}>
            {children}
        </TestMaterialsContext.Provider>
    </SetTestMaterialsContext.Provider>
}

export const useTestMaterials = () => useContext(TestMaterialsContext);
export const useSetTestMaterials = () => useContext(SetTestMaterialsContext);

export default TestMaterialsProvider