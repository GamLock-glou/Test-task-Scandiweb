import React, {Component} from 'react';
import {isShowTag} from '../../util';
import s from './Filter.module.css';
import {Tag} from './Tag';

interface TagsProps {
    tags: Record<string, any[]>,
    onClickDeleteTag: any,
}

export class Tags extends Component<TagsProps> {
  render() {
    const yesNo = ['yes', 'no'];
    return (
      <div className={s.Tags}>
        {
          isShowTag(this.props.tags) &&
          <div>
            <div>Tags:</div>
            <div className={s.BodyTags}>
              {Object.keys(this.props.tags).map((index)=>{
                return this.props.tags[index].map((tag)=>{
                  if (!yesNo.includes(tag.toLowerCase())) {
                    return <Tag
                      key={tag}
                      tag={tag}
                      index={index}
                      onClickDeleteTag={this.props.onClickDeleteTag}
                    />;
                  }
                  return null;
                });
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}
