import React, {Component} from 'react';
import styled from 'styled-components';
import {AttributesFilterProps} from '../../../types';
import s from './BlockColor.module.css';

interface BlockColorProps extends AttributesFilterProps {
  onSaveTag: (index: string, tag:string) => void,
}

const ColorAttribute = styled.div`
  &:hover {
    transform: scale(1.1);
  }
  width: 30%;
  height: 25px;
  background: ${(props) => props.color || 'grey'};
  border: 1px solid #5ECE7B;
  margin-bottom: 0.2rem;
  margin-left: 0.1rem;
  cursor: pointer;
`;
export class BlockColor extends Component<BlockColorProps> {
  onClickColor = (index:string, tag:string) => {
    this.props.onSaveTag(index, tag);
  };
  render() {
    const {nameSelector: nameAttribute, optionSelector: massColor} = this.props;
    return <div className='NameAndOptionsFilterItem'>
      <div
        className="NameFilter"
      >
        {nameAttribute}
      </div>
      {
        (!!massColor.length) &&
        <div className={s.AttributeColor}>
          {
            massColor.map((color)=>{
              return <ColorAttribute
                onClick={()=>this.onClickColor(nameAttribute, color)}
                key={color}
                color={color}
              />;
            })
          }
        </div>
      }
    </div>;
  };
}

