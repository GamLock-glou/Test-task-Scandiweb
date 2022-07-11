import React, {Component} from 'react';
import {AttributesFilterProps} from '../../../types';
// import s from './CheckBox.module.css';
import {CheckButton} from './CheckButton/CheckButton';

interface CheckBoxProps extends AttributesFilterProps {
  onSaveTag: (index: string, tag:string, count: number) => void,
  onClickDeleteTag: (index: string, tag: string, count: number) => void,
  attibutes: string[];
}

interface CheckBoxState {
  isClicked: boolean,
}

export class CheckBox extends Component<CheckBoxProps> {
  state: CheckBoxState = {
    isClicked: false,
  };
  onHandleClick = () => {
    this.setState({isClicked: !this.state.isClicked});
  };
  onSaveDeleteTag = (name: string, checked: boolean) => {
    if (!checked) {
      this.props.onClickDeleteTag(this.props.nameSelector, name, 0);
      return;
    }
    this.props.onSaveTag(this.props.nameSelector, name, 0);
  };
  render() {
    const {nameSelector, optionSelector, attibutes} = this.props;
    return (
      <div className='NameAndOptionsFilterItem'>
        <fieldset>
          <legend
            onClick={this.onHandleClick}
            className='NameFilter'
          >
            {nameSelector}:
          </legend>
          {this.state.isClicked && attibutes.map((attibute) => {
            return <CheckButton
              key={attibute}
              optionSelector={optionSelector}
              attibute={attibute}
              onSaveDeleteTag={this.onSaveDeleteTag}
            />;
          })}
        </fieldset>
      </div>
    );
  }
}
