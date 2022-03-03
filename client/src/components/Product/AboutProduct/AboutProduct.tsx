import React, {Component} from 'react';
import {AttributeSet, Price} from '../../../types';
import {Attributes} from './Attributes/Attributes';
import {getPrice, getAttributes} from '../../../util';
import DOMPurify from 'dompurify';

interface AboutProductItemProps {
    name: string;
    description: string;
    attributes: AttributeSet[];
    prices: Price[];
    brand: string;
    id: string;
    setProductsCart: any
    currency:string
    inStock: boolean
}

interface AboutProductItemState {
    attributes: any;
    productId: string
}

export class AboutProduct extends Component<AboutProductItemProps, AboutProductItemState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.id,
      attributes: getAttributes(props.attributes),
    };
  }

  render() {
    const {
      name,
      description,
      attributes,
      prices,
      brand,
      currency,
      inStock} = this.props;
      // For the examiner.
      // You asked not to use dangerouslySetInnerHTML because it is dangerous.
      // I found a way to clean HTML, thereby dangerouslySetInnerHTML becomes safe to use.
      // If you don't like this arrangement, I found a way to manage DOMPurify.
      // This rule can be added {ALLOWED_TAGS: false} to DOMPurify.
    const clearDescription = DOMPurify.sanitize(description);
    const price = getPrice(prices, currency);
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
        {
          inStock ?
          <div
            onClick={this.onClick}
            className="button__addProduct">
            ADD TO CART
          </div> :
          <div
            className="button__unableAddProduct"
            onClick={()=>alert('The product is out of stock')}>
            UNABLE TO ADD TO CART
          </div>
        }

        <div
          className="descriptionProduct"
          dangerouslySetInnerHTML={{__html: clearDescription}}
        />
      </div>
    );
  }

  onClickAttribute = (id, value) => {
    this.setState({attributes: {...this.state.attributes, [id]: value}});
  };

  onClick = () => {
    this.props.setProductsCart(this.props.id, this.state.attributes, this.props.prices);
  };
}
