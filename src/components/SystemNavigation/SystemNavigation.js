import Button from "../BasicComponents/Button.tsx";
import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import navItemsList from "./NavItemsList";
import {useUser} from "../../providers/UserProvider";
import {Fragment} from "react";

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
    })

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