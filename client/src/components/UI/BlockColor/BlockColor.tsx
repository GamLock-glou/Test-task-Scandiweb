import React, {Component} from 'react';
import styled from 'styled-components';
import {AttributesFilterProps} from '../../../types';
import s from './BlockColor.module.css';

interface BlockColorProps extends AttributesFilterProps {
  onSaveTag: (index: string, tag:string) => void,
}

interface BlockColorState {
  isClicked: boolean,
}

const ColorAttribute = styled.div`
  &:hover {
    transform: scale(1.1);
  }
  width: 30%;
  height: 25px;
  background: ${(props) => props.color || 'grey'};
  border: none;
  border-radius: 3px;
  margin-bottom: 0.1rem;
  cursor: pointer;
}
`;
export class BlockColor extends Component<BlockColorProps> {
  state: BlockColorState = {
    isClicked: false,
  };
  onClickColor = (index:string, tag:string) => {
    this.props.onSaveTag(index, tag);
  };
  onHandleClick = () => {
    this.setState({isClicked: !this.state.isClicked});
  };
  render() {
    const {nameSelector: nameAttribute, optionSelector: massColor} = this.props;
    return <div className='NameAndOptionsFilterItem'>
      <div
        className="NameFilter"
        onClick={this.onHandleClick}
      >
        {nameAttribute}
      </div>
      {
        this.state.isClicked &&
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

