import {Query} from '@apollo/react-components';
import React from 'react';
import {GET_ONE_CATEGORY} from '../../query/query';
import Product from './Product';
import PageNotFound from '../UI/PageNotFound';
import Loading from '../UI/Loading';
import {Filter} from '../Filter/Filter';
import {clearURLSearchParams, getTagsFromQueryParamsUrl, isTagAvailableAttribute} from '../../util';


interface ProductListProps {
  currency: string;
  categoryTitle: Record<string, unknown>;
  setProductsCart: any;
}

interface FilterState {
  tags: Record<string, any[]>,
}

export class ProductList extends React.Component<ProductListProps> {
  state: FilterState = {
    tags: {},
  };
  componentDidMount() {
    const newTags = getTagsFromQueryParamsUrl();
    this.setState({tags: newTags});
  }
  onSaveTag = (index: string, tag: string, count = 1) => {
    const newTags = {...this.state.tags};
    if (!newTags[index]) {
      newTags[index] = [tag];
    } else {
      newTags[index] = [...newTags[index], tag];
    }
    this.setState({tags: newTags});
    const url = new URL(document.location.href);
    url.searchParams.set(`${index}+${tag}`, tag);
    history.pushState( '', index, url.href);
  };
  onDeleteTag = (index: string, tag: string, count = 1) => {
    const newTags = this.state.tags[index].filter((tagEl)=>tagEl !== tag);
    this.setState(
        {tags: {...this.state.tags, [index]: newTags}},
    );
    const url = new URL(document.location.href);
    url.searchParams.delete(`${index}+${tag}`);
    history.pushState( '', index, url.href);
  };
  onDeleteAllTags = () => {
    clearURLSearchParams(this.state.tags);
    this.setState({tags: {}});
  };
  render() {
    const {currency, categoryTitle, setProductsCart} = this.props;
    return (
      <Query
        query={GET_ONE_CATEGORY}
        fetchPolicy='no-cache'
        variables={{input: {title: categoryTitle}}}
      >
        {({data, loading}) => {
          if (loading || !data) {
            return <Loading />;
          }

          if (!data.category) {
            return <PageNotFound />;
          }

          const {name, products} = data.category;

          return (<div className="wrapper">
            <Filter
              onDeleteAllTags={this.onDeleteAllTags}
              tags={this.state.tags}
              onSaveTag={this.onSaveTag}
              onDeleteTag={this.onDeleteTag}
              name={name}
              products={products}/>
            <div className="body__header">
              <h1>{name}</h1>
            </div>
            <div className="productList">

              {products.map((product, key) => {
                if (isTagAvailableAttribute(product)) {
                  return <Product
                    key={key}
                    currency={currency}
                    product={product}
                    categoryTitle={categoryTitle}
                    setProductsCart={setProductsCart}
                  />;
                }
              })}
            </div>
          </div>);
        }}
      </Query>
    );
  }
}
