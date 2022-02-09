import React, { Component } from 'react';


interface ProductItemProps {
    isAllImg: boolean,
    indexImg: number,
    gallery: [],
    onClickImg: any,
    onClickShowProduct: any
}

class Gallery extends Component<ProductItemProps> {
    render() {
        const {gallery, isAllImg, onClickImg, onClickShowProduct, indexImg} = this.props;
        return (
            <div className="galleryItem">
                <div className="galleryImgList">
                    {gallery.map((g, index) => {
                        if (isAllImg)
                            return <img key={index} onClick={() => onClickImg(index)} src={g} />
                        return index < 3 ? <img onClick={() => onClickImg(index)} key={index} src={g} /> : null
                    })}
                    <div className="buttonShowGallery" onClick={onClickShowProduct}>
                        {!isAllImg ? <div>More</div> : <div>Hide</div>}
                    </div>
                </div>
                <div className="galleryMainImg"><img src={gallery[indexImg]} /></div>
            </div>
        );
    }
}

export default Gallery;