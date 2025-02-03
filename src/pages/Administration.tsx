import {BsPlusCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import EmployeeList from "../components/Employees/EmployeeList";
import PageTitle from "../components/BasicComponents/PageTitle";
import departments from "../initialData/departments";

const Administration = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"h-stretch-center"}>
                <PageTitle name={"Správa systému"}/>
                <button className={"plus-button"}
                        onClick={() => navigate("/admin/new_employee")}
                >
                    <BsPlusCircleFill/>
                </button>
            </div>

            <div className={"AdminPage"}>
                {departments.map((department, index) => {
                    return <EmployeeList key={index} department={department}/>
                })}
            </div>
        </>
    );
}

export default Administration