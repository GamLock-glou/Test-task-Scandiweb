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
                            // myBagCount
                            ({length})=> {
                                const productLength = length > 9 ? "..." : length
                                if(!length)
                                    return null
                                return <div className='countProduct'>{productLength}</div>
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