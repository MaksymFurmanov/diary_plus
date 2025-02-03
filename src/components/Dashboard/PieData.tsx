import {PieChart} from "@mui/x-charts";
import {DashboardType, Material, Order} from "../../types";
import {getProducts} from "../../utils/storage/products";
import {getOrders} from "../../utils/storage/orders";
import {getMaterials} from "../../utils/storage/materials";

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
    const orders = getOrders();
    if(!orders) return [];

    const products = getProducts();
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
    const materials = getMaterials();
    if(!materials) return [];

    return materials.map((material: Material) => {
        return {
            label: material.name,
            value: material.volume
        };
    });
}

export default PieData
