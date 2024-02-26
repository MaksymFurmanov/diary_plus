import Button from "../BasicComponents/Button.tsx";
import {FaPen} from "react-icons/fa";
import {BiSolidTrashAlt} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../providers/ProductsProvider";
import {useProductionProcesses} from "../../providers/ProductionProcessesProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import {useMaterials, useSetMaterials} from "../../providers/MaterialsProvider";
import {useSetTestsMaterials} from "../../providers/TestsMaterialsProvider";
import useDeleteData from "../../hooks/useDeleteData";
import {useSetOrders} from "../../providers/OrdersProvider";

const OrdersTable = ({items, type}) => {
    const navigate = useNavigate();
    const products = useProducts();
    const production_processes = useProductionProcesses();
    const materials = useMaterials();
    const [loadDataItem] = useLoadDataItem();
    const [deleteData] = useDeleteData();
    const setTestsMaterials = useSetTestsMaterials();

    const item_id = {
        products_to_product: "order_id",
        raw_materials: "material_id"
    }

    const route = {
        products_to_product: "orders",
        raw_materials: "materials"
    }

    const setOrders = useSetOrders();
    const setMaterials = useSetMaterials();
    const setItems = (newItems) => {
        if(type === "products_to_product") {
            setOrders(newItems);
        } else {
            setMaterials(newItems);
        }
    }

    const arrivedHandler = (material) => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const newMaterial = {...material, arriving_date: `${day}.${month}.${year}`}
        loadDataItem("materials", newMaterial).then(() => {
            let newMaterials = [...materials];
            const index = materials.find((material) =>
                material.material_id === newMaterial.material_id);
            newMaterials[index] = newMaterial;
            setMaterials(newMaterials);
            const test = {material_id: material.material_id}
            loadDataItem("tests-materials", test).then(newTest => {
                setTestsMaterials(prevState => [...prevState, newTest]);
            });
        });
    }

    const deleteHandler = (itemId) => {
        deleteData(route[type], itemId).then(() => {
            setItems(items.filter(item =>
                item[item_id[type]] !== itemId));
        });
    }

    let tableItems, colNames;
    if (type === 'products_to_product') {
        colNames = ["Produkt", "Typ", "Zákazník", "Status",
            "Počet", "Konečný termín"];

        tableItems = items.map((order, index) => {
            const product = products.find((product) =>
                order.product_id === product.product_id);

            let productionProcess, status;

            productionProcess = production_processes
                .find((production_process) =>
                        production_process.production_process_id
                    === order.production_process_id);

            if (productionProcess === undefined) {
                productionProcess = production_processes
                    .find((production_process) =>
                        production_process.production_process_id === 0);

                const processName = productionProcess.name;
                status = `Čaká sa ${processName.charAt(0).toLowerCase()+processName.slice(1)}`
            } else {
                status = productionProcess.done_name
            }

            return <tr key={index}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{order.customer}</td>
                <td>{status}</td>
                <td>{order.volume}</td>
                <td>{order.deadline}</td>
                <td>
                    <div>
                        <button onClick={() =>
                            navigate(`/orders/products_to_product/${order.order_id}`)}>
                            <FaPen/>
                        </button>
                        <button onClick={() =>
                            deleteHandler(order.material_id)}>
                            <BiSolidTrashAlt/>
                        </button>
                    </div>
                </td>
            </tr>
        });
    } else if (type === 'raw_materials') {
        colNames = ["Jednotka suroviny", "Zdroj", "Počet na paletu",
            "Počet paliet", "Datum objednania", "Prišlo"];

        tableItems = items.map((material, index) => {
            return <tr key={index}>
                <td>{material.name}</td>
                <td>{material.supplier}</td>
                <td>{material.per_pallet}</td>
                <td>{material.volume}</td>
                <td>{material.date_of_order}</td>
                <td>{material.arriving_date
                    ? material.arriving_date
                    : <Button onClick={() => arrivedHandler(material)}>
                        PRIŠLO</Button>}
                </td>
                <td>
                    <div>
                        <button onClick={() =>
                            navigate(`/orders/raw_materials/${material.material_id}`)}>
                            <FaPen/>
                        </button>
                        <button onClick={() =>
                            deleteHandler(material.material_id)}>
                            <BiSolidTrashAlt/>
                        </button>
                    </div>
                </td>
            </tr>
        })
    }

    const tableHeaders = colNames.map((name, index) => (
        <th key={index}>{name}</th>
    ));

    return <div className={"table-container"}>
        <table>
            <thead>
            <tr>
                {tableHeaders}
                <th></th>
            </tr>
            </thead>
            <tbody>
            {tableItems}
            </tbody>
        </table>
    </div>
}

export default OrdersTable