import React, { Component } from 'react';
import { NavBar } from './Navbar/NavBar';
import { Logo } from "./../Logo";
import CurrencySwitcher from "./CurrencySwitcher";
import { MyBag } from './Bag/MyBag';

export class Header extends Component {


    render() {
        const { setCurrency, visible, setVisible } = this.props;
        return (
            <div className="wrapper">
                <div className="header__wrapper">
                    <NavBar />
                    <div className="header__logo">
                        <Logo />
                    </div>
                    <div className="header__select">
                        <CurrencySwitcher setCurrency={setCurrency} />
                    </div>
                    <MyBag setVisible={setVisible} visible={visible}/>
                </div>
            </div>
        );
    }

}