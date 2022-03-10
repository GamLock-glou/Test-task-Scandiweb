import React, {Component} from 'react';
import cn from 'classnames/bind';
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
    return (
      <div
        className={cn('attributeItemProduct', {'attributeItemProduct_active': isActive})}
        style={{background: this.props.item.value}}
        onClick={this.onClick}
      >
        {
          !this.props.isColor ?
            this.props.item.value :
            <div
              className={cn('attributeItemColor', {'attributeItemColor_active': isActive})}
            >
              <div className='attributeItemColorName'>
                {isActive && '✔'}
              </div>
            </div>
        }
      </div>
    );
  }

  onClick = () => {
    this.props.onClickAttribute(this.props.item.value);
  };
}
