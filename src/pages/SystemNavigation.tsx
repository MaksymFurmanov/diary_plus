import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {useUser} from "../providers/UserProvider";
import navItemsList from "../appRoutes";
import Button from "../components/BasicComponents/Button";
import {getEmployeeById} from "../utils/storage/employees";

const SystemNavigation = () => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const employee = getEmployeeById(user.employee_id);
    if (!employee) throw new Error("Employee not found");

    const navigate = useNavigate();

    return (
        <div className={"SystemNavigation"}>
            <div className={"user-info v-center"}>
                <div>
                    <Button onClick={() => navigate("/")}>
                        ODHLASIŤ SA
                    </Button>
                    <Button onClick={() => navigate("/about_system")}>
                        O systéme
                    </Button>
                </div>
                <div>
                    <IoPerson/>
                    <p>{employee.name}</p>
                    <p>{employee.position}</p>
                </div>
            </div>

            <nav className={"nav-panel"}>
                {navItemsList.map((item, index) => {
                    if (item.departments.includes(employee.department_id)) {
                        return (
                            <Button key={index}
                                    onClick={() => navigate(item.navigation)}
                            >
                                {item.name}
                            </Button>
                        )
                    } else return <Fragment key={index}/>
                })}
            </nav>
        </div>
    )
}

export default SystemNavigation;