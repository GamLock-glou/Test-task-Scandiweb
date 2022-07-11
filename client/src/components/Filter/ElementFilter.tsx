import React, {Component} from 'react';
import {BlockColor} from '../UI/BlockColor/BlockColor';
import {CheckBox} from '../UI/CheckBox/CheckBox';
import {Select} from '../UI/Select/Select';

interface ElementsFilterProps {
  filterAttributs: any,
  nameSelector: any,
  tags: Record<string, any[]>,
  onSaveTag: (index: string, tag: string) => void,
  onClickDeleteTag: (index: string, tag: string) => void,
}

export class ElementFilter extends Component<ElementsFilterProps> {
  render() {
    const yesNo = ['yes', 'no'];
    const {filterAttributs, nameSelector, tags, onSaveTag, onClickDeleteTag} = this.props;
    // TODO: The let directive. Edit on const directive.
    let optionSelector = [...filterAttributs];
    if (tags[nameSelector]) {
      tags[nameSelector].forEach((tag)=>{
        optionSelector = optionSelector.filter((option) => option !== tag);
      });
    }
    if (yesNo.includes(filterAttributs[0].toLowerCase())) {
      return <CheckBox
        nameSelector={nameSelector}
        optionSelector={filterAttributs}
        onSaveTag={onSaveTag}
        onClickDeleteTag={onClickDeleteTag}
      />;
    }
    if (nameSelector.toLowerCase() === 'color') {
      return <BlockColor
        nameSelector={nameSelector}
        onSaveTag={onSaveTag}
        optionSelector={optionSelector}
      />;
    }
    return <Select
      nameSelector={nameSelector}
      optionSelector={optionSelector}
      onSaveTag={onSaveTag}
    />;
  }
}
