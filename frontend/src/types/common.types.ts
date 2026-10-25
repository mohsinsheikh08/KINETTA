
import React from "react";

export interface childrenType {
  children: React.ReactNode;
}

export interface categoryType {
  category?: string,
  heading: string,
}

export interface VideoPropsType { 
  posterSrc: string;
  videoSrc: string;
  mainHeading: string;
  secondHeading: string;
  link: string;
}

export interface ProductListType {
  backImage: string;
  frontImage: string;
  id: string;
  price: number;
  detail: string;
  colors: string[]
}
