import Input from "../BasicComponents/Input";
import PalletColor from "../BasicComponents/PalletColor";
import MutateButtons from "../BasicComponents/MutateButtons";
import {useMaterialInput} from "../../providers/MaterialInputProvider";
import {FormEvent} from "react";
import MaterialsAndSupplierInput from "./MaterialsAndSupplierInput";
import {MaterialInput} from "../../types";
import {useDispatch} from "react-redux";
import {addMaterial, editMaterial, removeMaterial} from "../../features/materialsSlice";
import {useNavigate} from "react-router-dom";

const MaterialForm = () => {
    const {material, setMaterial} = useMaterialInput();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (material.id) {
                dispatch(editMaterial(material));
            } else {
                dispatch(addMaterial(material));
            }
        } catch (error) {
            console.error(error);
        }
        navigate("/dashboard/materials")
    }

    const deleteHandler = () => {
        if(!material.id) return;
        dispatch(removeMaterial(material.id));
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
                           deleteHandler={deleteHandler}
            />
        </form>
    );
}


export default MaterialForm;
