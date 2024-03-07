import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PageTitle from "../BasicComponents/PageTitle";
import Button from "../BasicComponents/Button.tsx";
import Input from "../BasicComponents/Input.tsx";
import {useMaterials, useSetMaterials} from "../../providers/MaterialsProvider";
import PalletColor from "../BasicComponents/PalletColor";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import Alert from "../BasicComponents/Alert";

const MaterialInfo = ({existing}) => {
    const materials = useMaterials();
    const setMaterials = useSetMaterials();

    let {materialId} = useParams();
    materialId = parseInt(materialId);
    const navigate = useNavigate();

    const [loadDataItem, loading] = useLoadDataItem();

    const [material, setMaterial] = useState({
        material_id: null,
        name: "",
        supplier: "",
        volume: 10,
        per_pallet: 10,
        pallet_color: "",
        changed: false
    });
    const [exitAlert, setExitAlert] = useState(false);

    const existingMaterial = materials.find((material) =>
        material.material_id === materialId
    );
    useEffect(() => {
        if (existing && existingMaterial) {
            setMaterial(prevState => ({
                ...prevState,
                ...existingMaterial
            }));
        }
    }, [existing, existingMaterial]);

    let materialList, supplierList, materialSet = new Set(), supplierSet = new Set();
    materials.forEach((material) => {
        materialSet.add(material.name);
        supplierSet.add(material.supplier);
    });
    materialList = Array.from(materialSet).map((name, index) => (
        <option key={index} value={name} />
    ));
    supplierList = Array.from(supplierSet).map((supplier, index) => (
        <option key={index} value={supplier} />
    ));

    const submitHandler = (e) => {
        e.preventDefault();

        let updatedMaterial;
        if (material.material_id !== null) {
            updatedMaterial = {...material}
        } else {
            const currentDate = new Date();
            const date = currentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).split('/').join('.');
            updatedMaterial = {
                ...material,
                date_of_order: date
            }
        }

        loadDataItem('materials', updatedMaterial).then((newMaterial) => {
            const materialIndex = materials.findIndex((materialItem) =>
                materialItem.material_id === material.material_id);

            if (materialIndex !== -1) {
                const newMaterials = [...materials];
                newMaterials[materialIndex] =
                    {...materials[materialIndex], ...newMaterial};
                setMaterial(newMaterials);
            } else {
                setMaterials(prevState => [...prevState, newMaterial]);
            }
            navigate("/orders/raw_materials");
        });
    }

    const backHandler = () => {
        if(material.changed && existing) setExitAlert(true);
        else navigate("/orders/raw_materials");
    }

    return loading ? "Loading..." : <>
        <PageTitle name={existing ? "Objednávka surovín" : "Nová objednávka surovín"}
                   onBack={backHandler}/>
        <form className={"MaterialInfo"} onSubmit={e => submitHandler(e)}>
            <div className={"h-stretch-center"}>
                <div className={"input-field"}>
                    <Input
                        name={"name"}
                        value={material.name}
                        setter={setMaterial}
                        state={material}
                        list={"materialList"}
                    >Jednotka suroviny:</Input>
                    <datalist id="materialList">
                        {materialList}
                    </datalist>
                    <Input
                        name={"supplier"}
                        value={material.supplier}
                        setter={setMaterial}
                        state={material}
                        list={"supplierList"}
                    >Zdroj:</Input>
                    <datalist id="supplierList">
                        {supplierList}
                    </datalist>
                    <div className={"h-center"} style={{justifyContent: "space-between"}}>
                        <Input type={"number"}
                               size={0}
                               min={1}
                               name={"volume"}
                               value={material.volume}
                               setter={setMaterial}
                               state={material}
                        >Počet na paletu:</Input>
                        <Input type={"number"}
                               size={0}
                               min={1}
                               name={"per_pallet"}
                               value={material.per_pallet}
                               setter={setMaterial}
                               state={material}
                        >Počet paliet:</Input>
                    </div>
                </div>
                <PalletColor state={material}
                             setter={setMaterial}
                             nameInput={"pallet_color"}/>
            </div>
            <div className={"bottom-buttons"}>
                {existing
                    ? <><Button>VYMAZAŤ</Button>
                        <Button type={"submit"}>ÚPRAVIŤ</Button>
                    </>
                    : <Button>PRIDAŤ</Button>
                }
            </div>
        </form>
        {exitAlert && <Alert
            yesRoute={"/orders/raw_materials"}
            onHide={() => setExitAlert(false)}>
            Pokračovať bez úprav?</Alert>}
    </>
}

export default MaterialInfo