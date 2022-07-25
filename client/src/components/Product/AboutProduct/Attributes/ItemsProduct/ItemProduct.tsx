import React, {Component} from 'react';
import cn from 'classnames/bind';
import s from '../../../Cart/Cart.module.css';
import {Attribute} from '../../../../../types';

interface ItemProductProps {
  item: Attribute;
  index: number;
  defaultValue: string;
  onClickAttribute: any;
  isColor: boolean;
}

export class ItemProduct extends Component<ItemProductProps> {
  render() {
    const isActive = this.props.defaultValue === this.props.item.value;
    if (this.props.isColor) {
      return <div
        onClick={this.onClick}
        className={cn(s.colorAttribute, {[s.colorAttributeActive]: isActive})}>
        <div
          style={{background: this.props.item.value}}
          className={s.blockColor}
        />
      </div>;
    }
    return (
      <div
        className={cn('attributeItemProduct', {'attributeItemProduct_active': isActive})}
        onClick={this.onClick}
      >
        {this.props.item.value}
      </div>
    );
  }

  onClick = () => {
    this.props.onClickAttribute(this.props.item.value);
  };
}
