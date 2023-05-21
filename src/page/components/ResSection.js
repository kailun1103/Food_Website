import { useState, useEffect } from 'react';
import ModifyPopup from './ModifyPopup';
import CommonPopup from './CommonPopup';
import firebase from '../../utils/FireBase';
import GoogleMapAPI from '../../utils/GoogleMapAPI';
import 'firebase/compat/database';
import '../others/Explore.css';
import './ResSection.css';

const ResSection = () => {
    const [menu, setMenu] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [modifyPopup, setModifyPopup] = useState(false);
    const [commonPopup, setCommonPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


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
            {menu && menu.map((item) => (
                <div key={item.id}>
                    <div className={`Res_Box ${modifyPopup ? 'darken' : ''}`}>
                        <div className="Res_PicSection">
                            <img src={item.img} alt='啵啵恰恰'></img>
                        </div>
                        <div className="Res_Left_TextSection">
                            <div className="Res_Left_Title"><b></b>{item.resName}</div>
                            <div className="Res_Left_Classification"><b>分類: </b>{item.classification}</div>
                            <div className="Res_Left_IntroduceSection"><b>簡介: </b>{item.intro}</div>
                            <div className='Res_Left_ButtonSection'>
                                <button className='ModifyPopupButton' onClick={() => {
                                    setSelectedId(item.id);
                                    setModifyPopup(true);
                                }}>修改</button>
                                <button className='CommonPopupButton' onClick={() => {
                                    setSelectedId(item.id);
                                    setCommonPopup(true);
                                }}>評論</button>
                            </div>
                        </div>

                        <div className="Res_Right_TextSection">
                            <div className="Res_Right_Score"><b>評分: </b>{(item.score?.reduce((a, b) => a + b, 0) / item.score?.length || 0).toFixed(1)}</div>
                            <div className="Res_Right_CommentTitle"><b>評論: </b></div>
                            <div className="Res_Right_CommentRollBox">
                                {item.common.map((comment, index) => (
                                    <div key={index}>{comment}</div>
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
                <div className="ModifyPopupBackgroud">
                    <div className="ModifyPopupSection">
                        <ModifyPopup id={selectedId} />
                        <button onClick={() => setModifyPopup(false)}>关闭</button>
                    </div>
                </div>
            )}
            {commonPopup && (
                <div className="CommonPopupBackgroud">
                    <div className="CommonPopupSection">
                        <CommonPopup id={selectedId} />
                        <button onClick={() => setCommonPopup(false)}>关闭</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResSection;
