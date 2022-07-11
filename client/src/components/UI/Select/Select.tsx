import React, {Component} from 'react';
import {AttributesFilterProps} from '../../../types';
import s from './Select.module.css';

interface SelectProps extends AttributesFilterProps {
  onSaveTag: (index: string, tag:string) => void,
}

export class Select extends Component<SelectProps> {
  onHandleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onSaveTag(this.props.nameSelector, e.target.value);
  };
  render() {
    const {nameSelector, optionSelector} = this.props;
    return (
      <div
        className="NameAndOptionsFilterItem"
      >
        <div
          className="NameFilter"
        >
          {nameSelector}
        </div>
        {
          (!!optionSelector.length) && <div>
            <select
              multiple={true}
              onChange={this.onHandleClick}
              className={s.SelectStyle}
            >
              {
                optionSelector.map((option) => <option
                  key={option}
                >
                  {option}
                </option>)
              }
            </select>
          </div>
        }
      </div>
    );
  }
}
