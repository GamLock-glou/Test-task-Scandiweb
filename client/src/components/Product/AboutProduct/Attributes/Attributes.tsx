import React, {Component} from 'react';
import {AttributeSet} from '../../../../types';
import {Attribute} from './Attribute';

interface AttributesProps{
    attributes: AttributeSet[];
    onClickAttribute: any
    defaultValue: any;
}


export class Attributes extends Component<AttributesProps> {
  render() {
    const {attributes, defaultValue, onClickAttribute} = this.props;
    return (
      <div className="attributesProduct">
        {attributes.map((attribute, key) => {
          return <Attribute
            onClickAttribute={onClickAttribute}
            attribute={attribute}
            defaultValue={defaultValue.attributes[attribute.id]}
            key={key}/>;
        })}
      </div>
    );
  }
}
