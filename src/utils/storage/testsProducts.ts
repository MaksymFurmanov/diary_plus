import {Order, Product, ProductsTest} from "../../types";

export const getProductsTests = (): ProductsTest[] | null => {
    const productsTestsRaw = localStorage.getItem("productsTests");
    if(!productsTestsRaw) return null;
    return JSON.parse(productsTestsRaw) as ProductsTest[];
}

export const changeProductsTestResult = (
    testId: string,
    result: boolean
): void => {
    const productsTestsRaw = localStorage.getItem("productsTests");
    if (!productsTestsRaw) throw new Error("DashboardPage not found");

    let data: ProductsTest[] = JSON.parse(productsTestsRaw) as ProductsTest[];

    const oldProductsTest = data.find((test) => test.id === testId);
    if (!oldProductsTest) throw new Error("The product not found");

    data = data.map((test: ProductsTest) => {
        if (test.id === testId) {
            return {...test, accepted: result} as ProductsTest;
        }

        return test;
    });

    localStorage.setItem("productsTests", JSON.stringify(data));
}