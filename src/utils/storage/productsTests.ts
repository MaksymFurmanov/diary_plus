import {ProductsTest} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import products_tests from "../../initialData/testsProducts";

export const getProductsTests = (): ProductsTest[] => {
    const productsTestsRaw = localStorage.getItem("productsTests");
    return productsTestsRaw ? JSON.parse(productsTestsRaw) as ProductsTest[] : products_tests;
};

export const createProductsTest = (orderId: string): ProductsTest[] => {
    const productsTests = getProductsTests();

    const id = nanoid();
    const newTest: ProductsTest = {
        id,
        accepted: false,
        status: 0,
        document_url: undefined,
        order_id: orderId
    };

    const updatedTests = [...productsTests, newTest];

    localStorage.setItem("productsTests", JSON.stringify(updatedTests));
    return updatedTests;
};

export const changeProductsTestResult = (testId: string, result: boolean): ProductsTest[] => {
    const productsTests = getProductsTests();

    const oldTest = productsTests.find((test) => test.id === testId);
    if (!oldTest) throw new Error("The products test not found");

    const updatedTests = productsTests.map((test) =>
        test.id === testId ? {...test, accepted: result} : test
    );

    localStorage.setItem("productsTests", JSON.stringify(updatedTests));
    return updatedTests;
};

export const deleteProductsTest = (orderId: string): ProductsTest[] => {
    const productsTests = getProductsTests();

    const updatedTests = productsTests.filter((test) => test.order_id !== orderId);

    localStorage.setItem("productsTests", JSON.stringify(updatedTests));
    return updatedTests;
};