import {FaArrowRight} from "react-icons/fa6";
//import {storage} from "../../firebase-config";
import {MaterialsTest, ProductsTest} from "../../types";
import getTestInfo from "../../utils/getTestInfo";
import StatusInput from "./StatusInput";
import DocumentInput, {Document} from "./DocumentInput";
import {useState} from "react";

const TestingItem = ({test, laboratory}: {
    test: MaterialsTest | ProductsTest,
    laboratory: 1 | 2
}) => {
    const [document, setDocument] = useState<Document>({
        file: undefined,
        name: undefined
    });

    const displayData = getTestInfo(test, laboratory);

    return (
        <div className={"TestingItem"}>
            <p>{displayData.date}</p>
            <p>{test.id}</p>
            <p>{displayData.name}</p>
            <p>{displayData.details}</p>
            {!test.document_url
                ? <StatusInput test={test}/>
                : test.accepted === null
                    ? "Waiting for review"
                    : test.accepted ? "ACCEPTED" : "DECLINED"
            }
            <DocumentInput test={test}
                           document={document}
                           setDocument={setDocument}
            />
            {!test.document_url && (
                <SubmitButton test={test}
                              document={document}
                              laboratory={laboratory}
                />
            )}
        </div>
    );
}

const route = {
    1: "tests-materials",
    2: "tests-products"
}

const SubmitButton = ({test, document, laboratory}: {
    test: MaterialsTest | ProductsTest,
    document: Document,
    laboratory: 1 | 2
}) => {
    const submitDocumentHandler = () => {
        /*const documentRef = ref(storage,
            `/${route[laboratory]}/${test.id}/document`);

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
                        /!*loadDataItem(route[laboratory], newItem).then(() => {
                            let newTests = [...tests[laboratory]]
                            const index = newTests.findIndex((testItem) =>
                                testItem.test_id === test.test_id);
                            newTests[index] = newItem;
                            setTests(newTests);
                        });*!/
                    });
            }
        } catch (e) {
            console.log(e)
        }*/
    }

    return (
        <button onClick={submitDocumentHandler}>
            <FaArrowRight/>
        </button>
    );
}

export default TestingItem;