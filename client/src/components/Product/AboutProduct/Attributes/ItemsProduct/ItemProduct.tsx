import React, { Component } from 'react';

interface ItemProductProps {
    value: string;
    index: number;
    defaultValue: string;
    onClickAttribute:any;
}

export class ItemProduct extends Component<ItemProductProps> {

    render() {
        const className = this.props.defaultValue === this.props.value ?
        "attributeItemProduct attributeItemProduct_active" : "attributeItemProduct";
        return (
            // shit code
            <div
                style={{ background: `${this.props.value}` }}
                className={className}
                onClick={this.onClick}
            >
                {this.props.value[0] !== "#" && this.props.value}
            </div>

        );
    }

    onClick = () => {
        this.props.onClickAttribute(this.props.value)
    }
}