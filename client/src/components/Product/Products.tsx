import React, { Component } from 'react';
import { ProductItem } from './ProductItem';
import { ProductList } from "./ProductList"

interface ProductsProps {
    currency: string;
    categoryTitle: string;
    pathName: string;
    setPathName: any;
  }

export class Products extends Component<ProductsProps> {
    render() {
        const { currency, categoryTitle, setPathName, pathName } = this.props;
        const id = pathName.split("/", 2)[1];
        if(id)
            return <ProductItem id={id}/>
        return (
            <ProductList
                categoryTitle={categoryTitle}
                currency={currency}
                setPathName={setPathName}
            />
        );
    }
}