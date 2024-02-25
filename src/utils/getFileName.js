import {getMetadata} from "firebase/storage";

const getFileName = async (docRef) => {
    try {
        const metadata = await getMetadata(docRef);
        return metadata.customMetadata.name
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default getFileName;