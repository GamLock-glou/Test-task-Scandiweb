import React, { Component } from 'react';
import Cart from "../../../pictures/Cart.png";
import { ProviderProductsInCart } from "../../Providers/Provider"

export class MyBag extends Component {

    render() {
        return (
            <div>
                <div className="bagInHead" onClick={this.onClick}>
                    <img src={Cart}/>
                    <ProviderProductsInCart.Consumer>
                        {
                            productsInCart=> {
                                return !productsInCart.length 
                                ? null 
                                : <div className='countProduct'>{productsInCart.length > 3 ? "..." : productsInCart.length}</div>
                            }
                        }
                    </ProviderProductsInCart.Consumer>
                </div>
            </div>
        );
    }

    onClick = () => {
        this.props.setVisible(!this.props.visible)
    }
}