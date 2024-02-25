import Button from "../BasicComponents/Button.tsx";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";
import {useEffect, useState} from "react";
import {ref} from "firebase/storage";
import getFileName from "../../utils/getFileName";
import {storage} from "../../firebase-config";
import {useSetTestsMaterials, useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useSetTestsProducts, useTestsProducts} from "../../providers/TestsProductsProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";

const ResultsItem = ({test, laboratory}) => {
    const materials = useMaterials();
    const orders = useOrders();
    const products = useProducts();
    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
    }
    const route = {
        laboratory_1: "tests-materials",
        laboratory_2: "tests-products"
    }
    const setTestsMaterials = useSetTestsMaterials();
    const setTestsProducts = useSetTestsProducts();

    const setTests = (tests) => {
        if (laboratory === "laboratory_1") {
            setTestsMaterials(tests);
        } else if (laboratory === "laboratory_2") {
            setTestsProducts(tests);
        }
    }
    const [loadDataItem, loading] = useLoadDataItem();

    const [documentName, setDocumentName] = useState(null);

    useEffect(() => {
        const documentRef = ref(storage, test.document);
        getFileName(documentRef).then(name => {
            setDocumentName(name);
        });
    }, [test.document]);

    let date, name, details, standards = null, foundProduct;
    if (laboratory === "laboratory_1") {
        const foundMaterial = materials.find((material) =>
            material.material_id === test.material_id);

        date = foundMaterial.arriving_date;
        name = foundMaterial.name;
        details = foundMaterial.supplier;
    } else {
        const foundOrder = orders.find((order) =>
            order.order_id === test.order_id);
        foundProduct = products.find((product) =>
            product.product_id === foundOrder.product_id);

        date = foundOrder.done_date;
        name = foundProduct.name;
        details = foundProduct.type;
        standards = foundProduct.quality_standards;
    }

    const handleDownload = (type) => {
        const link = document.createElement('a');
        link.target = "_blank";
        link.href = type === "standards" ? standards : test.document;
        link.download = type === "standards"
            ? `${name}_${details}_quality_standards`
            : `${test.test_id}.pdf`;
        link.click();
    };

    const handleResult = (result) => {
        const newTest = {...test, accepted: result}
        loadDataItem(route[laboratory], newTest).then(() => {
            let newTests = [...tests[laboratory]];
            const index = tests[laboratory].findIndex(test =>
                test.test_id === newTest.test_id
            );
            newTests[index] = newTest;
            setTests(newTests);
        });
    }

    return loading ? "Loading..." : <div className={"ResultsItem"}>
        <div className={"test-info side-white-border"}>
            <p>{date}</p>
            <p>{test.test_id}</p>
            <p>{name}</p>
            <p>{details}</p>
        </div>
        <div className={"document-boxes"}>
            {laboratory === "laboratory_2" && <div>
                <p>Štandardy</p>
                <p onClick={() =>
                    foundProduct.quality_standards
                    && handleDownload("standards")}>
                    {foundProduct.quality_standards
                        ? "OTVORIŤ"
                        : "NIE SÚ"}
                </p>
            </div>}
            <div>
                <p>{documentName > 10
                    ? documentName.substring(0, 10) + "..."
                    : documentName}
                </p>
                <p onClick={() => handleDownload("document")}>
                    OTVORIŤ
                </p>
            </div>
        </div>
        <div>
            {test.accepted !== null
                ? test.accepted ? "SCHVALENÉ" : "ZAMIETNUTÉ"
                : <>
                    <Button colorType={2}
                            onClick={() => handleResult(true)}>
                        SCHVALIŤ</Button>
                    <Button colorType={2}
                            onClick={() => handleResult(false)}>
                        ZAMIETNUŤ</Button>
                </>}
        </div>
    </div>
}

export default ResultsItem;