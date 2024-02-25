import {FaArrowRight} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import {useSetTestsMaterials, useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useSetTestsProducts, useTestsProducts} from "../../providers/TestsProductsProvider";
import {storage} from "../../firebase-config";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import getFileName from "../../utils/getFileName";

const TestingItem = ({test, laboratory}) => {
    const materials = useMaterials();
    const orders = useOrders();
    const products = useProducts();

    const [loadDataItem] = useLoadDataItem();
    const [status, setStatus] = useState(test.status || 0);
    const [document, setDocument] = useState({
        file: null,
        name: null
    });

    const route = {
        laboratory_1: "tests-materials",
        laboratory_2: "tests-products"
    }

    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
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

    const selectHandler = (e) => {
        setStatus(e.target.value);
        const newItem = {
            ...test, status: e.target.value
        }
        loadDataItem(route[laboratory], newItem).then(() => {
            let newTests = [...tests[laboratory]]
            const index = newTests.findIndex((testItem) =>
                testItem.test_id === test.test_id);
            newTests[index] = newItem;
            setTests(newTests);
        });
    }

    let date, name, details;
    if (laboratory === "laboratory_1") {
        const foundMaterial = materials.find((material) =>
            material.material_id === test.material_id);

        date = foundMaterial.arriving_date;
        name = foundMaterial.name;
        details = foundMaterial.supplier;
    } else {
        const foundOrder = orders.find((order) =>
            order.order_id === test.order_id);
        const foundProduct = products.find((product) =>
            product.product_id === foundOrder.product_id);

        date = foundOrder.deadline;
        name = foundProduct.name;
        details = foundProduct.type;
    }
    
    useEffect(() => {
        if(test.document) {
            const docRef = ref(storage, test.document);
            getFileName(docRef).then((name) => {
                setDocument(prevState =>
                ({...prevState, name: name}));
            });
        }
    }, [test.document]);

    const fileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocument({
                file: file,
                name: file.name
            });
        }
    }

    const submitDocumentHandler = () => {
        const documentRef = ref(storage,
            `/${route[laboratory]}/${test.test_id}/document`);

        try {
            if (document.file) {
                const metadata = {
                    contentType: document.file.type,
                    customMetadata: {
                        name: document.name
                    }
                }
                uploadBytes(documentRef, document.file, metadata)
                    .then(snapshot => getDownloadURL(snapshot.ref))
                    .then(url => {
                        const newItem = {
                            ...test, document: url
                        }
                        loadDataItem(route[laboratory], newItem).then(() => {
                            let newTests = [...tests[laboratory]]
                            const index = newTests.findIndex((testItem) =>
                                testItem.test_id === test.test_id);
                            newTests[index] = newItem;
                            setTests(newTests);
                        });
                    });
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <div className={"TestingItem"}>
        <p>{date}</p>
        <p>{test.test_id}</p>
        <p>{name}</p>
        <p>{details}</p>
        <select value={status}
                name={"status"}
                onChange={(e) =>
                    selectHandler(e)}>
            <option value={0}>
                Čaká sa vzorka
            </option>
            <option value={1}>
                Vzorka pripravená
            </option>
            <option value={2}>
                Testuje sa
            </option>
            <option value={3}>
                Čaká sa na schválenie
            </option>
        </select>
        <div className={"test-results"}>
            <input className={"hidden-input"}
                type={"file"}
                id={`document-${test.test_id}`}
                name={`document-${test.test_id}`}
                onChange={fileInput}
            />
            <label htmlFor={`document-${test.test_id}`}>
                {document.name
                    ? (document.name.length > 10
                        ? document.name.substring(0, 10) + "..."
                        : document.name)
                    : 'Upload File'}
            </label>
        </div>
        <button onClick={submitDocumentHandler}>
            <FaArrowRight/>
        </button>
    </div>
}

export default TestingItem;