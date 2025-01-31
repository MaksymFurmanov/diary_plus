import Button from "../BasicComponents/Button";
import {FaPen} from "react-icons/fa";
import {BiSolidTrashAlt} from "react-icons/bi";
import {Material} from "../../types";
import {useUser} from "../../providers/UserProvider";
import {deleteMaterial, getMaterials, materialArrived} from "../../utils/storage/materials";
import {useNavigate} from "react-router-dom";
import {isManager} from "../../utils/storage/departments";

const MaterialRows = () => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["0"]);

    const navigate = useNavigate();

    const materials = getMaterials();

    return (
        <>
            {materials && materials.map((material: Material, index) => {
                return (
                    <tr key={index}>
                        <td>{material.name}</td>
                        <td>{material.supplier}</td>
                        <td>{material.per_pallet}</td>
                        <td>{material.volume}</td>
                        <td>{material.date_of_order.toISOString()}</td>
                        <td>
                            {material.arriving_date
                                ? material.arriving_date.toISOString()
                                : manager
                                    ? <ArrivedButton materialId={material.id}/>
                                    : "ARRIVING"
                            }
                        </td>
                        {manager && (
                            <td>
                                <div>
                                    <button onClick={() =>
                                        navigate(`/materials/${material.id}`)}
                                    >
                                        <FaPen/>
                                    </button>
                                    <DeleteButton materialId={material.id}/>
                                </div>
                            </td>
                        )}
                    </tr>
                );
            })}
        </>
    )
}

const ArrivedButton = ({materialId}: { materialId: string }) => {
    return (
        <Button onClick={() => materialArrived(materialId)}>
            ARRIVED
        </Button>
    );
}

const DeleteButton = ({materialId}: { materialId: string }) => {
    return (
        <button onClick={() => {
            deleteMaterial(materialId)
        }}>
            <BiSolidTrashAlt/>
        </button>
    );
}

export default MaterialRows;