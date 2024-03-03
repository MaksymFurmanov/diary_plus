import Button from "../BasicComponents/Button.tsx";
import {useEffect, useState} from "react";
import {ref} from "firebase/storage";
import getFileName from "../../utils/getFileName";
import {storage} from "../../firebase-config";
import {useSetTestsMaterials, useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useSetTestsProducts, useTestsProducts} from "../../providers/TestsProductsProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";

const ResultsItem = ({test, laboratory}) => {
    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
    }
    const setTestsMaterials = useSetTestsMaterials();
    const setTestsProducts = useSetTestsProducts();

    const [loadDataItem, loading] = useLoadDataItem();

    const [documentName, setDocumentName] = useState(null);

    useEffect(() => {
        const documentRef = ref(storage, test.document);
        getFileName(documentRef).then(name => setDocumentName(name));
    }, [test.document]);

    const route = {
        laboratory_1: "tests-materials",
        laboratory_2: "tests-products"
    }

    let date, name, details, standards = undefined;
    if (laboratory === "laboratory_1") {
        date = test.material.arriving_date;
        name = test.material.name;
        details = test.material.supplier;
    } else {
        date = test.order.done_date;
        name = test.order.product.name;
        details = test.order.product.type;
        standards = test.product?.quality_standards;
    }

    const setTests = (tests) => {
        if (laboratory === "laboratory_1") {
            setTestsMaterials(tests);
        } else if (laboratory === "laboratory_2") {
            setTestsProducts(tests);
        }
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
                    test.order.product?.quality_standards
                    && handleDownload("standards")}>
                    {test.product?.quality_standards
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