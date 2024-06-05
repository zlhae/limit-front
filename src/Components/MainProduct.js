import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkIcon from './BookmarkIcon';
import TestImage from '../Images/test01.png';
import ArrowLeftIcon from '../Images/arrow-left.svg';
import ArrowRightIcon from '../Images/arrow-right.svg'; 

const MainProduct = () => {
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
                <img src={TestImage} alt='Product Thumbnail' />
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

const MainProductListWrap = () => {
    const productListRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => { 
        const { current } = productListRef;
        if (current) {
            const maxScrollLeft = current.scrollWidth - current.clientWidth;
            setCanScrollLeft(current.scrollLeft > 0);
            setCanScrollRight(current.scrollLeft < maxScrollLeft);
        }
    };

    useEffect(() => {
        const { current } = productListRef;
        if (current) {
            current.addEventListener('scroll', checkScrollButtons);
        }
        return () => {
            if (current) {
                current.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, []);

    const scrollProducts = (direction) => {
        if (productListRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            productListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScrollButtons, 200); 
        }
    };

    return (
        <ProductListWrap>
            {canScrollLeft && <ArrowButton direction="left" onClick={() => scrollProducts('left')} />}
            <ProductListContainer ref={productListRef}>
                <ProductGroup>
                {Array.from({ length: 10 }).map((_, index) => (
                    <MainProduct key={index} />
                ))}
                </ProductGroup>
            </ProductListContainer>
            {canScrollRight && <ArrowButton direction="right" onClick={() => scrollProducts('right')} />}
        </ProductListWrap>
    );
};

const ProductListWrap = styled.div`
    width: 80%;
    margin: 0 auto;
    position: relative;

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const ProductListContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 33.3%;
    transform: translateY(-50%);
    z-index: 10;
    background: url(${(props) => (props.direction === 'left' ? ArrowLeftIcon : ArrowRightIcon)}) no-repeat center center;
    background-size: contain;
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s;

    &:hover {
        opacity: 1;
    }

    ${(props) => (props.direction === 'left' ? 'left: -20px;' : 'right: -20px;')}

    @media (max-width: 600px) {
        width: 40px;
        height: 40px;

        ${(props) => (props.direction === 'left' ? 'left: -15px;' : 'right: -15px;')}
    }
`;

const ProductGroup = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 600px) {
        gap: 15px;
    }
`;

const ProductContainer = styled.div`
    min-width: 250px;
    width: 100%;

    @media (max-width: 600px) {
        min-width: 200px;
    }
`;

const ThumbBox = styled.div` 
    position: relative;
        
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
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

export default MainProductListWrap;