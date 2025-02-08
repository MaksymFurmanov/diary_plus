import {PieChart} from "@mui/x-charts";
import {DashboardType, Material, Order} from "../../types";
import {selectMaterials} from "../../features/materialsSlice";
import {selectOrders} from "../../features/ordersSlice";
import store from "../../state";
import {selectProducts} from "../../features/productsSlice";

type ChartData = {
    label: string,
    value: number
}

const PieData = ({type}: DashboardType) => {
    const chartData: ChartData[] = type === "orders"
        ? ordersData()
        : materialsData();

    return (
        <div className={"OrdersGraph"}>
            <PieChart
                series={[
                    {
                        data: chartData,
                    },
                ]}
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: {vertical: 'bottom', horizontal: 'middle'},
                        padding: 0,
                    },
                }}
                width={400}
                height={200}
            />
        </div>
    );
}

const ordersData = (): ChartData[] => {
    const state = store.getState();
    const orders = selectOrders(state);
    if(!orders) return [];

    const products = selectProducts(state);
    if(!products) throw Error("No products found");

    return orders.map((order: Order) => {
        const product = products.find(product =>
            product.id === order.product_id);
        if (!product) {
            throw new Error(`No product for the order ${order.id} found`);
        }

        return {
            label: `${product.name} ${product.type}`,
            value: order.volume
        }
    });
}

const materialsData = (): ChartData[] => {
    const state = store.getState();
    const materials = selectMaterials(state);
    if(!materials) return [];

    return materials.map((material: Material) => {
        return {
            label: material.name,
            value: material.volume
        };
    });
}

export default PieData
