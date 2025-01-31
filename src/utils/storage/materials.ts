import {Material, MaterialInput} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import {createMaterialsTest} from "./testsMaterials";

export const getMaterials = (): Material[] | null => {
    const materialsRaw = localStorage.getItem("materials");
    if (!materialsRaw) return null;
    return JSON.parse(materialsRaw) as Material[];
}

export const getMaterialById = (materialId?: string): Material | null => {
    if(!materialId) return null;
    const materialRaw = localStorage.getItem("material");
    if (!materialRaw) throw new Error("DashboardPage not found");

    const data: Material[] = JSON.parse(materialRaw) as Material[];
    return data.find((material) => material.id === materialId) || null;
}

export const createMaterial = (materialInput: MaterialInput): void => {
    const materialsRaw = localStorage.getItem("materials");

    let data: Material[] = materialsRaw
        ? JSON.parse(materialsRaw) as Material[]
        : [];

    const id = nanoid();
    const date_of_order = new Date();

    data.push({
        id: id,
        name: materialInput.name,
        supplier: materialInput.supplier,
        date_of_order: date_of_order,
        arriving_date: null,
        per_pallet: materialInput.per_pallet,
        volume: materialInput.volume,
        pallet_color: materialInput.pallet_color
    } as Material);

    localStorage.setItem("materials", JSON.stringify(data));
}

export const updateMaterial = (materialInput: MaterialInput): void => {
    let data = getMaterials();
    if (!data) throw new Error("Materials not found");

    const oldMaterial = data.find((material) => material.id === materialInput.id);
    if (!oldMaterial) throw new Error("The material not found");

    data = data.map((material: Material) => {
        if (material.id === materialInput.id) {
            return {
                id: oldMaterial.id,
                name: materialInput.name,
                supplier: materialInput.supplier,
                date_of_order: oldMaterial.date_of_order,
                arriving_date: oldMaterial.arriving_date,
                per_pallet: materialInput.per_pallet,
                volume: materialInput.volume,
                pallet_color: materialInput.pallet_color
            } as Material;
        }

        return material;
    });

    localStorage.setItem("materials", JSON.stringify(data));
}

export const markMaterialsArrived = (materialId: string) => {
    let data = getMaterials();
    if (!data) throw new Error("Materials not found");

    data = data.map((material) => {
        if(material.id === materialId) {
            createMaterialsTest(materialId);

            return {
                ...material,
                arriving_date: new Date()
            }
        }

        return material;
    });

    localStorage.setItem("materials", JSON.stringify(data));
}

export const deleteMaterial = (materialId: string): void => {
    const materialsRaw = localStorage.getItem("materials");
    if (!materialsRaw) throw new Error("Materials not found");

    let data: Material[] = JSON.parse(materialsRaw) as Material[];

    const materialExists = data.some((material) => material.id === materialId);
    if (!materialExists) throw new Error("The material not found");

    data = data.filter((material: Material) =>
        material.id !== materialId);
    localStorage.setItem("materials", JSON.stringify(data));
}

export const materialArrived = (materialId: string): void => {
    const materialsRaw = localStorage.getItem("materials");
    if (!materialsRaw) throw new Error("Materials not found");

    let data: Material[] = JSON.parse(materialsRaw) as Material[];

    const materialExists = data.some((material) => material.id === materialId);
    if (!materialExists) throw new Error("The material not found");

    data = data.map((material: Material) => {
        if (material.id === materialId) {
            return {
                ...material,
                arriving_date: new Date()
            }
        }

        return material;
    });

    localStorage.setItem("materials", JSON.stringify(data));
}