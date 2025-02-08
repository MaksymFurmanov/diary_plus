import Button from "../BasicComponents/Button";
import {FaPen} from "react-icons/fa";
import {BiSolidTrashAlt} from "react-icons/bi";
import {Material} from "../../types";
import {useUser} from "../../providers/UserProvider";
import {useNavigate} from "react-router-dom";
import {isManager} from "../../utils/storage/departments";
import {useDispatch, useSelector} from "react-redux";
import {markMaterialsArrived, removeMaterial, selectMaterials} from "../../features/materialsSlice";

const MaterialRows = () => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["2"]);

    const navigate = useNavigate();

    const materials = useSelector(selectMaterials);

    return (
        <>
            {materials && materials.map((material: Material, index) => {
                return (
                    <tr key={index}>
                        <td>{material.name}</td>
                        <td>{material.supplier}</td>
                        <td>{material.per_pallet}</td>
                        <td>{material.volume}</td>
                        <td>{material.date_of_order.toString().slice(0, 10)}</td>
                        <td>
                            {material.arriving_date
                                ? material.arriving_date.toString().slice(0, 10)
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
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(markMaterialsArrived(materialId))}>
            ARRIVED
        </Button>
    );
}

const DeleteButton = ({materialId}: { materialId: string }) => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => {
            dispatch(removeMaterial(materialId))
        }}>
            <BiSolidTrashAlt/>
        </button>
    );
}

export default MaterialRows;