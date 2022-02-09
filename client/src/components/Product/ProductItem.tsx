import { Query } from '@apollo/react-components';
import React, { Component } from 'react';
import { GET_ONE_PRODUCT } from "../../query/query";
import Gallery from './Gallery/Gallery';

interface ProductItemProps {
    id: string;
}

interface ProductItemState {
    isAllImg: boolean,
    indexImg: number,
}

export class ProductItem extends Component<ProductItemProps, ProductItemState> {

    state: ProductItemState = {
        isAllImg: false,
        indexImg: 0,
    }

    render() {
        const { id } = this.props;
        return (
            <Query query={GET_ONE_PRODUCT} variables={{ id: id }}>
                {({ data, loading }) => {
                    if (loading)
                        return <div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>Loading...</div>

                    if (!data.product)
                        return <div style={{ display: "flex", justifyContent: "center", fontSize: "20px", color: "red" }}>Page not found</div>

                    const {
                        name,
                        inStock,
                        gallery,
                        description,
                        category } = data.product;

                    return <div className="wrapper">
                            <Gallery 
                                gallery={gallery}
                                isAllImg={this.state.isAllImg}
                                onClickImg={this.onClickImg} 
                                onClickShowProduct={this.onClickShowProduct} 
                                indexImg={this.state.indexImg}
                            />
                    </div>
                }}
            </Query>
        );
    }

    onClickImg(index) {
        this.setState({indexImg: index})
    }

    onClickShowProduct = () => {
        this.setState({isAllImg: !this.state.isAllImg})
    }
}
