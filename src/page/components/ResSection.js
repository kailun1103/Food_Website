import { useState, useEffect } from 'react';
import ModifyPopup from './ModifyPopup';
import CommonPopup from './CommonPopup';
import InfoPopup from './InfoPopup';
import firebase from '../../utils/FireBase';
import GoogleMapAPI from '../../utils/GoogleMapAPI';
import 'firebase/compat/database';
import '../others/Explore.css';
import './ResSection.css';
import './Popup.css';

const ResSection = () => {
    const [menu, setMenu] = useState(null);
    const [modifyPopup, setModifyPopup] = useState(false);
    const [commonPopup, setCommonPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const handleClose = () => {
        setModifyPopup(false);
        setCommonPopup(false);
        setInfoPopup(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firebase.database().ref('menu').once('value');
                const data = snapshot.val();
                if (data) {
                    const menuData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                    setMenu(menuData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        // 設定即時監聽器
        const databaseRef = firebase.database().ref('menu');
        databaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const menuData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setMenu(menuData);
            }
        });

        // 記得在組件卸載時取消監聽
        return () => {
            databaseRef.off('value');
        };
    }, []);

    return (
        <div>
            {menu && menu.map((item, key) => (
                <div key={key}>
                    <div className={`Res_Box ${modifyPopup ? 'darken' : ''}`}>
                        <div className="Res_PicSection">
                            <img src={item.img} alt='啵啵恰恰'></img>
                        </div>
                        <div className="Res_LeftSection">
                            <div className="Res_BigTitle"><b>{item.resName}</b></div>
                            <div className="Res_Title"><b>分類: </b>{item.classification}</div>
                            <div className="Res_Title"><b>地址: </b>{item.address}</div>
                            <div className="Res_Title"><b>簡介: </b>{item.intro}</div>
                            <div className='Res_Title'>
                                <button className='Res_Button' onClick={() => {
                                    setSelectedKey(key);
                                    setModifyPopup(true);
                                }}>修改</button>
                                <button className='Res_Button' onClick={() => {
                                    setSelectedKey(key);
                                    setCommonPopup(true);
                                }}>評論</button>
                                <button className='Res_Button_RWD' onClick={() => {
                                    setSelectedKey(key);
                                    setInfoPopup(true);
                                }}>資訊</button>
                            </div>
                        </div>
                        <div className="Res_RightSection">
                            <div className="Res_Title"><b>評分: </b>{((Object.values(item.score).slice(1).reduce((a, b) => parseInt(a) + parseInt(b), 0)) / (Object.keys(item.score).length - 1)).toFixed(1)}</div>
                            <div className="Res_Title"><b>評論: </b></div>
                            <div className="Res_CommentRollBox">
                                {item.common.slice(1).map((comment, index) => (
                                    <div key={index}>{`${index + 1}. ${comment}`}</div>
                                ))}
                            </div>
                        </div>
                        <div className="Res_MapSection">
                            <GoogleMapAPI address={item.address} />
                        </div>
                    </div>
                </div>
            ))}
            {modifyPopup && (
                <div className="PopupBackgroud">
                    <div className="PopupWindow">
                        <ModifyPopup id={selectedKey} onClose={handleClose} />
                    </div>
                </div>
            )}
            {commonPopup && (
                <div className="PopupBackgroud">
                    <div className="PopupWindow">
                        <CommonPopup id={selectedKey} onClose={handleClose} />
                    </div>
                </div>
            )}
            {infoPopup && (
                <div className="PopupBackgroud">
                    <div className="PopupWindow">
                        <InfoPopup id={selectedKey} onClose={handleClose} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResSection;
