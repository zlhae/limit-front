import './SaleSecondhand.css';
import { useState } from 'react';

const SaleSecondhand=({type})=>{
    const [secondhandImage,setSecondhandImage]=useState([]);
    const handleAddImage=(event)=>{
        const imageList=event.target.files;
        const imageUrlList=[...secondhandImage];

        for(let i=0;i<imageList.length;i++){
            imageUrlList.push(URL.createObjectURL(imageList[i]));
        }

        if(imageUrlList.length>5){
            alert("이미지는 5개까지만 업로드 가능합니다.")
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
        <div className={`${type}-submit-box`}>
            <div id={`${type}-component`} className={`${type}-secondhand-image`}>
                <h5 id={`${type}-title`}>중고 상품 상세 사진</h5>
                <div className={`${type}-secondhand-image-input`}>
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={handleAddImage}
                        id='image-input'
                    ></input>
                    <label htmlFor='image-input'>사진 업로드</label>
                </div>
                <div className={`${type}-secondhand-image-show`}>
                    {secondhandImage.map((image, id)=>(
                         <div className={`${type}-secondhand-image-component`}>
                            <img src={image} alt={`${image}-${id}`}></img>
                            <img
                                id='delete_btn'
                                src='images/delete_btn.svg'
                                onClick={()=>handleDelteImage(id)}
                            ></img>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${type}-secondhand-information`}>
                <div id={`${type}-component`} className={`${type}-secondhand-price`}>
                    <h5 id={`${type}-title`}>중고 상품 판매가</h5>
                    <div className={`${type}-secondhand-price-input`}>
                        <input type='number' onChange={(e)=>{setSecondhandPrice(Number(e.target.value))}}></input>
                        <h3>원</h3>
                    </div>
                </div>
                <div id={`${type}-component`} className={`${type}-secondhand-size`}>
                    <h5 id={`${type}-title`}>사이즈</h5>
                    <div className={`${type}-secondhand-size-radios`}>
                        {productSizeData.map(item=>
                            <div className={`${type}-secondhand-size-radio`} key={item}>
                                <input  
                                    type='radio'
                                    value={item}
                                    id={item}
                                    name='size-radio'
                                    onClick={(e)=>{setSecondhandSize(Number(e.target.value))}}
                                ></input>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div id={`${type}-component`} className={`${type}-secondhand-delivery`}>
                    <h5 id={`${type}-title`}>가능한 상품 전달 방식</h5>
                    <div className={`${type}-secondhand-delivery-checkboxs`}>
                        {deliveryType.map(item=>
                            <div className={`${type}-secondhand-delivery-checkbox`} key={item.en}>
                                <input type='checkbox' value={item.en} id={item.en} onChange={handleSecondhandDeliveryChange}></input>
                                <label htmlFor={item.en}>{item.ko}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div id={`${type}-component`} className={`${type}-secondhand-location`}>
                    <h5 id={`${type}-title`}>판매자 위치 정보</h5>
                    <input
                        type='text'
                        placeholder='ex) 리밋광역시 리밋구 리밋동'
                        onChange={(e)=>setSecondhandLocation(e.target.value)}
                    ></input>
                </div>
                <div id={`${type}-component`} className={`${type}-secondhand-defect`}>
                    <h5 id={`${type}-title`}>하자 상세 정보</h5>
                    <div className={`${type}-secondhand-defect-checkboxs`}>
                        {detectType.map(item=>
                            <div className={`${type}-secondhand-defect-checkbox`} key={item.en}>
                                <input type='checkbox' value={item.en} id={item.en} onChange={handleSecondhandDetectChange}></input>
                                <label htmlFor={item.en}>{item.ko}</label>
                            </div>
                        )}
                    </div>
                    <textarea
                        placeholder='하자 정보를 상세하게 기술해주세요.'
                        onChange={(e)=>{setSecondhandDetectDetail(e.target.value)}}
                    ></textarea>
                </div>
                <button id={`${type}-secondhand-submit`}>중고 상품 등록하기</button>
            </div>
        </div>
    );
}

export default SaleSecondhand;