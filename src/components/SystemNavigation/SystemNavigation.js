import Button from "../BasicComponents/Button.tsx";
import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import navItemsList from "./NavItemsList";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reinitialize} from "../../state/user/userSlice.ts";

const SystemNavigation = () => {
    const user = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();

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
        dispatch(reinitialize());
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