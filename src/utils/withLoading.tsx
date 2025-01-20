import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import Alert from "../components/BasicComponents/Alert";

const withLoading = (WrappedComponent: FC, selectorArray: Array<any>) => {
    return () => {
        const loading = selectorArray.some(selector => useSelector(selector.loading));

        const error = selectorArray.some(selector => useSelector(selector.error));

        return <>
            {loading && <Alert type={'loading'}>Loading...</Alert>}
            {error && <Alert type={'error'}>Network error</Alert>}
            <WrappedComponent/>
        </>
    };
};

export default withLoading;