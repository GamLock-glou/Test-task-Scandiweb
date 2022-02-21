import "./App.css";
import React from "react";
import { Header } from "./components/Header/Header";
import { Products } from "./components/Product/Products";
import { ProviderProductsInCart } from "./components/Providers/Provider"

interface AppState {
  currency: string;
  productsInCart: any;
  visible: boolean
}

class App extends React.Component<Record<string, never>, AppState> {
  state: AppState = {
    currency: "USD",
    productsInCart: [],
    visible: false,
  };

  // testing
  // {
  //   productId: "jacket-canada-goosee",
  //   attributes: {"Size": "S"}
  // },


  render() {
    // console.log(this.state.productsInCart);
    return (
      <div className="App">
        <ProviderProductsInCart.Provider value={this.state.productsInCart}>
          <div className="header">
            <Header
              setCurrency={this.setCurrency}
              setVisible={this.onClick}
              visible={this.state.visible}
            />
          </div>
          <div className="body">
            {/* this can be component Body */}
            <Products
              currency={this.state.currency}
              setProductsCard={this.setProductsCart}
              setVisible={this.onClick}
              visible={this.state.visible}
            />
          </div>
        </ProviderProductsInCart.Provider>
      </div>
    );
  }

  onClick = (visible) => {
    this.setState({visible: visible});
  }

  setProductsCart = (productId: string, attributes: {}) => {
    //shit
    let product = this.state.productsInCart.find((product) => product.productId == productId)
    let count = product ? product.productCount + 1 : 1;
    let newProduct = { productId: productId, productCount: count, attributes: attributes }

    let filt = this.state.productsInCart.filter(productInCart => productInCart.productId !== productId)
    filt.push(newProduct);
    this.setState({ productsInCart: filt })
  }

  setCurrency = (currency: string) => {
    this.setState({ currency: currency });
  };
}

export default App;
