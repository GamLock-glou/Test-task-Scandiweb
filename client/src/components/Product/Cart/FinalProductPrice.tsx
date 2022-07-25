import React, {Component} from 'react';
import {getProductsCount, getTax21procent, getTotal} from '../../../util';
import {Button} from '../../UI/Button/Button';
import s from './Cart.module.css';

interface FinalProductPriceProps {
  currency: string,
  products: any;
}

export class FinalProductPrice extends Component<FinalProductPriceProps> {
  render() {
    const total = getTotal(this.props.products, this.props.currency);
    const quantity = getProductsCount(this.props.products);
    const tax21procent = !!total ? getTax21procent(total) : '0';
    return (
      <div className={s.finalPrice}>
        <hr className={s.lineCart} />
        <table>
          <tbody>
            <tr>
              <td>Tax 21%:</td>
              <td className={s.attributePrice}>{tax21procent}</td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td className={s.attributePrice}>{quantity}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td className={s.attributePrice}>{total}</td>
            </tr>
          </tbody>
        </table>
        <Button
          onClick={()=>alert('Alas, but you have no money')}
          color={'#5ECE7B'}
        >
          ORDER
        </Button>
      </div>
    );
  }
}
