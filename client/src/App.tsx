import "./App.css";
import React from "react";
import { Header } from "./components/Header/Header";
import { Products } from "./components/Product/Products";
import { ProviderProductsInCart } from "./components/Providers/Provider"
import { Price } from "./types";

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

  componentDidMount() {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const products = JSON.parse(cart) as any;
      this.setState({ productsInCart: products })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.productsInCart !== this.state.productsInCart)
      localStorage.setItem('cart', JSON.stringify(this.state.productsInCart))
  }

  render() {
    return (
      <div className="App">
        <ProviderProductsInCart.Provider value={this.state.productsInCart}>

          <Header
            setCurrency={this.setCurrency}
            setVisible={this.onClick}
            visible={this.state.visible}
          />
          <div className="body">
            {/* this can be component Body */}
            <Products
              currency={this.state.currency}
              setProductsCart={this.setProductsCart}
              setVisible={this.onClick}
              visible={this.state.visible}
              addProductCount={this.addProductCount}
              changeAttribute={this.changeAttribute}
            />
          </div>
        </ProviderProductsInCart.Provider>
      </div>
    );
  }

  onClick = (visible) => {
    this.setState({ visible: visible });
  }

  changeAttribute = (id, attributeIndex, attributeValue) => {
    const newProducts = [...this.state.productsInCart];
    const index = newProducts.findIndex(({ productId }) => productId === id);
    if (newProducts[index]) {
      newProducts[index] = {
        ...newProducts[index],
        attributes: {
          ...newProducts[index].attributes,
          [attributeIndex]: attributeValue
        }
      }
      this.setState({ productsInCart: newProducts });
    }
  }

  addProductCount = (id: string, count: number = 1) => {
    const newProducts = [...this.state.productsInCart];
    const index = newProducts.findIndex(({ productId }) => productId === id);
    if (newProducts[index]) {
      if (newProducts[index].productCount + count > 0) {
        newProducts[index] = { ...newProducts[index], productCount: newProducts[index].productCount + count }
        this.setState({ productsInCart: newProducts });
      }
      else {
        const filt = newProducts.filter((product, indexProduct) => indexProduct !== index)
        this.setState({ productsInCart: filt });
      }
    }
  }

  setProductsCart = (productId: string, attributes: {}, prices: Price[]) => {
    let product = this.state.productsInCart.find((product) => product.productId == productId)
    let count = product ? product.productCount + 1 : 1;
    let newProduct = { productId: productId, productCount: count, attributes: attributes, prices: prices }

    let filt = this.state.productsInCart.filter(productInCart => productInCart.productId !== productId)
    filt.push(newProduct);
    this.setState({ productsInCart: filt })
  }

  setCurrency = (currency: string) => {
    this.setState({ currency: currency });
  };
}

export default App;
