import {BsPlusCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import EmployeeList from "../components/Employees/EmployeeList";
import PageTitle from "../components/BasicComponents/PageTitle";
import departments from "../initialData/departments";

const Administration = () => {
    /*
        const departments = useSelector(departmentsSelector.data);
        const departmentsLoading = useSelector(departmentsSelector.loading);
        const departmentsError = useSelector(departmentsSelector.error);
    */
    const navigate = useNavigate();

    return (
        <>
            {/*{departmentsLoading && <Alert type={'loading'}>Loading...</Alert>}
            {departmentsError && <Alert type={'error'}>Error</Alert>}*/}

            <div className={"h-stretch-center"}>
                <PageTitle name={"Správa systému"}/>
                <button className={"plus-button"}
                        onClick={() => navigate("/admin/new_employee")}>
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