import {useParams} from "react-router-dom";
import {useEffect} from "react";
import PageTitle from "../components/BasicComponents/PageTitle";
import MaterialForm from "../components/Materials/MaterialForm";
import {useMaterialInput} from "../providers/MaterialInputProvider";
import useExitAlert from "../hooks/useExitAlert";
import {getMaterialById} from "../utils/storage/materials";

const MaterialPage = ({existing}: {
    existing: boolean
}) => {
    const {materialId} = useParams();

    const {material, setMaterial} = useMaterialInput();

    const {ExitAlert, exitFunction} = useExitAlert(material.changed && existing, "dashboard/materials");
    
    useEffect(() => {
        if (!existing) return;

        const existingMaterial = getMaterialById(materialId);
        if(!existingMaterial)throw new Error("Material not found");
        
        setMaterial(prevState => ({
            ...prevState,
            ...existingMaterial
        }));

    }, [existing, materialId, setMaterial]);


    return (
        <>
            <PageTitle name={existing ? "Objednávka surovín" : "Nová objednávka surovín"}
                       onBack={exitFunction}/>
            <MaterialForm/>

            {ExitAlert}
        </>
    );
}

export default MaterialPage