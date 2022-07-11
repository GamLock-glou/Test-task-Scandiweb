import React, {Component} from 'react';

interface CheckButtonProps {
    attibute: string,
    onSaveDeleteTag: (name:string, checked: boolean) => void,
    optionSelector: string[]
}

export class CheckButton extends Component<CheckButtonProps> {
  onHandleInputChange = (e) => {
    const {name, checked} = e.target;
    this.props.onSaveDeleteTag(name, checked);
  };
  render() {
    const isChecked = !this.props.optionSelector.includes(this.props.attibute);
    return (
      <div>
        <input
          type="checkbox"
          name={this.props.attibute}
          onChange={this.onHandleInputChange}
          checked={isChecked}
        />
        <label>{this.props.attibute}</label>
      </div>
    );
  }
}
