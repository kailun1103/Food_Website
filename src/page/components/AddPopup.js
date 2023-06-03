import { useEffect, useState } from 'react';
import './Popup.css';
import firebase from '../../utils/FireBase';
import 'firebase/compat/database';

const AddPopup = ({ onClose }) => {
    // 餐廳資料庫數值
    const [resName, setResName] = useState('');
    const [classification, setClassification] = useState('');
    const [address, setAddress] = useState('');
    const [intro, setIntro] = useState('');
    const [image, setImage] = useState('');
    // 追踪資料庫的key值
    const [menuCount, setMenuCount] = useState(0);
    useEffect(() => {
        const firebaseRef = firebase.database().ref('menu');
        firebaseRef.once('value', (snapshot) => {
            const count = snapshot.numChildren();
            setMenuCount(count);
        });
    }, []);
    // 按下提交按鈕後會提交表單
    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表單默認的提交行為
        // 如果三個值有任何一個是空的，則跳出 alert 視窗，提示使用者要填寫所有欄位
        if (!resName || !classification || !intro || !address) {
            window.alert('請填寫所有欄位');
            return;
        }
        const newMenuItem = {
            resName,
            classification,
            intro,
            address,
            img: image,
            score: [""],
            common: [""]
        };
        // 利用追蹤的key值帶入newMenuItem資料寫入firebase
        const firebaseRef = firebase.database().ref('menu');
        firebaseRef
            .child(menuCount)
            .set(newMenuItem)
            .then(() => {
                console.log('資料寫入成功');
                const confirmPopup = window.confirm(
                    `請確認以下資料：\n\n餐廳:  ${resName}\n分類:  ${classification}\n簡介:  ${intro}`
                ); // 顯示確認彈出式視窗，包含先前填入的資料
                if (confirmPopup) {
                    // 如果按下確認按鈕，則提交餐廳資料
                    window.alert('提交成功');
                    onClose(); // 關閉彈窗
                } else {
                    // 如果按下取消按鈕，則返回剛剛的輸入餐廳畫面
                    return;
                }
            })
            .catch((error) => {
                console.error('資料寫入失敗:', error);
            });
    };
    // 處理關閉彈窗事件
    const handleClose = () => {
        onClose(false);
    };
    // 處理圖片預留覽以及將圖片轉為base64型式存入image裡面
    useEffect(() => {
        const showPic = document.getElementById('showPic');
        const previewPic = document.getElementById('previewPic');

        const handleChange = () => {
            const file = showPic.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                previewPic.src = reader.result;
                setImage(previewPic.src); // 將Base64字串存入image中
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        };
        if (showPic && previewPic) {
            showPic.addEventListener('change', handleChange);
            return () => {
                showPic.removeEventListener('change', handleChange);
            };
        }
    }, []);

    const handleCancel = () => {
        const showPic = document.getElementById('showPic');
        const previewPic = document.getElementById('previewPic');
        showPic.value = '';
        previewPic.src = '';
    };

    return <div>
        <div classname="PopupSection">
            <div className='PopupTopSection'>
                <h3>新增餐廳資料</h3>
                <button onClick={handleClose}></button>
            </div>
            <div className='PopupInputSection'>
                <form onSubmit={handleSubmit}>
                    <div className='PopupInputLeft'>
                        <div className='PopupLabel'>餐廳:<input type="text" className='PopupInput' placeholder="Restaurant" value={resName} onChange={(e) => setResName(e.target.value)} /></div>
                        <div className='PopupLabel'>分類:<input type="text" className='PopupInput' placeholder="classification" value={classification} onChange={(e) => setClassification(e.target.value)} /></div>
                        <div className='PopupLabel'>地址:<input type="text" className='PopupInput' placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                        <div className='PopupLabel'>簡介:<input type="text" className='PopupInput' style={{ paddingBottom: "170px" }} value={intro} placeholder="Introduce" onChange={(e) => setIntro(e.target.value)} /></div>
                    </div>
                    <div className='PopupInputRight'>
                        <form action="http://localhost:8000/image" enctype="multipart/form-data">
                            <input className='PopupLabel' type="file" id="showPic" accept="image/gif, image/jpeg, image/png" />
                            <img className='PopupLabel' id="previewPic" src="#" />
                        </form>
                        <button className='PopupLabel' type="submit">提交</button>
                        <button type="button" onClick={handleCancel}>取消</button>
                    </div>
                </form>
            </div>
        </div >
    </div >
}

export default AddPopup;
