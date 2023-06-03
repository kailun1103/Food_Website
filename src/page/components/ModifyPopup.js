import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Popup.css';
import firebase from '../../utils/FireBase';
import 'firebase/compat/database';

const ModifyPopup = ({ id, onClose }) => {
    const [resName, setResName] = useState('');
    const [classification, setClassification] = useState('');
    const [address, setAddress] = useState('');
    const [intro, setIntro] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const firebaseRef = firebase.database().ref('menu');
        firebaseRef.child(id).once('value', (snapshot) => {
            const menuItem = snapshot.val();
            if (menuItem) {
                setResName(menuItem.resName || '');
                setClassification(menuItem.classification || '');
                setAddress(menuItem.address || '');
                setIntro(menuItem.intro || '');
                setImage(menuItem.img || '');
            }
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!resName || !classification || !intro || !address) {
            window.alert('請填寫所有欄位');
            return;
        }
        const confirmPopup = window.confirm(
            `請確認以下修改內容：\n\n餐廳:  ${resName}\n分類:  ${classification}\n簡介:  ${intro}`
        );
        if (confirmPopup) {
            const updatedMenuItem = {
                resName: resName,
                classification: classification,
                address: address,
                intro: intro,
                img: image
            };

            const firebaseRef = firebase.database().ref('menu');
            firebaseRef
                .child(id)
                .update(updatedMenuItem)
                .then(() => {
                    console.log('資料寫入成功');
                    window.alert('提交修改成功');
                    onClose();
                })
                .catch((error) => {
                    console.error('資料寫入失敗:', error);
                });
        } else {
            return;
        }
    };

    const handleClose = () => {
        onClose(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setImage('');
    };


    return <div>
        <div className="PopupSection">
            <div className="PopupTopSection">
                <h3>修改餐廳資料</h3>
                <button onClick={handleClose}></button>
            </div>
            <div className="PopupInputSection">
                <form onSubmit={handleSubmit}>
                    <div className="PopupInputLeft">
                        <div className="PopupLabel">餐廳: <input type="text" className="PopupInput" placeholder="Restaurant" value={resName} onChange={(e) => setResName(e.target.value)} /></div>
                        <div className="PopupLabel">分類: <input type="text" className="PopupInput" placeholder="classification" value={classification} onChange={(e) => setClassification(e.target.value)} /></div>
                        <div className="PopupLabel">地址: <input type="text" className="PopupInput" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                        <div className="PopupLabel">簡介: <input type="text" className="PopupInput" style={{ paddingBottom: '170px' }} value={intro} placeholder="Introduce" onChange={(e) => setIntro(e.target.value)} /></div>
                    </div>
                    <div className='PopupInputRight'>
                        <div className="PopupLabel">圖片: </div>
                        <input className='PopupLabel' type="file" accept="image/*" onChange={handleImageChange} />
                        {image && <img className='PopupLabel' src={image} id="previewPic" alt="Preview" />}
                        {image && <button type="button" onClick={handleCancel}>取消圖片</button>}
                    </div>
                    <button className='PopupLabel' type="submit">提交</button>
                </form>
            </div>
        </div>
    </div>

};

export default ModifyPopup;
