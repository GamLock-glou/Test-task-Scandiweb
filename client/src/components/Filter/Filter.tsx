import React, {Component} from 'react';
import {getFilterAttributs, isShowFilter} from '../../util';
import {ButtonsFilter} from './ButtonsFilter';
import {ElementFilter} from './ElementFilter';
import s from './Filter.module.css';
import {Tags} from './Tags';

interface FilterProps {
  name: string,
  products: any,
  tags: Record<string, any[]>,
  onDeleteTag: (index: string, tag: string) => void,
  onSaveTag: (index: string, tag: string) => void,
  onDeleteAllTags: () => void;
};

interface FilterState {
  isClicked: boolean,
}

export class Filter extends Component<FilterProps, FilterState> {
  state: FilterState = {
    isClicked: false,
  };
  componentDidMount() {
    if (isShowFilter(this.props.tags)) {
      this.setState({isClicked: true});
    }
  }
  onClickFilter = () => {
    this.setState({isClicked: !this.state.isClicked});
  };
  onDeleteAllTagsAndCloseFilter = () => {
    this.setState({isClicked: false});
    this.props.onDeleteAllTags();
  };
  render() {
    const {tags, onDeleteTag, onSaveTag, onDeleteAllTags} = this.props;
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
                    tags={tags}
                    onSaveTag={onSaveTag}
                    onClickDeleteTag={onDeleteTag}
                  />
                </div>;
              })
            }
          </div>
          <hr className={s.lineCart}/>
          <Tags
            tags={tags}
            onClickDeleteTag={onDeleteTag}
          />
          <ButtonsFilter
            onDeleteAllTags={onDeleteAllTags}
            onDeleteAllTagsAndCloseFilter={this.onDeleteAllTagsAndCloseFilter}
          />
        </div>
      </div>
    );
  }
}

