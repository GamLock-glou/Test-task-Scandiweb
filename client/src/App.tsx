import "./App.css";
import React from "react";
import { Header } from "./components/Header/Header";
import { Products } from "./components/Product/Products";
import {ProductsInCart} from "./components/Providers/Provider"

interface AppState {
  currency: string;
  productsInCart: any;
}

class App extends React.Component<Record<string, never>, AppState> {
  state: AppState = {
    currency: "USD",
    productsInCart: []
  };
  // testing
  // {
  //   productId: "jacket-canada-goosee",
  //   attributes: {"Size": "S"}
  // },
  

  render() {
    console.log(this.state.productsInCart)
    return (
      <div className="App">
        <div className="header">

          <Header
            setCurrency={this.setCurrency}
          />
        </div>
        <div className="body">
          {/* this can be component Body */}
            <ProductsInCart.Provider value={this.state.productsInCart}>
              <Products
                currency={this.state.currency}
                setProductsCard={this.setProductsCart}
              />  
            </ProductsInCart.Provider>
        </div>
      </div>
    );
  }

  setProductsCart=(productId: string, attributes: {})=>{
    //shit
    let seachId = this.state.productsInCart.findIndex((product) => product.productId == productId)
    let productCount = this.state.productsInCart[seachId]?.productCount !== undefined 
      ? this.state.productsInCart[seachId].productCount + 1 : 1;

    let newProduct = { productId: productId, productCount: productCount, attributes: attributes }

    let filt = this.state.productsInCart.filter(productInCart => productInCart.productId !== productId)
    filt.push(newProduct);
    this.setState({ productsInCart: filt })
  }

  setCurrency = (currency: string) => {
    this.setState({ currency: currency });
  };
}

export default App;
