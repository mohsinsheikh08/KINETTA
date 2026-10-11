"use client";
import { useContext } from "react";
import { ProductContext } from "../context/ProductProvider";

const useProduct = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProduct must be used within ProductProvider");
    }
    return context;
}

export default useProduct