import {ProductsTest} from "../../types";
import {nanoid} from "@reduxjs/toolkit";

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

export const createProductsTest = (orderId: string) => {
    const productsTests = getProductsTests() || [];

    const id = nanoid();
    const data = productsTests.push({
        id,
        accepted: false,
        status: 0,
        document_url: undefined,
        order_id: orderId
    } as ProductsTest);

    localStorage.setItem("productsTests", JSON.stringify(data));
}

export const deleteProductsTest = (testId: string) => {
    const tests = getProductsTests();
    if(!tests) return null;

    const data = tests.filter((test) => test.id !== testId);
    localStorage.setItem("productsTests", JSON.stringify(data));
}