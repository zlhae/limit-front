import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';

const Product = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <ProductContainer>
            <ThumbBox>
                <img src='images/test01.png' alt='Product Thumbnail' />
            </ThumbBox>
            <div className='info_box'>
                <BrandBookmark>
                    <Brand>
                        <h1>Asics</h1>
                    </Brand>
                    <BookmarkWrapper>
                        <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                    </BookmarkWrapper>
                </BrandBookmark>
                <Name>
                    <h2>Asics Unlimited Gel-Kayano 14 Carrier Grey Black</h2>
                </Name>
                <Tag>
                    <TagText>택배</TagText>
                    <TagText>직거래</TagText>
                </Tag>
                <Price>
                    <h3>310,000원</h3>
                </Price>
            </div>
        </ProductContainer>
    );
}

const ProductContainer = styled.div`
    width: 100%;
    max-width: 200px;
    height: auto;
`;

const ThumbBox = styled.div`
    img {
        width: 100%;
        height: auto;
        border-radius:10px;
    }
`;

const BrandBookmark = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Brand = styled.div`
    h1 {
        font-size: 17px;
    }
`;

const BookmarkWrapper = styled.span`
    display: flex;
    align-items: center;
`;

const Name = styled.div`
    h2 {
        font-size: 15px;
        font-weight: 50;
        width: 100%;
        margin-top: -10px;
    }
`;

const Tag = styled.div`
    display: inline-block;
`;

const TagText = styled.span`
    background-color: #d9d9d9;
    padding: 5px 10px;
    font-size: 13px;

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const Price = styled.div`
    h3 {
        font-size: 16px;
    }
`;

export default Product;
