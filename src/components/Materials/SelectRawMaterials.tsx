import Input from "../BasicComponents/Input";
import {useMaterialInput} from "../../providers/MaterialInputProvider";

const SelectRawMaterials = ({materialSet}: { materialSet: Set<string> }) => {
    const {material, setMaterial} = useMaterialInput();

    return (
        <>
            <Input name={"name"}
                   value={material.name}
                   setter={setMaterial}
                   state={material}
                   list={"materialList"}
            >
                Raw material unit:
            </Input>
            <datalist id="materialList">
                {Array.from(materialSet).map((name, index) => (
                    <option key={index} value={name}/>
                ))}
            </datalist>
        </>
    );
}

export default SelectRawMaterials;