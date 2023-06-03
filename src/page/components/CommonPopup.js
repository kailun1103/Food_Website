import { useEffect, useState } from 'react';
import './CommonPopup.css';
import firebase from '../../utils/FireBase';
import 'firebase/compat/database';

const CommonPopup = ({ id, onClose }) => { // Updated prop name from onclose to onClose
    const firebaseRef = firebase.database().ref('menu').child(id);

    const handleSubmit = (event) => {
        event.preventDefault();

        const score = document.getElementById('score').value;
        const common = document.getElementById('common').value;

        firebaseRef
            .once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const newData = {
                        ...data,
                        score: [...data.score, score],
                        common: [...data.common, common],
                    };

                    return firebaseRef.update(newData);
                } else {
                    throw new Error('Data not found');
                }
            })
            .then(() => {
                document.getElementById('score').value = '';
                document.getElementById('common').value = '';
                alert('提交成功');
            })
            .catch((error) => {
                console.error(error);
                alert('操作失败');
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
                    <button onClick={handleClose}></button>
                </div>
                <div className="PopupInputSection">
                    <form onSubmit={handleSubmit}>
                        <div className="PopupInputLeft">
                            <div className="PopupLabel">評分: <input className="PopupInput" type="text" placeholder="score" id="score" /></div>
                            <div className="PopupLabel">評論: <input className="PopupInput" type="text" placeholder="common" id="common" /></div>
                        </div>
                        <button className="PopupLabel" type="submit">
                            提交
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommonPopup;
