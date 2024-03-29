import styled from 'styled-components';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SaleSecondhand=({type})=>{
    const [secondhandImage,setSecondhandImage]=useState([]);
    const handleAddImage=(event)=>{
        const imageList=event.target.files;
        const imageUrlList=[...secondhandImage];

        for(let i=0;i<imageList.length;i++){
            imageUrlList.push(URL.createObjectURL(imageList[i]));
        }

        if(imageUrlList.length>5){
            Swal.fire(
                '이미지 업로드 실패!',
                '이미지는 5개까지만 업로드 가능합니다.',
                'fail',
            );
        }
        else{
            setSecondhandImage(imageUrlList);
        }
        event.target.value='';
    }
    const handleDelteImage=(id)=>{
        setSecondhandImage(secondhandImage.filter((_,index)=>index!==id));
    }
    const [secondhandPrice, setSecondhandPrice]=useState("");
    const [secondhandSize, setSecondhandSize]=useState("");
    const [secondhandDelivery, setSecondhandDelivery]=useState([]);
    const handleSecondhandDeliveryChange=(event)=>{
        const value=event.target.value;
        if(secondhandDelivery.includes(value)){
            setSecondhandDelivery(secondhandDelivery.filter(item=>item!==value));
        }
        else{
            setSecondhandDelivery([...secondhandDelivery,value])
        }
    }
    const [secondhandLocation, setSecondhandLocation]=useState("");
    const [secondhandDetect, setSecondhandDetect]=useState([]);
    const handleSecondhandDetectChange=(event)=>{
        const value=event.target.value;
        if(secondhandDetect.includes(value)){
            setSecondhandDetect(secondhandDetect.filter(item=>item!==value));
        }
        else{
            setSecondhandDetect([...secondhandDetect,value])
        }
    }
    const [secondhandDetectDetail,setSecondhandDetectDetail]=useState("");

    const productSizeData=[
        220,225,230,235,
        240,245,250,255,
        260,265,270,275,
        280,285,290,295,
    ];

    const deliveryType=[
        {
            en:"parcel",
            ko:"택배"
        },
        {
            en:"direct",
            ko:"직거래"
        }
    ]

    const detectType=[
        {
            en:"pollution",
            ko:"오염"
        },
        {
            en:"ripped",
            ko:"찢어짐"
        },
        {
            en:"discoloration",
            ko:"변색"
        },
        {
            en:"spread",
            ko:"늘어남"
        },
        {
            en:"etc",
            ko:"기타"
        }
    ]

    return(
        <div>
            <SecondhandComponent>
                <SecondhandTitle>중고 상품 상세 사진</SecondhandTitle>
                <div>
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={handleAddImage}
                        id='image-input'
                        style={{display: 'none'}}
                    ></input>
                    <ImageInputLabel htmlFor='image-input'>사진 업로드</ImageInputLabel>
                </div>
                <div>
                    {secondhandImage.map((image, id)=>(
                         <ImageComponent>
                            <Image src={image} alt={`${image}-${id}`}></Image>
                            <DeleteBtn
                                src='images/delete_btn.svg'
                                onClick={()=>handleDelteImage(id)}
                            ></DeleteBtn>
                        </ImageComponent>
                    ))}
                </div>
            </SecondhandComponent>
            <div>
                <PriceComponent>
                    <SecondhandTitle>중고 상품 판매가</SecondhandTitle>
                    <PriceInputContainer>
                        <PriceInput type='number' onChange={(e)=>{setSecondhandPrice(Number(e.target.value))}}></PriceInput>
                        <PriceInputWon>원</PriceInputWon>
                    </PriceInputContainer>
                </PriceComponent>
                <SecondhandComponent>
                    <SecondhandTitle>사이즈</SecondhandTitle>
                    <SizeRadioContainer>
                        {productSizeData.map(item=>
                            <SizeRadio key={item}>
                                <SizeRadioInput
                                    type='radio'
                                    value={item}
                                    id={item}
                                    name='size-radio'
                                    onClick={(e)=>{setSecondhandSize(Number(e.target.value))}}
                                ></SizeRadioInput>
                                <SizeRadioLabel htmlFor={item}>{item}</SizeRadioLabel>
                            </SizeRadio>
                        )}
                    </SizeRadioContainer>
                </SecondhandComponent>
                <SecondhandComponent>
                    <SecondhandTitle>가능한 상품 전달 방식</SecondhandTitle>
                    <div>
                        {deliveryType.map(item=>
                            <DeliveryCheckbox key={item.en}>
                                <DeliveryCheckboxInput type='checkbox' value={item.en} id={item.en} onChange={handleSecondhandDeliveryChange}></DeliveryCheckboxInput>
                                <DeliveryCheckboxLabel htmlFor={item.en}>{item.ko}</DeliveryCheckboxLabel>
                            </DeliveryCheckbox>
                        )}
                    </div>
                </SecondhandComponent>
                <SecondhandComponent>
                    <SecondhandTitle>판매자 위치 정보</SecondhandTitle>
                    <LocationInput
                        type='text'
                        placeholder='ex) 리밋광역시 리밋구 리밋동'
                        onChange={(e)=>setSecondhandLocation(e.target.value)}
                    ></LocationInput>
                </SecondhandComponent>
                <SecondhandComponent>
                    <SecondhandTitle>하자 상세 정보</SecondhandTitle>
                    <DefectCheckboxContainer>
                        {detectType.map(item=>
                            <DefectCheckbox key={item.en}>
                                <DefectCheckboxInput type='checkbox' value={item.en} id={item.en} onChange={handleSecondhandDetectChange}></DefectCheckboxInput>
                                <DefectCheckboxLabel htmlFor={item.en}>{item.ko}</DefectCheckboxLabel>
                            </DefectCheckbox>
                        )}
                    </DefectCheckboxContainer>
                    <DefectTextareaContainer>
                        <DefectTextarea
                            placeholder='하자 정보를 상세하게 기술해주세요.'
                            onChange={(e)=>{setSecondhandDetectDetail(e.target.value)}}
                        ></DefectTextarea>
                    </DefectTextareaContainer>
                </SecondhandComponent>
                <SecondhandSubmit>중고 상품 등록하기</SecondhandSubmit>
            </div>
        </div>
    );
}

