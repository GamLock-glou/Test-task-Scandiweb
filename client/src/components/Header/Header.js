import React, { Component } from 'react';
import { NavBar } from './Navbar/NavBar';
import { Logo } from "./../Logo";
import CurrencySwitcher from "./CurrencySwitcher";

export class Header extends Component {

    render() {
        const { setPathName, pathName, setCurrency } = this.props;
        return (
            <div className="wrapper">
                <div className="header__wrapper">
                    <NavBar
                        pathName={pathName}
                        setPathName={setPathName}
                    />
                    <div className="header__logo">
                        <Logo />
                    </div>
                    <div className="header__select">
                        <CurrencySwitcher setCurrency={setCurrency} />
                    </div>
                </div>
            </div>
        );
    }
}