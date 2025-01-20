import {Product, ProductInput} from "../../types";
import {nanoid} from "@reduxjs/toolkit";

export const getProducts = (): Product[] | null => {
    const productsRaw = localStorage.getItem("products");
    if(!productsRaw) return null;

    return JSON.parse(productsRaw) as Product[];
}

export const getProductById = (productId?: string): Product | null => {
    if(!productId) return null;
    const productRaw = localStorage.getItem("products");
    if(!productRaw) return null;

    const data = JSON.parse(productRaw) as Product[];
    return data.find((product) => product.id === productId) || null;
}

export const createProduct = (productInput: ProductInput): void => {
    const productsRaw = localStorage.getItem("products");

    let data: Product[] = productsRaw
        ? JSON.parse(productsRaw) as Product[]
        : [];

    const id = nanoid();

    data.push({
        id,
        name: productInput.name,
        type: productInput.type,
        per_pallet: productInput.per_pallet,
        img_url: productInput.img_url,
        quality_standards_url: productInput.quality_standards_url
    } as Product);

    localStorage.setItem("products", JSON.stringify(data));
}

export const updateProduct = (productInput: ProductInput): void => {
    const productsRaw = localStorage.getItem("products");
    if (!productsRaw) throw new Error("DashboardPage not found");

    let data: Product[] = JSON.parse(productsRaw) as Product[];

    const oldProduct = data.find((product) => product.id === productInput.id);
    if (!oldProduct) throw new Error("The product not found");

    data = data.map((product: Product) => {
        if (product.id === productInput.id) {
            return {
                id: oldProduct.id,
                name: productInput.name,
                type: productInput.type,
                per_pallet: productInput.per_pallet,
                img_url: productInput.img_url,
                quality_standards_url: productInput.quality_standards_url
            } as Product;
        }

        return product;
    });

    localStorage.setItem("products", JSON.stringify(data));
}

export const deleteProduct = (productId: string): void => {
    const productsRaw = localStorage.getItem("products");
    if (!productsRaw) throw new Error("DashboardPage not found");

    let data: Product[] = JSON.parse(productsRaw) as Product[];

    const productExists = data.some((product) => product.id === productId);
    if (!productExists) throw new Error("The product not found");

    data = data.filter((product: Product) =>
        product.id !== productId);
    localStorage.setItem("products", JSON.stringify(data));
}