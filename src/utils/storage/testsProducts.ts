import { ProductsTest } from "../../types";

export const getProductsTests = (productsTestsRaw: string | null): ProductsTest[] => {
    return productsTestsRaw ? JSON.parse(productsTestsRaw) as ProductsTest[] : [];
};

export const changeProductsTestResult = (productsTests: ProductsTest[], testId: string, result: boolean): ProductsTest[] => {
    return productsTests.map((test) => 
        test.id === testId ? { ...test, accepted: result } as ProductsTest : test
    );
};

export const createProductsTest = (productsTests: ProductsTest[], orderId: string, id: string): ProductsTest[] => {
    return [
        ...productsTests,
        {
            id,
            accepted: false,
            status: 0,
            document_url: undefined,
            order_id: orderId
        } as ProductsTest
    ];
};

export const deleteProductsTest = (productsTests: ProductsTest[], testId: string): ProductsTest[] => {
    return productsTests.filter((test) => test.id !== testId);
};