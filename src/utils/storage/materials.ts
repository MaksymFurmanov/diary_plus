import {Material, MaterialInput} from "../../types";
import {nanoid} from "@reduxjs/toolkit";

export const getMaterials = (): Material[] => {
    const materialsRaw = localStorage.getItem("materials");
    return materialsRaw ? JSON.parse(materialsRaw) as Material[] : [];
};

export const getMaterialById = (materialId?: string): Material | null => {
    if (!materialId) return null;
    const materials = getMaterials();
    return materials.find(material => material.id === materialId) || null;
};

export const createMaterial = (materialInput: MaterialInput): Material[] => {
    const materials = getMaterials();
    const id = nanoid();
    const date_of_order = new Date();

    const updatedMaterials = [
        ...materials,
        {
            id,
            name: materialInput.name,
            supplier: materialInput.supplier,
            date_of_order,
            arriving_date: null,
            per_pallet: materialInput.per_pallet,
            volume: materialInput.volume,
            pallet_color: materialInput.pallet_color
        } as Material
    ];

    localStorage.setItem("materials", JSON.stringify(updatedMaterials));
    return updatedMaterials;
};

export const updateMaterial = (materialInput: MaterialInput): Material[] => {
    const materials = getMaterials();
    const updatedMaterials = materials.map(material =>
        material.id === materialInput.id
            ? {
                ...material,
                name: materialInput.name,
                supplier: materialInput.supplier,
                per_pallet: materialInput.per_pallet,
                volume: materialInput.volume,
                pallet_color: materialInput.pallet_color
            }
            : material
    );

    localStorage.setItem("materials", JSON.stringify(updatedMaterials));
    return updatedMaterials;
};

export const markArrived = (materialId: string): Material[] => {
    const materials = getMaterials();
    const updatedMaterials = materials.map(material =>
        material.id === materialId
            ? {...material, arriving_date: new Date()}
            : material
    );

    localStorage.setItem("materials", JSON.stringify(updatedMaterials));
    return updatedMaterials;
};

export const deleteMaterial = (materialId: string): Material[] => {
    const materials = getMaterials();
    const updatedMaterials = materials.filter(material => material.id !== materialId);

    localStorage.setItem("materials", JSON.stringify(updatedMaterials));
    return updatedMaterials;
};
