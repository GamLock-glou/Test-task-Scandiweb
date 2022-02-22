import React, { Component } from 'react';
import s from './Model.module.css'

export class Model extends Component {
    render() {
        const { visible, children } = this.props;
        const myModel = [s.myModel];
        const myModelContent = [s.myModelContent]
        if (visible) {
            myModel.push(s.active);
            myModelContent.push(s.active)
        }
        return (
            <div>
                <div className={myModel.join(' ')} onClick={this.onClick} />
                <div className={myModelContent.join(' ')} onClick={e => e.stopPropagation()}>
                    {!visible ? null : children}
                </div>
            </div>
        );
    }
    onClick = () => {
        this.props.setVisible(false)
    }
}