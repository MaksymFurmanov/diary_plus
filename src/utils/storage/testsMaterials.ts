import { MaterialsTest } from "../../types";

export const getMaterialsTests = (materialsTestsRaw: string | null): MaterialsTest[] => {
    return materialsTestsRaw ? JSON.parse(materialsTestsRaw) as MaterialsTest[] : [];
};

export const changeMaterialsTestResult = (materialsTests: MaterialsTest[], testId: string, result: boolean): MaterialsTest[] => {
    return materialsTests.map((test) => 
        test.id === testId ? { ...test, accepted: result } as MaterialsTest : test
    );
};

export const createMaterialsTest = (materialsTests: MaterialsTest[], materialId: string, id: string): MaterialsTest[] => {
    return [
        ...materialsTests,
        {
            id,
            accepted: false,
            status: 0,
            document_url: undefined,
            material_id: materialId
        } as MaterialsTest
    ];
};

export const deleteMaterialsTest = (materialsTests: MaterialsTest[], testId: string): MaterialsTest[] => {
    return materialsTests.filter((test) => test.id !== testId);
};