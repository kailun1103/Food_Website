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
                resName,
                classification,
                address,
                intro,
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
                <button className='CancelButton' onClick={handleClose}></button>
            </div>
            <div className="PopupInputSection">
                <form onSubmit={handleSubmit}>
                    <div className="PopupInputLeft">
                        <div style={{ display: 'flex' }} className="PopupLabel">餐廳: <input type="text" className="PopupInput" placeholder="Restaurant" value={resName} onChange={(e) => setResName(e.target.value)} /></div>
                        <div style={{ display: 'flex' }} className="PopupLabel">分類: <input type="text" className="PopupInput" placeholder="classification" value={classification} onChange={(e) => setClassification(e.target.value)} /></div>
                        <div style={{ display: 'flex' }} className="PopupLabel">地址: <input type="text" className="PopupInput" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                        <div style={{ display: 'flex' }} className='PopupLabel'>簡介:<input type="text" className='PopupInput PopupInputIntro' placeholder="Introduce" value={intro} onChange={(e) => setIntro(e.target.value)} /></div>
                    </div>
                    <div className='PopupInputRight'>
                        <div style={{ display: 'flex' }} className="PopupLabel">圖片: <input type="file" className='PopupInputImg' accept="image/*" onChange={handleImageChange} />
                            {image && <button className='CancelButton2' type="button" onClick={handleCancel}></button>}
                        </div>
                        <img className='PopupLabel' src={image} id="previewPic" />
                        <div><button className='PopupButton' type="submit">提交整筆資料</button></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
};

export default ModifyPopup;
