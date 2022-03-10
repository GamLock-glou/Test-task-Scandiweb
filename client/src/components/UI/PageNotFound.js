import React, {Component} from 'react';
import s from './Model.module.css';

class PageNotFound extends Component {
  render() {
    return (
      <div className={s.error}>
        Page not found
      </div>
    );
  }
}

export default PageNotFound;
