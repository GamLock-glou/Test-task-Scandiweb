import React, { Component } from 'react';
import { AttributeSet } from '../../../../types';
import { Attribute } from './Attribute';

interface AttributesProps{
    attributes: AttributeSet[];
}

function getAttributes(attributes : AttributeSet[]) {
  
    return attributes.reduce((prev, now) => {
      const attr = prev;
      attr[now.id] = now.items[0].value;
      return attr;
    }, {});
  }


//   constructor(props) {
//     super(props)
//     this.state = getAttributes(props.attributes)
// }

export class Attributes extends Component<AttributesProps> {

    state = {
        attributes: []
    }

    componentDidMount() {
        this.setDefaultAttributes()
    }

    render() {
        const {attributes} = this.props;
        return (
            <div className="attributesProduct">
                {this.state.attributes.length  && attributes.map((attribute, key) => {
                    return <Attribute attribute={attribute} defaultValue={this.state.attributes[key]} key={key}/>
                })}
            </div>
        );
    }

    setDefaultAttributes() {
        const attributes = this.props.attributes.map((attribute) => {
            const info = { id: attribute.id, value: attribute.items[0].value }
            return info
        })
        this.setState({attributes: attributes})
    }

    onClickAttributeItem() {
        this.setState({attributes: [...this.state.attributes, ]});
    }
} 