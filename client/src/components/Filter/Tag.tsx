import React, {Component} from 'react';
import s from './Filter.module.css';
import styled from 'styled-components';


interface TagProps {
    index: string,
    tag: string,
    onClickDeleteTag: (index: string, tag:string) => void,
}

const TagStyle = styled.div`
  display: flex;
  background-color: #aaa9a9;
  align-items: center;
  background: ${(props) => props.tag || 'grey'};
  border-radius: 10%;
  padding: 0rem 1rem 0rem;
  margin-right: 1rem;
  margin-bottom: 0.2rem;
`;

const TextTagStyle = styled.div`
  color: ${(props)=> props.tag};
`;

export class Tag extends Component<TagProps> {
  render() {
    const {tag, onClickDeleteTag, index} = this.props;
    return <TagStyle
      tag={tag}
      className={s.BodyTag}
    >
      {index !== 'Color' && <TextTagStyle tag={tag}>{tag}</TextTagStyle>}
      <div
        className={s.DeleteTag}
        onClick={()=>onClickDeleteTag(index, tag)}
      >
      ✖
      </div>
    </TagStyle>;
  }
}
