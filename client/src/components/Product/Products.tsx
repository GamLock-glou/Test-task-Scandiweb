import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ProductItem} from './ProductItem';
import {ProductList} from './ProductList';
import {Model} from '../UI/Model';
import {BagItems} from './MyBag/BagItems';
import {Cart} from './Cart/Cart';

interface ProductsProps {
    currency: string;
    setProductsCart: any;
    setVisible: any;
    visible: boolean
    addProductCount: any
    changeAttribute:any
}


export class Products extends Component<ProductsProps> {
  render() {
    const {
      currency,
      changeAttribute,
      setProductsCart, setVisible, visible, addProductCount,
    } = this.props;

    return (
      <div>
        <Switch>
          <Route
            path="/:category/:id"
            render={({match}) => (
              <ProductItem
                setProductsCart={setProductsCart}
                currency={currency}
                id={match.params.id}
              />
            )}
          />
          <Route
            exact path="/cart"
            render={() => <Cart
              currency={currency}
              addProductCount={addProductCount}
              changeAttribute={changeAttribute}
            />}
          />
          <Route
            path="/:category"
            render={({match}) => (
              <ProductList
                currency={currency}
                categoryTitle={match.params.category}
                setProductsCart={setProductsCart}
              />
            )}
          />
          <Route
            exact path="/" render={() => <Redirect to="/all" />}
          />
        </Switch>
        <Model
          visible={visible}
          setVisible={setVisible}
        >
          <BagItems
            addProductCount={addProductCount}
            setVisible={setVisible}
            currency={currency}
          />
        </Model>
      </div>
    );
  }
}
