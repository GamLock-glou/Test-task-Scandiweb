import './App.css';
import React from 'react';
import {Header} from './components/Header/Header';
import {Products} from './components/Product/Products';
import {ProviderProductsInCart} from './components/Providers/Provider';
import {Price} from './types';

interface AppState {
  currency: string;
  productsInCart: any;
  visible: boolean;
  isCurrencySwicherActive: boolean;
}

class App extends React.Component<Record<string, never>> {
  state: AppState = {
    currency: 'USD',
    productsInCart: [],
    visible: false,
    isCurrencySwicherActive: false,
  };

  componentDidMount() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const products = JSON.parse(cart) as any;
      this.setState({productsInCart: products});
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.productsInCart !== this.state.productsInCart) {
      localStorage.setItem('cart', JSON.stringify(this.state.productsInCart));
    }
  }

  render() {
    return (
      <div className="App" onClick={this.changeStateCurrencySwitcher}>
        <ProviderProductsInCart.Provider value={this.state.productsInCart}>
          <Header
            setCurrency={this.setCurrency}
            setVisible={this.onClick}
            visible={this.state.visible}
            onClickCurrencySwitcher={this.onClickCurrencySwitcher}
            isCurrencySwicherActive={this.state.isCurrencySwicherActive}
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

  onClickCurrencySwitcher = (isActive: boolean, label: string = this.state.currency) => {
    this.setCurrency(label);
    this.setState({isCurrencySwicherActive: isActive});
    if (isActive) {
      this.setState({visible: false});
    }
  };

  changeStateCurrencySwitcher = () => {
    if (this.state.isCurrencySwicherActive) {
      this.setState({isCurrencySwicherActive: false});
    }
  };

  onClick = (visible) => {
    this.setState({visible: visible});
    if (visible) {
      this.setState({isCurrencySwicherActive: false});
    }
  };

  changeAttribute = (id, attributeIndex, attributeValue) => {
    const newProducts = [...this.state.productsInCart];
    const index = newProducts.findIndex(({productId}) => productId === id);
    if (newProducts[index]) {
      newProducts[index] = {
        ...newProducts[index],
        attributes: {
          ...newProducts[index].attributes,
          [attributeIndex]: attributeValue,
        },
      };
      this.setState({productsInCart: newProducts});
    }
  };

  addProductCount = (id: string, attribute: {}, count: number = 1) => {
    const newProducts = [...this.state.productsInCart];
    const index = newProducts.findIndex(
        ({productId, attributes}) => productId === id &&
        this.attributeIsEqual(attributes, attribute),
    );
    if (newProducts[index]) {
      if (newProducts[index].productCount + count > 0) {
        newProducts[index] = {
          ...newProducts[index],
          productCount: newProducts[index].productCount + count,
        };
        this.setState({productsInCart: newProducts});
      } else {
        const filt = newProducts.filter((product, indexProduct) => indexProduct !== index);
        this.setState({productsInCart: filt});
      }
    }
  };

  attributeIsEqual(attr1, attr2) {
    return JSON.stringify(attr1) === JSON.stringify(attr2);
  }

  setProductsCart = (productId: string, attributes: {}, prices: Price[], countEl:number = 1) => {
    const product = this.state.productsInCart.find(
        (product) => product.productId === productId &&
          this.attributeIsEqual(product?.attributes, attributes),
    );
    const newProduct = {
      productId: productId,
      productCount: countEl,
      attributes: attributes,
      prices: prices,
    };
    if (!product) {
      this.setState({productsInCart: [...this.state.productsInCart, newProduct]});
    } else {
      newProduct.productCount = product.productCount + countEl;
      const newProducts = this.state.productsInCart.filter(
          (productCart) => productCart !== product,
      );
      newProducts.push(newProduct);
      this.setState({productsInCart: newProducts});
    }
  };

  setCurrency = (currency: string) => {
    this.setState({currency: currency});
  };
}

export default App;
