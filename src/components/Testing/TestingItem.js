import {FaArrowRight} from "react-icons/fa6";
import {useEffect, useState} from "react";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import {useSetTestsMaterials, useTestsMaterials} from "../../providers/TestsMaterialsProvider";
import {useSetTestsProducts, useTestsProducts} from "../../providers/TestsProductsProvider";
import {storage} from "../../firebase-config";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import getFileName from "../../utils/getFileName";

const TestingItem = ({test, laboratory}) => {
    const tests = {
        laboratory_1: useTestsMaterials(),
        laboratory_2: useTestsProducts()
    }
    const setTestsMaterials = useSetTestsMaterials();
    const setTestsProducts = useSetTestsProducts();

    const [loadDataItem] = useLoadDataItem();

    const [status, setStatus] = useState(test.status || 0);
    const [document, setDocument] = useState({
        file: null,
        name: null
    });

    useEffect(() => {
        if (test.document) {
            const docRef = ref(storage, test.document);
            getFileName(docRef).then((name) => {
                setDocument(prevState =>
                    ({...prevState, name: name}));
            });
        }
    }, [test.document]);

    const route = {
        laboratory_1: "tests-materials",
        laboratory_2: "tests-products"
    }

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
        date = test.material.arriving_date;
        name = test.material.name;
        details = test.material.supplier;
    } else {
        date = test.order.deadline;
        name = test.order.product.name;
        details = test.order.product.type;
    }

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
        {!test.document
            ? <select value={status}
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
            </select>
            : test.accepted === null
                ? "Čaká sa na schválenie"
                : test.accepted ? "SCHVALENÉ" : "ZAMIETNUTÉ"}
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
        {!test.document && <button onClick={submitDocumentHandler}>
            <FaArrowRight/>
        </button>}
    </div>
}

export default TestingItem;