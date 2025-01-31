import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ref} from "firebase/storage";
import getFileName from "../../utils/getFileName";
/*import firebase from "firebase/compat";
import storage = firebase.storage;*/
import {MaterialsTest, ProductsTest} from "../../types";

export type Document = {
    file: File | undefined,
    name: string | undefined
}

const DocumentInput = ({test, document, setDocument}: {
    test: MaterialsTest | ProductsTest,
    document: Document,
    setDocument: Dispatch<SetStateAction<Document>>
}) => {
    useEffect(() => {/*
        if (test.document_url) {
            const docRef = ref(storage, test.document_url);
            getFileName(docRef).then((name) => {
                setDocument(prevState => {
                    return {...prevState, name: name || undefined}
                });
            });
        }*/
    }, [setDocument, test.document_url]);

    const fileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDocument({
                file: file,
                name: file.name
            });
        }
    }

    return (
        <div className={"test-results"}>
            <input className={"hidden-input"}
                   type={"file"}
                   id={`document-${test.id}`}
                   name={`document-${test.id}`}
                   onChange={fileInput}
            />
            <label htmlFor={`document-${test.id}`}>
                {document.name
                    ? (document.name.length > 10
                        ? document.name.substring(0, 10) + "..."
                        : document.name)
                    : 'Upload File'}
            </label>
        </div>
    );
}

export default DocumentInput;