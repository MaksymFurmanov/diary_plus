export type AppRoute = {
    name: string,
    navigation: string,
    departments: string[]
}

const AppRoutes: AppRoute[] = [
    {
        name: "Production Orders",
        navigation: "/dashboard/orders",
        departments: ["0", "1", "2", "3", "4", "5"],
    },
    {
        name: "Raw Materials",
        navigation: "/dashboard/materials",
        departments: ["2", "0", "1", "3"],
    },
    {
        name: "Production Plan",
        navigation: "/production",
        departments: ["0", "1", "2", "3", "4", "5"],
    },
    {
        name: "Products",
        navigation: "/products",
        departments: ["2", "0", "5"],
    },
    {
        name: "Incoming Stock",
        navigation: "/stock/entry",
        departments: ["2", "1", "0"],
    },
    {
        name: "Output Stock",
        navigation: "/stock/output",
        departments: ["2", "1", "0"],
    },
    {
        name: "Testing (Laboratory 1)",
        navigation: "/testings/1",
        departments: ["2", "3"],
    },
    {
        name: "Testing (Laboratory 2)",
        navigation: "/testings/2",
        departments: ["2", "4"],
    },
    {
        name: "Quality Control",
        navigation: "/quality_control",
        departments: ["2", "0", "5"],
    },
    {
        name: "System Administration",
        navigation: "/admin",
        departments: ["2"],
    }
];

export default AppRoutes;
