import {Query} from '@apollo/react-components';
import React from 'react';
import {GET_ALL_CURRENCIES} from '../../query/query';

class CurrencySwitcher extends React.Component {
  state={
    currency: '$',
    isActive: false,
  };

  render() {
    const classNameList = this.props.isCurrencySwicherActive && 'select__list_active';
    const classNameSelect = !this.props.isCurrencySwicherActive ? 'select__head' : 'select__head__active';
    return (
      <Query query={GET_ALL_CURRENCIES}>
        {({data}) => {
          if (!data) return null;

          const {currencies} = data;

          return (
            <div className="select">
              <div
                className={classNameSelect}
                onClick={this.onClickSelect}
              >
                {this.state.currency}
              </div>
              <ul className={`select__list ${classNameList}`}>
                {
                  currencies.map((currency, key) => {
                    return <li onClick={() => this.onClickItem(currency)} key={key}>
                      {currency.symbol} {currency.label}
                    </li>;
                  })
                }
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
  onClickItem = (currency) => {
    this.setState({currency: currency.symbol});
    this.props.onClickCurrencySwitcher(false, currency.label);
  };

  onClickSelect=(currency)=> {
    this.props.onClickCurrencySwitcher(!this.props.isCurrencySwicherActive);
  };
}

export default CurrencySwitcher;
