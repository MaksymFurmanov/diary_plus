import {MaterialsTest} from "../../types";
import {nanoid} from "@reduxjs/toolkit";

export const getMaterialsTests = (): MaterialsTest[] | null => {
    const materialsTestsRaw = localStorage.getItem("materialsTests");
    if (!materialsTestsRaw) return null;
    return JSON.parse(materialsTestsRaw) as MaterialsTest[];
}

export const changeMaterialsTestResult = (
    testId: string,
    result: boolean
): void => {
    const materialsTestsRaw = localStorage.getItem("materialsTests");
    if (!materialsTestsRaw) throw new Error("DashboardPage not found");

    let data: MaterialsTest[] = JSON.parse(materialsTestsRaw) as MaterialsTest[];

    const oldMaterialsTest = data.find((test) => test.id === testId);
    if (!oldMaterialsTest) throw new Error("The material not found");

    data = data.map((test: MaterialsTest) => {
        if (test.id === testId) {
            return {...test, accepted: result} as MaterialsTest;
        }

        return test;
    });

    localStorage.setItem("materialsTests", JSON.stringify(data));
}

export const createMaterialsTest = (materialId: string) => {
    const materialsTests = getMaterialsTests() || [];

    const id = nanoid();
    const data = materialsTests.push({
        id,
        accepted: false,
        status: 0,
        document_url: undefined,
        material_id: materialId
    } as MaterialsTest);

    localStorage.setItem("materialsTests", JSON.stringify(data));
}

export const deleteMaterialsTest = (testId: string) => {
    const tests = getMaterialsTests();
    if(!tests) return null;

    const data = tests.filter((test) => test.id !== testId);
    localStorage.setItem("materialsTests", JSON.stringify(data));
}