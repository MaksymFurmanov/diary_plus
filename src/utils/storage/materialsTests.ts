import { MaterialsTest } from "../../types";
import { nanoid } from "@reduxjs/toolkit";

export const getMaterialsTests = (): MaterialsTest[] => {
    const materialsTestsRaw = localStorage.getItem("materialsTests");
    return materialsTestsRaw ? JSON.parse(materialsTestsRaw) as MaterialsTest[] : [];
};

export const changeMaterialsTestResult = (testId: string, result: boolean): MaterialsTest[] => {
    const materialsTests = getMaterialsTests();

    const oldTest = materialsTests.find((test) => test.id === testId);
    if (!oldTest) throw new Error("The materials test not found");

    const updatedTests = materialsTests.map((test) =>
        test.id === testId ? { ...test, accepted: result } : test
    );

    localStorage.setItem("materialsTests", JSON.stringify(updatedTests));
    return updatedTests;
};

export const createMaterialsTest = (materialId: string): MaterialsTest[] => {
    const materialsTests = getMaterialsTests();

    const id = nanoid();
    const newTest: MaterialsTest = {
        id,
        accepted: false,
        status: 0,
        document_url: undefined,
        material_id: materialId
    };

    const updatedTests = [...materialsTests, newTest];

    localStorage.setItem("materialsTests", JSON.stringify(updatedTests));
    return updatedTests;
};

export const deleteMaterialsTest = (materialId: string): MaterialsTest[] => {
    const materialsTests = getMaterialsTests();

    const updatedTests = materialsTests.filter((test) => test.material_id !== materialId);

    localStorage.setItem("materialsTests", JSON.stringify(updatedTests));
    return updatedTests;
};
