import { useEffect, useState } from 'react';
import './Popup.css';
import GoogleMapAPI from '../../utils/GoogleMapAPI';
import firebase from '../../utils/FireBase';
import 'firebase/compat/database';

const CommonPopup = ({ id, onClose }) => {
    const firebaseRef = firebase.database().ref('menu').child(id);
    const [score, setScore] = useState('10');
    const [common, setCommon] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        firebaseRef
            .once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const newScore = [...data.score, score];
                    const newCommon = [...data.common, common];
                    const newData = {
                        ...data,
                        score: newScore,
                        common: newCommon,
                    };

                    return firebaseRef.update(newData);
                } else {
                    throw new Error('Data not found');
                }
            })
            .then(() => {
                console.log('資料寫入成功');
                const confirmPopup = window.confirm(
                    `請確認以下資料：\n\n評分:  ${score}\n評論:  ${common}\n`
                );
                if (confirmPopup) {
                    window.alert('提交成功');
                    onClose();
                } else {
                    return;
                }
            })
            .catch((error) => {
                console.error('資料寫入失敗:', error);
            });
    };

    const handleClose = () => {
        onClose(false);
    };

    return (
        <div>
            <div className="PopupSection">
                <div className="PopupTopSection">
                    <h3>修改餐廳資料</h3>
                    <button className="CancelButton" onClick={handleClose}></button>
                </div>
                <div className="PopupInputSection">
                    <form onSubmit={handleSubmit}>
                        <div className="PopupInputLeft">
                            <div style={{ display: 'flex' }} className="PopupLabel">評分: {score}<input type="range" className="PopupRange" placeholder="score" id="score" min="0" max="10" value={score} onChange={(event) => setScore(event.target.value)} /></div>
                            <div style={{ display: 'flex' }} className="PopupLabel">評論:<input type="text" className="PopupInput PopupInputCommon" placeholder="common" id="common" onChange={(event) => setCommon(event.target.value)} /></div>
                            <button className="PopupButton" type="submit">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommonPopup;
