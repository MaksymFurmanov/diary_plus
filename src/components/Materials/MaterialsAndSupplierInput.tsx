import SelectRawMaterials from "./SelectRawMaterials";
import SelectSupplier from "./SelectSupplier";
import {useSelector} from "react-redux";
import {selectMaterials} from "../../features/materialsSlice";

const MaterialsAndSupplierInput = () => {
    const materials = useSelector(selectMaterials);

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