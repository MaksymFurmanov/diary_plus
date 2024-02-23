import {useServer} from "../providers/ServerProvider";
import {useState} from "react";

const useLoadDataItem = () => {
    const api = useServer();
    const [loading, setLoading] = useState(false);

    const loadDataItem = async (type, object) => {
        setLoading(true);
        try {
            const response = await fetch(`${api}/${type}/new`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                });
            if (response.ok) {
                const newObject = await response.json();
                console.log("Loaded", newObject);
                return newObject;
            }
        } catch (e) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return [loadDataItem, loading]
}

export default useLoadDataItem;