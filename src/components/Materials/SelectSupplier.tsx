import Input from "../BasicComponents/Input";
import {useMaterialInput} from "../../providers/MaterialInputProvider";

const SelectSupplier = ({supplierSet}: {supplierSet: Set<string>}) => {
    const {material, setMaterial} = useMaterialInput();

    return (
        <>
            <Input name={"supplier"}
                   value={material.supplier}
                   setter={setMaterial}
                   state={material}
                   list={"supplierList"}
            >
                Supplier:
            </Input>
            <datalist id="supplierList">
                {Array.from(supplierSet).map((supplier, index) => (
                    <option key={index} value={supplier}/>
                ))}
            </datalist>
        </>
    );
}

export default SelectSupplier;