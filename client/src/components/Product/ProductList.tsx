import { Query } from "@apollo/react-components";
import React from "react";
import { GET_ONE_CATEGORY } from "../../query/query";
import Product from "./Product";

interface ProductListProps {
  currency: string;
  categoryTitle: Record<string, unknown>;
  
}

export class ProductList extends React.Component<ProductListProps> {
  
  render() {
    const { currency, categoryTitle } = this.props;
    return (
      <Query query={GET_ONE_CATEGORY} variables={{input: { title: categoryTitle }}}>
        {({ data, loading }) => {

          if(loading) 
            return <div style={{display:"flex", justifyContent: "center", fontSize: "20px"}}>Loading...</div>

          if(!data.category)
            return <div style={{display:"flex", justifyContent: "center", fontSize: "20px", color: "red"}}>Page not found</div>

          const { name, products } = data.category

          return (<div className="wrapper">

            <div className="body__header">
              <h1>{name}</h1>
            </div>
            <div className="productList">
              
                  {products.map((product, key) => (
                    <Product key={key} currency={currency} product={product} categoryTitle={categoryTitle} />
                  ))}
            </div>
          </div>);
        }}
      </Query>
    );
  }
}
