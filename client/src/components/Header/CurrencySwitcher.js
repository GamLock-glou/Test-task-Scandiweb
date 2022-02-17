import { Query } from "@apollo/react-components";
import React from "react";
import { GET_ALL_CURRENCIES } from "../../query/query";

class CurrencySwitcher extends React.Component {

  state={
    currency: "$",
    isActive: false
  }

  render() {
    const classNameList = !this.state.isActive ? { display: "none" } : { display: "block" };
    const classNameSelect = !this.state.isActive ? "select__head" : "select__head__active";
    return (
      <Query query={GET_ALL_CURRENCIES}>
        {({ data }) => {
          if (!data) return null;

          const { currencies } = data;

          return (
            <div className="select">
              <div 
                className={classNameSelect}
           
                onClick={this.onClickSelect}
              >
                {this.state.currency}
              </div>
              <ul className="select__list" style={classNameList}>
                {
                  currencies.map((currency, key) => {
                    return <li onClick={() => this.onClickItem(currency)} key={key}>
                      {currency.symbol} {currency.label}
                    </li>
                  })
                }
              </ul>
            </div>
          )
        }}
      </Query>
    );
  }
    onClickItem(currency) {
      this.props.setCurrency(currency.label);
      this.setState({currency: currency.symbol})
      this.setState({isActive: false})
    }
  
    onClickSelect=()=> {
      this.setState({isActive: !this.state.isActive})
    }
}

export default CurrencySwitcher;
