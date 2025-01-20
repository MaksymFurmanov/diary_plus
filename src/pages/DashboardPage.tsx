import {useNavigate} from "react-router-dom";
import {useUser} from "../providers/UserProvider";
import PageTitle from "../components/BasicComponents/PageTitle";
import {BsPlusCircleFill} from "react-icons/bs";
import PieData from "../components/Dashboard/PieData";
import Table from "../components/Dashboard/Table";
import {DashboardType} from "../types";

const title = {
    orders: "Orders",
    materials: "Materials"
}

const newItemRoute = {
    orders: "orders/new_order",
    materials: "/materials/new_material"
}

const DashboardPage = ({type}: DashboardType) => {
    const user = useUser();
    if (!user) throw new Error("User not found");

    const navigate = useNavigate();

    return <>
        <div className={"h-stretch-center"}>
            <PageTitle name={title[type]}/>

            {user.manager && (
                <button className={"plus-button"}
                        onClick={() => navigate(newItemRoute[type])}>
                    <BsPlusCircleFill/>
                </button>
            )}
        </div>
        <div className={"Dashboard"}>
            <PieData type={type}/>
            <Table type={type}/>
        </div>
    </>
}

export default DashboardPage;