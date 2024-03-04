import { useState, useEffect, useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {useServer} from "../providers/ServerProvider";

const useReadData = (type) => {
    const api = useServer();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const dataSubject = useMemo(() => new BehaviorSubject([]), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${api}/${type}/get-${type}`);
                if (response.ok) {
                    const fetchedData = await response.json();
                    console.log(type, fetchedData);
                    dataSubject.next(fetchedData);
                } else {
                    console.log(`No ${type} found`);
                }
            } catch (e) {
                console.log(`Error fetching ${type}: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [api, dataSubject, type]);

    useEffect(() => {
        const subscription = dataSubject
            .pipe(
                switchMap(() => {
                    // Your Spring Boot data stream here using RxJS Ajax or other HTTP client
                    return fetch(`${api}/${type}/get-${type}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error(`No ${type} found`);
                            }
                        })
                        .catch(error => {
                            throw new Error(`Error fetching ${type}: ${error.message}`);
                        });
                })
            )
            .subscribe({
                next: updatedData=> {
                    setData(updatedData);
                },
                error: (error) => {
                    console.error(error);
                }
            });

        return () => {
            subscription.unsubscribe();
        };
    }, [api, dataSubject, type]);

    return useMemo(() => ([data, setData, loading]), [data, setData, loading]);
};

export default useReadData;