const SecondhandComponent=styled.div`
    margin-bottom: 30px; 
`

const SecondhandTitle=styled.h5`
    margin: 0px;
    margin-bottom: 5px;
`

const ImageInputLabel=styled.label`
    background-color: #72b8df4c;
    text-align: center;
    display: inline-block;
    width: 100%;
    padding: 10px 0px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 0.83em;
    font-weight: bold;
`

const ImageComponent=styled.div`
    background-color: #ffffff;
    width: 18%;
    position: relative;
    display: inline-block;
    &:not(:first-of-type){
        margin-left: 2.5%;
    }
    &::after{
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`

const Image=styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
    border-radius: 10px;
`

const DeleteBtn=styled.img`
    position: absolute;
    width: 15%; height: 15%;
    right: 5%; top: 5%;
`

const PriceComponent=styled.div`
    height: 45px;
    padding-bottom: 5px;
    border-bottom: 1px solid #979797;
    margin-bottom: 30px;
`

const PriceInputContainer=styled.div`
    float: right;
`

const PriceInput=styled.input`
    border: 0;
    outline: none;
    font-size: 1.17em;
    text-align: right;
    font-weight: bold;
    background-color: transparent;
`

const PriceInputWon=styled.h3`
    margin: 0px;
    display: inline-block;
`

const SizeRadioContainer=styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SizeRadio=styled.div`
    display: inline-block;
    width: 9.1%;
    margin-right: 1%;
    margin-bottom: 10px;

    &:nth-child(10n){
        margin-right: 0;
    }

    @media(max-width: 1100px){
        width: 13%;
        margin-right: 1.5%;

        &:nth-child(7n){
            margin-right: 0;
        }
        &:nth-child(10n){
            margin-right: 1.5%;
        }
    }
`

const SizeRadioInput=styled.input`
    display: none;
    &:checked+label{
        color: #000000;
        border: 1px solid #000000;
    }
`

const SizeRadioLabel=styled.label`
    display: inline-block;
    padding: 10px 0px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    font-size: 0.83em;
    background-color: #ffffff;
    color: #979797;
    border: 1px dashed #979797;
`

const DeliveryCheckbox=styled.div`
    display: inline-block;
    width: 9.1%;
    margin-right: 1%;

    @media (max-width: 1100px){
        width: 13%;
        margin-right: 1.5%;
    }
`
const DeliveryCheckboxInput=styled.input`
    display: none;
    &:checked+label{
        color: #000000;
        border: 1px solid #000000;
    }
`

const DeliveryCheckboxLabel=styled.label`
    width: 100%;
    text-align: center;
    padding: 10px 0px;
    display: inline-block;
    border-radius: 10px;
    font-size: 0.83em;
    background-color: #ffffff;
    color: #979797;
    border: 1px dashed #979797;
`

const LocationInput=styled.input`
    border: 0;
    outline: none;
    padding-bottom: 5px;
    border-bottom: 1px solid #979797;
    background-color: transparent;
    width: 100%;
`

const DefectCheckboxContainer=styled.div`
    margin: 0px 0px 5px 0px;
`

const DefectCheckbox=styled.div`
    display: inline-block;
`

const DefectCheckboxInput=styled.input`
    accent-color: #979797;
`

const DefectCheckboxLabel=styled.label`
    font-size: 0.83em;
`

const DefectTextareaContainer=styled.div`
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
`

const DefectTextarea=styled.textarea`
    width: 100%;
    border: 0;
    outline: none;
    height: 70px;
    resize: none;
`

const SecondhandSubmit=styled.button`
    width: 100%;
    border: none;
    background-color: #72b8df4c;
    padding: 10px;
    font-weight: bold;
    border-radius: 10px;
`

export default SaleSecondhand;