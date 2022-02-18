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

interface AboutProductItemState {
    attributes: any;
    productId: string
}

function getAttributes(attributes: AttributeSet[]) {

    return attributes.reduce((prev, now) => {
        const attr = prev;
        attr[now.id] = now.items[0].value;
        return attr;
    }, {});
}


export class AboutProduct extends Component<AboutProductItemProps, AboutProductItemState> {

    constructor(props) {
        super(props)
        this.state = {
            productId: this.props.id,
            attributes: getAttributes(props.attributes)
        }
    }

    render() {
        const {
            name,
            description,
            attributes,
            price,
            brand } = this.props;
        return (
            <div className="aboutTheProduct">
                <div className="brandProduct">{brand}</div>
                <div className="nameProduct">{name}</div>
                <Attributes 
                    attributes={attributes}
                    defaultValue={this.state}
                    onClickAttribute={this.onClickAttribute}
                />
                <div className="priceProduct">
                    <div>Price:</div>
                    <div>{price}</div>
                </div>
                <NavLink
                    to="/all"
                    style={{ textDecoration: "none" }}
                >
                    <div className="button__addProduct" onClick={this.onClick}>
                        ADD TO CARD
                    </div>
                </NavLink>
                <div className="descriptionProduct" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }

    onClickAttribute = (id, value) => {
        this.setState({attributes: {...this.state.attributes, [id]: value }})
    }

    onClick = () => {
        this.props.setProductsCard(this.props.id, this.state.attributes)
    }

}
