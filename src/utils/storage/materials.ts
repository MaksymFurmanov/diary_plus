import { Material, MaterialInput } from "../../types";
import { nanoid } from "@reduxjs/toolkit";
import { createMaterialsTest } from "./testsMaterials";

export const getMaterials = (materialsRaw: string | null): Material[] => {
  return materialsRaw ? JSON.parse(materialsRaw) as Material[] : [];
};

export const getMaterialById = (materials: Material[], materialId ? : string): Material | null => {
  if (!materialId) return null;
  return materials.find((material) => material.id === materialId) || null;
};

export const createMaterial = (materials: Material[], materialInput: MaterialInput): Material[] => {
  const id = nanoid();
  const date_of_order = new Date();

  const newMaterial: Material = {
    id,
    name: materialInput.name,
    supplier: materialInput.supplier,
    date_of_order,
    arriving_date: null,
    per_pallet: materialInput.per_pallet,
    volume: materialInput.volume,
    pallet_color: materialInput.pallet_color
  };

  return [...materials, newMaterial];
};

export const updateMaterial = (materials: Material[], materialInput: MaterialInput): Material[] => {
  return materials.map((material) =>
    material.id === materialInput.id ?
    { ...material, ...materialInput, date_of_order: material.date_of_order, arriving_date: material.arriving_date } :
    material
  );
};

export const deleteMaterial = (materials: Material[], materialId: string): Material[] => {
  return materials.filter((material) => material.id !== materialId);
};

export const materialArrived = (materials: Material[], materialId: string): Material[] => {
  return materials.map((material) =>
    material.id === materialId ? { ...material, arriving_date: new Date() } : material
  );
};