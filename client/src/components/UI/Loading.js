import React, {Component} from 'react';
import s from './Model.module.css';

class Loading extends Component {
  render() {
    return (
      <div className={s.myLoading}>
        Loading...
      </div>
    );
  }
}

export default Loading;
