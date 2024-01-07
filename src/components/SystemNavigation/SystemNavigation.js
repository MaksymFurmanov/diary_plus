import Button from "../BasicComponents/Button.tsx";
import {IoPerson} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import navItemsList from "./NavItemsList";

const SystemNavigation = () => {
    const navigate = useNavigate();

    const name = "Maksym Furmanov";
    const position = "Riaditeľ podniku";

    const navItems = navItemsList.map((item,
                                       index) => {
        return <Button key={index}
                       onClick={() => navigate(item.navigation)}>
            {item.name}
        </Button>
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
                    <p>{name}</p>
                    <p>{position}</p>
                </div>
            </div>
            <nav className={"nav-panel"}>
                {navItems}
            </nav>
        </div>
    )
}

export default SystemNavigation;