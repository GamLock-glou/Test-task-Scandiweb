import { Query } from '@apollo/react-components';
import React, { Component } from 'react';
import { GET_ONE_PRODUCT } from "../../query/query";
import { getPrice } from '../../util';
import Gallery from './Gallery/Gallery';

interface ProductItemProps {
    id: string,
    currency: string,
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
                        gallery,
                        description,
                        category,
                        prices,
                        brand } = data.product;

                    return <div className="wrapper">
                        <div className="productItem">
                            <Gallery 
                                gallery={gallery}
                                isAllImg={this.state.isAllImg}
                                onClickImg={this.onClickImg} 
                                onClickShowProduct={this.onClickShowProduct} 
                                indexImg={this.state.indexImg}
                            />
                            <div className="aboutTheProduct">
                                <div>{brand}</div>
                                <div>{name}</div>
                                <div>{getPrice(prices, this.props.currency)}</div>
                                <div>ADD TO CARD</div>
                                <div dangerouslySetInnerHTML={{__html: description}} />
                            </div>
                        </div>
                    </div>
                }}
            </Query>
        );
    }

    onClickImg = (index) => {
        this.setState({indexImg: index})
    }

    onClickShowProduct = () => {
        this.setState({isAllImg: !this.state.isAllImg})
    }
}
