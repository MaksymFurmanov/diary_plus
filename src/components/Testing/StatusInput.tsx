import {ChangeEvent, useState} from "react";
import {MaterialsTest, ProductsTest} from "../../types";

const StatusInput = ({test}: {
    test: MaterialsTest | ProductsTest
}) => {
    const [status, setStatus] = useState(test.status || 0);

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(Number(e.target.value));
        const newItem = {
            ...test, status: e.target.value
        }

/*        loadDataItem(route[laboratory], newItem).then(() => {
            let newTests = [...tests[laboratory]]
            const index = newTests.findIndex((testItem) =>
                testItem.test_id === test.test_id);
            newTests[index] = newItem;
            setTests(newTests);
        });*/
    }

    return (
        <select value={status}
                name={"status"}
                onChange={(e) =>
                    selectHandler(e)}>
            <option value={0}>
                Waiting for a sample
            </option>
            <option value={1}>
                A sample is prepared
            </option>
            <option value={2}>
                Testing
            </option>
        </select>
    );
}

export default StatusInput;