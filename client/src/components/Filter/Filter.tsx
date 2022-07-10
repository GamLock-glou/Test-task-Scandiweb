import React, {Component} from 'react';
import {getFilterAttributs} from '../../util';
import {ElementFilter} from './ElementFilter';
import s from './Filter.module.css';
import {Tags} from './Tags';

interface FilterProps {
  name: string,
  products: any,
};

interface FilterState {
  isClicked: boolean,
  tags: Record<string, any[]>,
  countTags: number,
}

export class Filter extends Component<FilterProps, FilterState> {
  state: FilterState = {
    isClicked: false,
    tags: {},
    countTags: 0,
  };
  onSaveTag = (index: string, tag: string, count = 1) => {
    const newTags = {...this.state.tags};
    if (!newTags[index]) {
      newTags[index] = [tag];
    } else {
      newTags[index] = [...newTags[index], tag];
    }
    this.setState({tags: newTags, countTags: this.state.countTags+count});
  };
  onClickFilter = () => {
    this.setState({isClicked: !this.state.isClicked});
  };
  onClickDeleteTag = (index: string, tag: string, count = 1) => {
    const newTags = this.state.tags[index].filter((tagEl)=>tagEl !== tag);
    this.setState(
        {tags: {...this.state.tags, [index]: newTags},
          countTags: this.state.countTags-count},
    );
  };
  render() {
    if (!this.state.isClicked) {
      return <div
        onClick={this.onClickFilter}
        className={s.FilterLogo}
      >
        Filter
      </div>;
    }
    const filterAttributs = getFilterAttributs(this.props.products);
    const keysFilterAttirbuts = Object.keys(filterAttributs);
    return (
      <div>
        <div
          onClick={this.onClickFilter}
          className={s.FilterLogoActive}
        >
          Filter
        </div>
        <div className={s.FilterItemsAndTags}>
          <div className={s.FilterItems}>
            {
              keysFilterAttirbuts.map((key) => {
                return <div key={key} className={s.FilterItem}>
                  <ElementFilter
                    filterAttributs={filterAttributs[key]}
                    nameSelector={key}
                    tags={this.state.tags}
                    onSaveTag={this.onSaveTag}
                    onClickDeleteTag={this.onClickDeleteTag}
                  />
                </div>;
              })
            }
          </div>
          <Tags
            tags={this.state.tags}
            countTags={this.state.countTags}
            onClickDeleteTag={this.onClickDeleteTag}
          />
        </div>
      </div>
    );
  }
}

