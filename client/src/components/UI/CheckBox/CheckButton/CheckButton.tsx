import React, {Component} from 'react';

interface CheckButtonProps {
    option: string,
    onSaveDeleteTag: (name:string, checked: boolean) => void,
}

export class CheckButton extends Component<CheckButtonProps> {
  onHandleInputChange = (e) => {
    const {name, checked} = e.target;
    this.props.onSaveDeleteTag(name, checked);
  };
  render() {
    return (
      <div>
        <input
          type="checkbox"
          name={this.props.option}
          onChange={this.onHandleInputChange}
        />
        <label>{this.props.option}</label>
      </div>
    );
  }
}
