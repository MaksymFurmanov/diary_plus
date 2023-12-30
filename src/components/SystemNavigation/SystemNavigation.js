import Button from "../Button";
import personImg from "../../fig/img/Person.svg";
import {useNavigate} from "react-router-dom";
import navItemsList from "./NavItemsList";

const SystemNavigation = () => {
    const navigate = useNavigate();

    const name = "Maksym Furmanov";
    const position = "Riaditeľ podniku";

    const navItems = navItemsList.map((item,
                                       index) => {
        return <Button key={index}
            click={() => navigate(item.navigation)}>
            {item.name}
        </Button>
    })

    return (
        <div className={"SystemNavigation"}>
            <div className={"user-info"}>
                <div>
                    <Button>ODHLASIŤ SA</Button>
                    <Button>O systéme</Button>
                </div>
                <div>
                    <img src={personImg} alt={""}/>
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