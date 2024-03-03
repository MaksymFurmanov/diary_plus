import PageTitle from "../BasicComponents/PageTitle";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import addImage from "../../fig/img/add_image.png"
import Button from "../BasicComponents/Button.tsx";
import PalletColor from "../BasicComponents/PalletColor";
import ProductionPlan from "./ProductionPlan";
import Input from "../BasicComponents/Input.tsx";
import {useProducts, useSetProducts} from "../../providers/ProductsProvider";
import {storage} from "../../firebase-config";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import useLoadData from "../../hooks/useLoadData";
import getFileName from "../../utils/getFileName";
import useDeleteData from "../../hooks/useDeleteData";

const ProductInfo = ({existing}) => {
    const products = useProducts();
    const setProducts = useSetProducts();

    let {productId} = useParams();
    productId = parseInt(productId);
    const navigate = useNavigate();

    const [loadDataItem, loading] = useLoadDataItem();
    const [loadData] = useLoadData();

    const [processes, setProcesses] = useState([]);
    const [deleteData] = useDeleteData();

    const [product, setProduct] = useState({
        product_id: null,
        name: "",
        type: "",
        per_pallet: 20,
        pallet_color: "",
        img: "",
        imageDisplay: addImage,
        imageFile: null,
        quality_standards: "",
        standardsDisplay: "",
        standardsFile: null,
        changed: false
    });

    useEffect(() => {
        if (existing) {
            const existingProduct = products.find((product) =>
                product.product_id === productId);
            if (existingProduct) {
                setProduct({
                    ...existingProduct,
                    imageDisplay: existingProduct.img || addImage
                });
                if (existingProduct.quality_standards) {
                    const docRef = ref(storage, existingProduct.quality_standards);
                    getFileName(docRef).then((name) => {
                        setProduct(prevState =>
                            ({...prevState, standardsDisplay: name}));
                    });
                }
            }
        }
    }, [existing, productId, products]);

    const imageInputHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProduct(prevState => ({
                    ...prevState,
                    imageDisplay: reader.result,
                    imageFile: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const fileInputHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct(prevState => ({
                ...prevState,
                standardsFile: file,
                standardsDisplay: file.name
            }));
        }
    };

    const unsavedChangesHandler = () => {
        if (product.changed) {
            return "/products"
        }
        return "/products"
    };

    const deleteHandler = () => {
        deleteData("products", productId).then(() => {
            setProducts(products.filter(product =>
                product.product_id !== productId));
            navigate("/products")
        });
    };

    const loadToStorage = async () => {
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
                img: imageURL ? imageURL : product.img,
                quality_standards: standardsURL ? standardsURL : product.quality_standards
            };
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            loadToStorage().then(urls => {
                loadDataItem('products', {
                    ...product,
                    img: urls.img,
                    quality_standards: urls.quality_standards
                })
                    .then((newProduct) => {
                        const productIndex = products.findIndex((productItem) =>
                            productItem.product_id === product.product_id);

                        if (productIndex !== -1) {
                            const newProducts = [...products];
                            newProducts[productIndex] =
                                {...products[productIndex], ...newProduct};
                            setProducts(newProducts);
                        } else {
                            setProducts(prevState => [...prevState, newProduct]);
                        }
                        navigate("/products");

                        return newProduct
                    })
                    .then((newProduct) => {
                        const newProcesses = [...processes];
                        processes.forEach((process, index) => {
                            newProcesses[index] = {
                                ...process,
                                product_id: newProduct.product_id,
                            }
                        });
                        loadData("production-processes", newProcesses);
                    });
            }).catch(error => {
                console.error("Error loading files to storage:", error);
            });
        } catch (e) {
            console.error(e.message);
        }
    };

    return loading ? <p>Loading...</p> : <>
        <PageTitle name={existing ? "Produkt" : "Nový produkt"}
                   prev={unsavedChangesHandler()}/>
        <form className={"ProductInfo evenly"} onSubmit={e => submitHandler(e)}>
            <div>
                <div className={"add-product-image"}>
                    <input type={"file"}
                           accept={"image/*"}
                           name={"img"}
                           id={"img"}
                           style={{display: "none"}}
                           onChange={imageInputHandler}
                    />
                    <label htmlFor={"img"}>
                        <img src={product.imageDisplay}
                             alt={""}/>
                    </label>
                </div>
                <PalletColor state={product}
                             setter={setProduct}
                             nameInput={"pallet_color"}/>
            </div>
            <div className={"inputs"}>
                <div>
                    <Input name={"name"}
                           value={product.name}
                           setter={setProduct}
                           state={product}>
                        Produkt:
                    </Input>
                    <Input name={"type"}
                           value={product.type}
                           setter={setProduct}
                           state={product}>
                        Typ:
                    </Input>
                    <div className={"standards-input-container"}>
                        <label>
                            Štandardy kvality:
                        </label>
                        <input className={"hidden-input"}
                               type={"file"}
                               name={"standardsFile"}
                               id={"standardsFile"}
                               onChange={fileInputHandler}
                        />
                        <label htmlFor={"standardsFile"}
                        className={"standards-input"}>
                            {product.standardsDisplay || "Add file"}
                        </label>
                    </div>
                    <Input type={"number"}
                           min={1}
                           size={2}
                           name={"per_pallet"}
                           value={product.per_pallet}
                           setter={setProduct}
                           state={product}>
                        Počet na paletu:
                    </Input>
                    <div>
                        <label htmlFor={"production_plan"}>
                            Produkčný plán:
                        </label>
                        <ProductionPlan
                            processes={processes}
                            setProcesses={setProcesses}
                            productId={productId}/>
                    </div>
                </div>
                <div>
                    {existing
                        ? <>
                            <Button onClick={deleteHandler}
                                    type={"delete"}>VYMAZAŤ</Button>
                            <Button onClick={submitHandler}
                                    type={"edit"}>ÚPRAVIŤ</Button>
                        </>
                        : <Button type={"submit"}>PRIDAŤ</Button>
                    }
                </div>
            </div>
        </form>
    </>
}

export default ProductInfo