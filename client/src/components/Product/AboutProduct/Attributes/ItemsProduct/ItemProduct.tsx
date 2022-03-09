import React, {Component} from 'react';
import cn from 'classnames/bind';

interface ItemProductProps {
  value: string;
  index: number;
  defaultValue: string;
  onClickAttribute: any;
  isColor: boolean;
}

export class ItemProduct extends Component<ItemProductProps> {
  render() {
    const isActive = this.props.defaultValue === this.props.value;
    return (
      <div
        className={cn('attributeItemProduct', {'attributeItemProduct_active': isActive})}
        style={{background: this.props.value}}
        onClick={this.onClick}
      >
        {
          !this.props.isColor ?
            this.props.value :
            <div
              className={cn('attributeItemColor', {'attributeItemColor_active': isActive})}

            />
        }
      </div>
    );
  }

  onClick = () => {
    this.props.onClickAttribute(this.props.value);
  };
}
