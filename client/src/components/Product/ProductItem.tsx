import { Query } from '@apollo/react-components';
import React, { Component } from 'react';
import { GET_ONE_PRODUCT } from "../../query/query";

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
                        <div className="productItem">
                            <div className="productImgList">
                                {gallery.map((g, index) => {
                                    if (this.state.isAllImg)
                                        return <img key={index} onClick={()=>this.onClickImg(index)} src={g} />
                                    return index < 3 ? <img onClick={() => this.onClickImg(index)} key={index} src={g} /> : null
                                })}
                                <div className="buttonShowProduct" onClick={this.onClickShowProduct}>
                                    {!this.state.isAllImg ? <div>Show</div> : <div>Hide</div>}
                                </div>
                            </div>
                            <div className="productMainImg"><img src={gallery[this.state.indexImg]} /></div>
                        </div>
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
