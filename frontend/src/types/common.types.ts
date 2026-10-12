import { StaticImageData } from "next/image";
import React from "react";

export interface childrenType {
    children: React.ReactNode
}

export interface VideoPropsType {
    posterSrc : string,
    videoSrc: string,
    mainHeading: string,
    secondHeading: string,
}

export interface ProductListType {
    backImage: StaticImageData,
    frontImage: StaticImageData,
    heading: string,
    price: number,
    detail: string
}