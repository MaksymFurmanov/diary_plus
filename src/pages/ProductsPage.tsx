import {useNavigate} from "react-router-dom";
import {BsPlusCircleFill} from "react-icons/bs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import placeholder from "./../fig/img/product_placeholder.webp"
import {useState} from "react";
import {useProducts} from "../providers/ProductsProvider";
import {useUser} from "../providers/UserProvider";
import Button from "./../components/BasicComponents/Button.tsx";
import PageTitle from "../components/BasicComponents/PageTitle";

const ProductsPage = () => {
    const navigate = useNavigate();

    return <>
        <PageTitle name={"Produkty"}/>
        <div className={"ProductsPage"}>
            <ProductsPage/>
            
            <button className={"plus-button"}
                    onClick={() => navigate("new_product")}>
                <BsPlusCircleFill/>
            </button>
        </div>
    </>
}

export default ProductsPage;