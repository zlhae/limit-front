import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import { useNavigate } from 'react-router-dom';
import test1 from '../Images/1.webp';

const images = [
    { src: test1, type: 'parcel' },
    { src: test1, type: 'direct' },
    { src: test1, type: 'parcel' },
    { src: test1, type: 'direct' },
    { src: test1, type: 'parcel' },
    { src: test1, type: 'direct' },
    { src: test1, type: 'parcel' },
    { src: test1, type: 'direct' },
    { src: test1, type: 'parcel' },
    { src: test1, type: 'direct' },
    { src: test1, type: 'direct' },   
];

const SameProduct = ({ image, index }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <ProductContainer>
            <ThumbBox>
                <BookmarkWrapper>
                    <BookmarkIcon filled={isBookmarked} onClick={handleBookmarkClick} />
                </BookmarkWrapper>
                <img src={image.src} alt={`Product Thumbnail ${index}`} />
            </ThumbBox>
            <InfoBox>
                <BrandBookmark>
                    <Brand>
                        <h1>Asics</h1>
                    </Brand>
                </BrandBookmark>
                <Name>
                    <h2>Asics Unlimited Gel-Kayano 14 Carrier Grey Black</h2>
                </Name>
                <KoreaName>
                    <h3>아식스 언리미티드 젤 카야노 14 캐리어 그레이 블랙</h3>
                </KoreaName>
                <Tag>
                    <TagText>택배</TagText>
                    <TagText>직거래</TagText>
                </Tag>
                <Price>
                    <h3>310,000원</h3>
                </Price>
            </InfoBox>
        </ProductContainer>
    );
};

const SameProductListWrap = ({ showAll, showNearby }) => {
    const navigate = useNavigate();
    const [visibleProducts, setVisibleProducts] = useState(5);

    const handleLoadMoreClick = () => {
        navigate('/moreproduct');
    };

    const filteredImages = showNearby ? images.filter(image => image.type === 'direct') : images;

    return (
        <ProductListWrap>
            <ProductListContainer>
                <ProductGroup>
                    {filteredImages.slice(0, showAll ? filteredImages.length : visibleProducts).map((image, index) => (
                        <SameProduct key={index} image={image} index={index} />
                    ))}
                </ProductGroup>
            </ProductListContainer>
            {!showAll && visibleProducts < filteredImages.length && (
                <LoadMoreButton onClick={handleLoadMoreClick}>더 보기</LoadMoreButton>
            )}
        </ProductListWrap>
    );
};

const ProductListWrap = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow-x: auto;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const ProductListContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 600px) {
        width: 100%;
        margin: 0 auto;
    }
`;

const ProductGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    width: 100%;
    @media (max-width: 600px) {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
    }
`;

const ProductContainer = styled.div`
    min-width: 200px;
    width: 100%;
`;

const ThumbBox = styled.div`
    position: relative;

    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        background-color: rgba(114, 184, 223, 0.15); /* 파란 계열의 배경색과 투명도 설정 */
    }
`;

const BookmarkWrapper = styled.span`
    position: absolute;
    bottom: 7px;
    right: 10px;
`;

const InfoBox = styled.div`
    margin-top: 10px;
`;

const BrandBookmark = styled.div`
    justify-content: space-between;
    padding: 0;
`;

const Brand = styled.div`
    h1 {
        font-size: 15px;
        font-weight: bold;
        margin-top: -10px;

        @media (max-width: 600px) {
            font-size: 14px;
        }
    }
`;

const Name = styled.div`
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin-top: -10px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;

        @media (max-width: 600px) {
            font-size: 12px;
        }
    }
`;

const KoreaName = styled.div`
    h3 {
        font-size: 12px;
        font-weight: lighter;
        margin-top: -10px;
        color: #6D6D6D;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media (max-width: 600px) {
            font-size: 11px;
        }
    }
`;

const Tag = styled.div`
    display: flex;
    margin-top: -5px;
`;

const TagText = styled.span`
    background-color: #ededed;
    padding: 4px 8px;
    font-size: 12px;
    margin-right: 5px;
`;

const Price = styled.div`
    h3 {
        font-size: 15px;
        margin-top: 8px;

        @media (max-width: 600px) {
            font-size: 14px;
        }
    }
`;

const LoadMoreButton = styled.button`
    margin: 20px auto;
    display: block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;

export default SameProductListWrap;
