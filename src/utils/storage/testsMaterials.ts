import {MaterialsTest} from "../../types";

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

export const deleteTest = () => {
  
}