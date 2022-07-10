import React, {Component} from 'react';
import {AttributesFilterProps} from '../../../types';
import s from './Select.module.css';

interface SelectState {
    isClicked: boolean,
}

interface SelectProps extends AttributesFilterProps {
  onSaveTag: (index: string, tag:string) => void,
}

export class Select extends Component<SelectProps> {
  state: SelectState = {
    isClicked: false,
  };
  onHandleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onSaveTag(this.props.nameSelector, e.target.value);
  };
  onSelectName = () => {
    this.setState({isClicked: !this.state.isClicked});
  };
  render() {
    const {nameSelector, optionSelector} = this.props;
    return (
      <div
        className="NameAndOptionsFilterItem"
      >
        <div
          onClick={this.onSelectName}
          className="NameFilter"
        >
          {nameSelector}
        </div>
        {
          this.state.isClicked && <div>
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
