import { Query } from '@apollo/react-components';
import React, { Component } from 'react';
import { GET_ONE_PRODUCT } from "../../query/query";
import { getPrice } from '../../util';
import { AboutProduct } from './AboutProduct/AboutProduct';
import Gallery from './Gallery/Gallery';

interface ProductItemProps {
    id: Record<string, unknown>,
    currency: string,
    setProductsCard: any
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
        const { id, currency, setProductsCard } = this.props;
        return (
            <Query fetchPolicy='no-cache' query={GET_ONE_PRODUCT} variables={{ id: id }}>
                {({ data, loading }) => {
                    if (loading)
                        return <div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>Loading...</div>

                    if (!data.product)
                        return <div style={{ display: "flex", justifyContent: "center", fontSize: "20px", color: "red" }}>Page not found</div>

                    const {
                        id,
                        name,
                        gallery,
                        description,
                        attributes,
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
                            <AboutProduct 
                                setProductsCard={setProductsCard}
                                name={name}
                                description={description}
                                attributes={attributes}
                                prices={prices}
                                brand={brand}
                                id={id}
                                currency={currency}
                            />
                        </div>
                    </div>
                }}
            </Query>
        );
    }

    onClickImg = (index) => {
        this.setState({indexImg: index})
        this.setState({isAllImg: false})
    }

    onClickShowProduct = () => {
        this.setState({isAllImg: !this.state.isAllImg})
    }
}
