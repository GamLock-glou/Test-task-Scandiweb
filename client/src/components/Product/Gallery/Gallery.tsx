import React, {Component} from 'react';


interface ProductItemProps {
    isAllImg: boolean,
    indexImg: number,
    gallery: [],
    onClickImg: any,
    onClickShowProduct: any
    inStock: boolean;
}

class Gallery extends Component<ProductItemProps> {
  render() {
    const
      {
        gallery,
        isAllImg,
        onClickImg,
        onClickShowProduct,
        indexImg,
        inStock,
      } = this.props;
    return (
      <div className="galleryItem">
        <div className="galleryImgList">
          {gallery.map((g, index) => {
            if (isAllImg) {
              return <img key={index} onClick={() => onClickImg(index)} src={g} />;
            }
            return index < 3 ? <img onClick={() => onClickImg(index)} key={index} src={g} /> : null;
          })}
          <div className="buttonShowGallery" onClick={onClickShowProduct}>
            {
              gallery.length > 3 ?
                !isAllImg ?
                  <div>More</div> :
                  <div>Hide</div> :
                null
            }
          </div>
        </div>
        <div className="galleryMainImg">
          <div className="container">
            <img src={gallery[indexImg]} />
            {!inStock ? <div className="text_block">OUT OF STOCK</div> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
