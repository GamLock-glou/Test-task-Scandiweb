import React, { Component } from 'react';
import { AttributeSet } from '../../../types';
import { Attributes } from './Attributes/Attributes';
import { NavLink } from "react-router-dom";

interface AboutProductItemProps {
    name: string;
    description: string;
    attributes: AttributeSet[];
    price: string;
    brand: string;
    id: string;
    setProductsCard: any
}

export class AboutProduct extends Component<AboutProductItemProps> {

    render() {

        const {
            name,
            description,
            attributes,
            price,
            brand, id } = this.props;

        return (
            <div className="aboutTheProduct">
                <div className="brandProduct">{brand}</div>
                <div className="nameProduct">{name}</div>
                <Attributes attributes={attributes} />
                <div className="priceProduct">
                    <div>Price:</div>
                    <div>{price}</div>
                </div>
                <NavLink
                    to="/all"
                    style={{ textDecoration: "none" }}
                >
                    <div className="button__addProduct">
                        ADD TO CARD
                    </div>
                </NavLink>
                <div className="descriptionProduct" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }
}
