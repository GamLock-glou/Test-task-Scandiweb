import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ProductItem } from './ProductItem';
import { ProductList } from "./ProductList"
import {Model} from "../UI/Model"
import { BagItems } from './MyBag/BagItems';

interface ProductsProps {
    currency: string;
    setProductsCard:any;
    setVisible: any;
    visible: boolean
  }
 

export class Products extends Component<ProductsProps> {

    render() {
        const { currency, setProductsCard, setVisible, visible } = this.props;

        return (
            <div>
                <Switch>
                    <Route
                        path="/:category/:id"
                        render={({ match }) => (
                            <ProductItem setProductsCard={setProductsCard} currency={currency} id={match.params.id} />
                        )}
                    />                    
                    <Route
                        path="/:category"
                        render={({ match }) => (
                            <ProductList currency={currency} categoryTitle={match.params.category} />
                        )}
                    />
                    <Route
                        exact path="/" render={()=> <Redirect to="/all" />}
                    />
                </Switch>
                <Model visible={visible} setVisible={setVisible}>
                    <BagItems currency={currency} />
                </Model>
            </div>
        )
    }

}