export type AppRoute = {
    name: string,
    navigation: string,
    departments: number[]
}

const AppRoutes: AppRoute[] = [
    {
        name: "Objednávky na výrobu",
        navigation: "/orders/products_to_product",
        departments: [0, 1, 2, 3, 4, 5],
    },
    {
        name: "Objednané suroviny",
        navigation: "/orders/raw_materials",
        departments: [2, 0, 1, 3],
    },
    {
        name: "Plán výroby",
        navigation: "/production",
        departments: [0, 1, 2, 3, 4, 5],
    },
    {
        name: "Produkty",
        navigation: "/products",
        departments: [2, 0, 5],
    },
    {
        name: "Vstupný sklad",
        navigation: "/stock/entry",
        departments: [2, 1, 0],
    },
    {
        name: "Výstupný sklad",
        navigation: "/stock/output",
        departments: [2, 1, 0],
    },
    {
        name: "Testovania (Laboratórium 1)",
        navigation: "/testings/laboratory_1",
        departments: [2, 3],
    },
    {
        name: "Testovania (Laboratórium 2)",
        navigation: "/testings/laboratory_2",
        departments: [2, 4],
    },
    {
        name: "Kontrola kvality",
        navigation: "/quality_control",
        departments: [2, 0, 5],
    },
    {
        name: "Správa systému",
        navigation: "/admin",
        departments: [2],
    }
];

export default AppRoutes;