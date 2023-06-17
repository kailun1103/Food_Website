import { useEffect, useState } from 'react';
import './Popup.css';
import GoogleMapAPI from '../../utils/GoogleMapAPI';
import firebase from '../../utils/FireBase';
import 'firebase/compat/database';

const InfoPopup = ({ id, onClose }) => {
    const [address, setAddress] = useState('');
    const [score, setScore] = useState([]);
    const [common, setCommon] = useState([]);

    useEffect(() => {
        const firebaseRef = firebase.database().ref('menu');
        firebaseRef.child(id).once('value', (snapshot) => {
            const menuItem = snapshot.val();
            if (menuItem) {
                setAddress(menuItem.address || '');
                setScore(menuItem.score || '');
                setCommon(menuItem.common || '');
            }
        });
    }, [id]);

    const handleClose = () => {
        onClose(false);
    };

    return <div>
        <div>
            <div className="PopupSection">
                <div className="PopupTopSection">
                    <h3>餐廳資訊</h3>
                    <button className="CancelButton" onClick={handleClose}></button>
                </div>
                <div className="PopupInputSection">
                    <div>
                        <div style={{ display: 'flex' }} className="PopupLabel"><b>評分: </b>{((Object.values(score).slice(1).reduce((a, b) => parseInt(a) + parseInt(b), 0)) / (Object.keys(score).length - 1)).toFixed(1)}</div>
                        <div style={{ display: 'flex' }} className="PopupLabel"><b>評論: </b></div>
                        <div className="PopupCommentRollBox">
                            {common.slice(1).map((comment, index) => (
                                <div key={index}>{`${index + 1}. ${comment}`}</div>
                            ))}
                        </div>
                    </div>
                    <div className='PopupMapSection'>
                        <GoogleMapAPI address={address} />
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default InfoPopup;
