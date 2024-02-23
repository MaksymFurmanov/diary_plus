import {useServer} from "../providers/ServerProvider";
import {useState} from "react";

const useLoadData = () => {
    const api = useServer();
    const [loading, setLoading] = useState(false);

    const loadData = async (type, objects) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${api}/${type}/load-${type}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objects)
                });
            if (response.ok) {
                console.log("OK");
            } else {
                console.log("ERROR");
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return [loadData,loading]
}

export default useLoadData;