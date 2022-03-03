import {Query} from '@apollo/react-components';
import React, {Component} from 'react';
import {GET_ONE_PRODUCT} from '../../query/query';
import {AboutProduct} from './AboutProduct/AboutProduct';
import Gallery from './Gallery/Gallery';
import PageNotFound from '../UI/PageNotFound';
import Loading from '../UI/Loading';


interface ProductItemProps {
    id: string | null,
    currency: string,
    setProductsCart: any
}

interface ProductItemState {
    isAllImg: boolean,
    indexImg: number,
}

export class ProductItem extends Component<ProductItemProps, ProductItemState> {
  state: ProductItemState = {
    isAllImg: false,
    indexImg: 0,
  };

  render() {
    const
      {
        id,
        currency,
        setProductsCart,
      } = this.props;
    return (
      <Query
        fetchPolicy='no-cache'
        query={GET_ONE_PRODUCT}
        variables={{id: id}}
      >
        {({data, loading}) => {
          if (loading) {
            return <Loading />;
          }

          if (!data.product) {
            return <PageNotFound />;
          }

          const {
            id,
            name,
            inStock,
            gallery,
            description,
            attributes,
            prices,
            brand} = data.product;
          return <div className="wrapper">
            <div className="productItem">
              <Gallery
                gallery={gallery}
                isAllImg={this.state.isAllImg}
                onClickImg={this.onClickImg}
                onClickShowProduct={this.onClickShowProduct}
                indexImg={this.state.indexImg}
                inStock={inStock}
              />
              <AboutProduct
                setProductsCart={setProductsCart}
                name={name}
                description={description}
                attributes={attributes}
                prices={prices}
                brand={brand}
                id={id}
                currency={currency}
                inStock={inStock}
              />
            </div>
          </div>;
        }}
      </Query>
    );
  }

  onClickImg = (index) => {
    this.setState({indexImg: index});
    this.setState({isAllImg: false});
  };

  onClickShowProduct = () => {
    this.setState({isAllImg: !this.state.isAllImg});
  };
}
