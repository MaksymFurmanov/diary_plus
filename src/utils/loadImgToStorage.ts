import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {ProductInput} from "../types";
import firebase from "firebase/compat";

const loadImgToStorage = async (product: ProductInput) => {
    if(!storage) throw new Error("Storage connection error");
    const imageRef = ref(storage,
        `/products/${product.name}-${product.type}/img`);
    const standardsRef = ref(storage,
        `/products/${product.name}-${product.type}/quality_standards`);

    let imageURL, standardsURL;
    try {
        if (product.imageFile) {
            imageURL = await uploadBytes(imageRef, product.imageFile)
                .then((snapshot) => getDownloadURL(snapshot.ref));
        }

        if (product.standardsFile) {
            const metadata = {
                contentType: product.standardsFile.type,
                customMetadata: {
                    name: product.standardsFile.name
                }
            }
            standardsURL = await uploadBytes(standardsRef,
                product.standardsFile, metadata)
                .then((snapshot) => getDownloadURL(snapshot.ref));
        }

        return {
            img_url: imageURL ? imageURL : product.img_url,
            quality_standards_url: standardsURL ? standardsURL : product.quality_standards_url
        };
    } catch (error) {
        console.error("Error uploading files:", error);
    }
}

export default loadImgToStorage;