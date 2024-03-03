import {useState} from "react";
import {useServer} from "../providers/ServerProvider";

const useDeleteData = () => {
    const api = useServer();
    const [loading, setLoading] = useState(false);

    const deleteData = async (type, id) => {
        setLoading(true);

        try {
            const response = await fetch(
                `${api}/${type}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(id)
                });
            if (response.ok) {
                console.log("DELETED");
            } else {
                console.error("ERROR");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return [deleteData, loading]
}

export default useDeleteData;