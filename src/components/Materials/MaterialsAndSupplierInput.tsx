import {getMaterials} from "../../utils/storage/materials";
import SelectRawMaterials from "./SelectRawMaterials";
import SelectSupplier from "./SelectSupplier";

const MaterialsAndSupplierInput = () => {
    const materials = getMaterials();

    let materialSet = new Set<string>(),
        supplierSet = new Set<string>();
    if (materials) {
        materials.forEach((material) => {
            materialSet.add(material.name);
            supplierSet.add(material.supplier);
        });
    }

    return (
        <>
            <SelectRawMaterials materialSet={materialSet}/>

            <SelectSupplier supplierSet={supplierSet}/>
        </>
    );
}

export default MaterialsAndSupplierInput;