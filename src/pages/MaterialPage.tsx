import {useParams} from "react-router-dom";
import {useEffect} from "react";
import PageTitle from "../components/BasicComponents/PageTitle";
import MaterialForm from "../components/Materials/MaterialForm";
import {useMaterialInput} from "../providers/MaterialInputProvider";
import useExitAlert from "../hooks/useExitAlert";
import {useSelector} from "react-redux";
import {selectMaterialById} from "../features/materialsSlice";
import {RootState} from "../state";

const MaterialPage = ({existing}: {
    existing: boolean
}) => {
    const {materialId} = useParams();
    const existingMaterial = useSelector((state: RootState) => selectMaterialById(state, materialId));

    const {material, setMaterial} = useMaterialInput();

    const {ExitAlert, exitFunction} = useExitAlert(material.changed && existing, "dashboard/materials");
    
    useEffect(() => {
        if (!existing) return;

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