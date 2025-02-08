import Button from "../BasicComponents/Button";
import {ReactNode, useState} from "react";
import {useUser} from "../../providers/UserProvider";
import {MaterialsTest, ProductsTest, TestDisplayData} from "../../types";
import {isManager} from "../../utils/storage/departments";
import getTestInfo from "../../utils/getTestInfo";
import handleDownload from "../../utils/handleDownload";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state";
import {setMaterialsTestResult} from "../../features/materialsTestsSlice";
import {setProductsTestResult} from "../../features/productsTestsSlice";

const ResultsItem = ({test, laboratory}: {
    test: MaterialsTest | ProductsTest,
    laboratory: 1 | 2
}) => {
    const {user} = useUser();
    if (!user) throw new Error("No user found");
    const manager = isManager(user.employee_id, ["6", "2"]);

//export into a custom hook
    const [documentName, setDocumentName] = useState<string | null>(null);

//get the results file name
    /*useEffect(() => {
      const documentRef = ref(storage, test.document);
      getFileName(documentRef).then(name => setDocumentName(name));
    }, [test.document]);*/

    const displayData: TestDisplayData = getTestInfo(test, laboratory);

    return (
        <div className={"ResultsItem"}>
            <div className={"test-info side-white-border"}>
                <p>{displayData.date}</p>
                <p>{test.id}</p>
                <p>{displayData.name}</p>
                <p>{displayData.details}</p>
            </div>
            <div className={"document-boxes"}>
                {laboratory === 2 && (
                    <QualityStandards url={displayData.standardsUrl}
                                      name={`${displayData.name}_${displayData.details}`}
                    />
                )}
                <div>
                    {documentName ? (
                        <p>
                            {documentName.length > 10
                                ? documentName.substring(0, 10) + "..."
                                : documentName}
                        </p>
                    ) : (
                        <p>Results of the test {test.id}</p>
                    )}
                    <button onClick={() => handleDownload(test.document_url,
                        `${documentName}.pdf`)}
                    >
                        OPEN
                    </button>
                </div>
            </div>
            <div>
                {test.accepted !== null
                    ? test.accepted ? "ACCEPTED" : "DECLINED"
                    : manager ? (
                        <>
                            <ResultButton testId={test.id}
                                          result={true}
                                          laboratory={laboratory}
                            >
                                ACCEPT
                            </ResultButton>
                            <ResultButton testId={test.id}
                                          result={false}
                                          laboratory={laboratory}
                            >
                                DECLINE
                            </ResultButton>
                        </>
                    ) : (
                        <p>PROCESS</p>
                    )}
            </div>
        </div>
    );
}

const QualityStandards = ({url, name}: {
    url?: string,
    name: string
}) => {
    return (
        <div>
            <p>Standards</p>
            <p onClick={() => url &&
                handleDownload(url, `${name}_quality_standards`)}
            >
                {url ? "OPEN" : "NO STANDARDS"}
            </p>
        </div>
    );
}

const ResultButton = ({children, testId, result, laboratory}: {
    children: ReactNode,
    testId: string,
    result: boolean,
    laboratory: 1 | 2
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleResult = () => {
        if (laboratory === 1) {
            dispatch(setMaterialsTestResult({testId, result}));
        } else {
            dispatch(setProductsTestResult({testId, result}));
        }
    }

    return (
        <Button colorType={2}
                onClick={handleResult}
        >
            {children}
        </Button>
    );
}

export default ResultsItem;