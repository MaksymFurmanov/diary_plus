import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PageTitle from "../BasicComponents/PageTitle";
import Button from "../BasicComponents/Button.tsx";
import Input from "../BasicComponents/Input.tsx";
import {useMaterials} from "../../providers/MaterialsProvider";
import PalletColor from "../BasicComponents/PalletColor";
import {useServer} from "../../providers/ServerProvider";

const MaterialInfo = ({existing}) => {
    let {materialId} = useParams();
    materialId = parseInt(materialId);
    const materials = useMaterials();
    const api = useServer();

    const [material, setMaterial] = useState({
        name: "",
        supplier: "",
        volume: 0,
        per_pallet: 10,
        arriving_date: "",
        pallet_color: "",
        changed: false
    });

    const existingMaterial = materials.find((material) =>
        material.material_id === materialId
    );

    useEffect(() => {
        if (existing && existingMaterial) {
            setMaterial((prevState) => ({
                ...prevState,
                ...existingMaterial
            }));
        }
    }, [existing, existingMaterial]);

    const loadMaterial = async () => {
        console.log(material);
        try {
            const response = await fetch(`${api}/materials/new-material`,
                {
                    method: 'POST',
                    body: JSON.stringify(material)
                });

            console.log(response);
        } catch (e) {
            console.log(e.message);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        loadMaterial();
    }

    const materialList = materials.map((material, index) => (
        <option key={index} value={material.name}/>));

    const supplierList = materials.map((material, index) => (
        <option key={index} value={material.supplier}/>));

    return <>
        <PageTitle name={existing ? "Objednávka surovín" : "Nová objednávka surovín"}
                   prev={"/orders/raw_material"}/>
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
                               name={"volume"}
                               value={material.volume}
                               setter={setMaterial}
                               state={material}
                        >Počet na paletu:</Input>
                        <Input type={"number"}
                               size={0}
                               name={"per_pallet"}
                               value={material.per_pallet}
                               setter={setMaterial}
                               state={material}
                        >Počet paliet:</Input>
                    </div>
                    <Input
                        name={"arriving_date"}
                        value={material.arriving_date}
                        setter={setMaterial}
                        state={material}
                    >Prišlo:</Input>
                </div>
                <PalletColor/>
            </div>
            <div className={"bottom-buttons"}>
                {existing
                    ? <><Button>VYMAZAŤ</Button>
                        <Button>ÚPRAVIŤ</Button>
                    </>
                    : <Button>PRIDAŤ</Button>
                }
            </div>
        </form>
    </>
}

export default MaterialInfo