import {Query} from '@apollo/react-components';
import React from 'react';
import {GET_ONE_CATEGORY} from '../../query/query';
import Product from './Product';
import PageNotFound from '../UI/PageNotFound';
import Loading from '../UI/Loading';


interface ProductListProps {
  currency: string;
  categoryTitle: Record<string, unknown>;
  setProductsCart: any;
}

export class ProductList extends React.Component<ProductListProps> {
  render() {
    const {currency, categoryTitle, setProductsCart} = this.props;
    return (
      <Query
        query={GET_ONE_CATEGORY}
        fetchPolicy='no-cache'
        variables={{input: {title: categoryTitle}}}
      >
        {({data, loading}) => {
          if (loading) {
            return <Loading />;
          }

          if (!data.category) {
            return <PageNotFound />;
          }

          const {name, products} = data.category;

          return (<div className="wrapper">

            <div className="body__header">
              <h1>{name}</h1>
            </div>
            <div className="productList">

              {products.map((product, key) => (
                <Product
                  key={key}
                  currency={currency}
                  product={product}
                  categoryTitle={categoryTitle}
                  setProductsCart={setProductsCart}
                />
              ))}
            </div>
          </div>);
        }}
      </Query>
    );
  }
}
