import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as BookmarkFilled } from '../Images/icon-bookmark-full.svg';
import { ReactComponent as BookmarkOutline } from '../Images/icon-bookmark.svg';
import ArrowLeftIcon from '../Images/arrow-left.svg';
import ArrowRightIcon from '../Images/arrow-right.svg';
import testProduct1 from '../Images/testProduct1.webp';
import testProduct2 from '../Images/testProduct2.webp';

const images = [testProduct2, testProduct1, testProduct1, testProduct1, testProduct1];

const MainProduct = ({ productId, accessToken }) => {
  const [dipsbuttonclicked, setDipsbuttonclicked] = useState(false);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트될 때 찜 상태를 서버에서 불러옴
  const fetchBookmarkStatus = async () => {
    try {
      const response = await fetch(`https://api.lim-it.one/api/v1/products/${productId}/wishes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // 토큰을 통해 사용자 인증
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDipsbuttonclicked(result.wish); // 서버에서 받아온 찜 상태를 로컬 상태로 설정
      } else {
        console.error('Failed to fetch bookmark status');
      }
    } catch (error) {
      console.error('Error fetching bookmark status:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 찜 상태를 서버에서 가져옴
  useEffect(() => {
    fetchBookmarkStatus();
  }, [productId]);

  // 찜 상태 업데이트 함수
  const dipsButtonClicked = async () => {
    if (dipsbuttonclicked) {
      // 찜 해제 요청
      callRemoveWishAPI().then((response) => {
        console.log('Removed from wishlist', response);
        setDipsbuttonclicked(false); // UI 업데이트
      });
    } else {
      // 찜 추가 요청
      callAddWishAPI().then((response) => {
        console.log('Added to wishlist', response);
        setDipsbuttonclicked(true); // UI 업데이트
      });
    }
  };

  // 찜 추가 API 호출
  const callAddWishAPI = async () => {
    try {
      const response = await fetch(`https://api.lim-it.one/api/v1/products/${productId}/wishes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // 토큰을 통해 인증
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // 찜 해제 API 호출
  const callRemoveWishAPI = async () => {
    try {
      const response = await fetch(`https://api.lim-it.one/api/v1/products/${productId}/wishes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }

  return (
    <ProductContainer>
      <ThumbBox>
        {/* 클릭 이벤트를 처리할 수 있는 div로 수정 */}
        <div onClick={dipsButtonClicked} style={{ cursor: 'pointer' }}>
          {dipsbuttonclicked ? <BookmarkFilled /> : <BookmarkOutline />}
        </div>
        <img src={`https://api.lim-it.one/images/${productId}`} alt={`Product ${productId}`} />
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

// 상품 리스트 컴포넌트 (스크롤 가능)
const MainProductListWrap = ({ accessToken }) => {
  const productListRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 스크롤 버튼 활성화 여부 결정
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

  // 스크롤 버튼 클릭 시 이동
  const scrollProducts = (direction) => {
    if (productListRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      productListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 200); // 스크롤 후 버튼 상태 재확인
    }
  };

  return (
    <ProductListWrap>
      {canScrollLeft && <ArrowButton direction="left" onClick={() => scrollProducts('left')} />}
      <ProductListContainer ref={productListRef}>
        <ProductGroup>
          {images.map((image, index) => (
            <MainProduct
              key={index}
              image={image}
              index={index}
              productId={index + 1} // 실제 productId로 변경 필요
              accessToken={accessToken} // 전달받은 토큰 사용
            />
          ))}
        </ProductGroup>
      </ProductListContainer>
      {canScrollRight && <ArrowButton direction="right" onClick={() => scrollProducts('right')} />}
    </ProductListWrap>
  );
};

const TouchableOpacity = styled.div`

`;

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
        background-color: rgba(221, 126, 96, 0.15); /* 0.8은 80% 불투명, 20% 투명 */
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
