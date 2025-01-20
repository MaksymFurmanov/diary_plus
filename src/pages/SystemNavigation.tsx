import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {useUser} from "../providers/UserProvider";
import navItemsList from "../appRoutes";
import Button from "../components/BasicComponents/Button.tsx";

const SystemNavigation = () => {
    const user = useUser();

    const navigate = useNavigate();

    const navItems = navItemsList.map((item,
                                       index) => {
        if(item.departments.includes(user.department_id)){
            return <Button key={index}
                           onClick={() => navigate(item.navigation)}>
                {item.name}
            </Button>
        }
        else return <Fragment key={index}/>
    });

    const logOut = () => {
        navigate("/")
    }

    return (
        <div className={"SystemNavigation"}>
            <div className={"user-info v-center"}>
                <div>
                    <Button onClick={logOut}>
                        ODHLASIŤ SA
                    </Button>
                    <Button onClick={() => navigate("/about_system")}>
                        O systéme
                    </Button>
                </div>
                <div>
                    <IoPerson/>
                    <p>{user.name}</p>
                    <p>{user.position}</p>
                </div>
            </div>
            <nav className={"nav-panel"}>
                {navItems}
            </nav>
        </div>
    )
}

export default SystemNavigation;