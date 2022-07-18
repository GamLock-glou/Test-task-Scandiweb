import React, {Component} from 'react';
import {Button} from '../UI/Button/Button';
import s from './Filter.module.css';

interface ButtonsFilterProps {
    onDeleteAllTags: () => void;
    onDeleteAllTagsAndCloseFilter: () => void;
}

export class ButtonsFilter extends Component<ButtonsFilterProps> {
  render() {
    const {onDeleteAllTags, onDeleteAllTagsAndCloseFilter} = this.props;
    return (
      <div className={s.ButtonsFilter}>
        <div
          className={s.ButtonClearClose}>
          <Button onClick={onDeleteAllTags}>Clear</Button>
        </div>
        <div
          className={s.ButtonClearClose}>
          <Button
            onClick={onDeleteAllTagsAndCloseFilter}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
}

