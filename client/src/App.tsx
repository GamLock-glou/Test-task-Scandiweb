import "./App.css";
import React from "react";
import { Header } from "./components/Header/Header";
import { Products } from "./components/Product/Products";
import { Product } from "./types";

interface AppState {
  currency: string;
  pathName: string;
  productsInCard: Product[] | [];
}

class App extends React.Component<Record<string, never>, AppState> {
  pathname = window.location.pathname;
  state: AppState = {
    currency: "USD",
    pathName: this.pathname.substr(1),
    productsInCard: [],
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          {/* this can be component Header */}
          <Header
            pathName={this.state.pathName}
            setPathName={this.setPathName}
            setCurrency={this.setCurrency}
          />
        </div>
        <div className="body">
          {/* this can be component Body */}
          <Products
            setPathName={this.setPathName}
            categoryTitle={this.state.pathName}
            currency={this.state.currency}
            pathName={this.state.pathName}
          />
        </div>
      </div>
    );
  }

  setPathName = (name: string) => {
    if (this.state.pathName !== name) {
      this.setState({ pathName: name });
    }
  };

  setCurrency = (currency: string) => {
    this.setState({ currency: currency });
  };
}

export default App;
