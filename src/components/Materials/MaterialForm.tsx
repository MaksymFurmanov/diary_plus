import Input from "../BasicComponents/Input";
import PalletColor from "../BasicComponents/PalletColor";
import MutateButtons from "../BasicComponents/MutateButtons";
import {useMaterialInput} from "../../providers/MaterialInputProvider";
import {FormEvent} from "react";
import {createMaterial, deleteMaterial, updateMaterial} from "../../utils/storage/materials";
import MaterialsAndSupplierInput from "./MaterialsAndSupplierInput";
import {MaterialInput} from "../../types";

const MaterialForm = () => {
    const {material, setMaterial} = useMaterialInput();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (material.id) {
                updateMaterial(material);
            } else {
                createMaterial(material);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const PalletColorElement = PalletColor<MaterialInput>;

    return (
        <form className={"MaterialForm"}
              onSubmit={e => submitHandler(e)}
        >
            <div className={"h-stretch-center"}>
                <div className={"input-field"}>
                    <MaterialsAndSupplierInput/>

                    <div className={"h-center"} style={{justifyContent: "space-between"}}>
                        <Input type={"number"}
                               size={0}
                               min={1}
                               name={"volume"}
                               value={material.volume}
                               setter={setMaterial}
                               state={material}
                        >
                            Pallet volume:
                        </Input>

                        <Input type={"number"}
                               size={0}
                               min={1}
                               name={"per_pallet"}
                               value={material.per_pallet}
                               setter={setMaterial}
                               state={material}
                        >
                            Pallet count:
                        </Input>
                    </div>
                </div>

                <PalletColorElement state={material}
                                    setter={setMaterial}
                                    nameInput={"pallet_color"}
                />
            </div>

            <MutateButtons id={material.id}
                           deleteHandler={deleteMaterial}
            />
        </form>
    );
}


export default MaterialForm;
