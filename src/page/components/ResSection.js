import { useState, useEffect } from 'react';
import ModifyPopup from './ModifyPopup';
import '../others/Explore.css';
import './ResSection.css';

const ResSection = () => {
    const [menu, setMenu] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [modifyPopup, setModifyPopup] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8000/menu")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMenu(data);
            })
    }, []);

    const handleEdit = (id) => {
        fetch(`http://localhost:8000/menu/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: inputValue })
        })
            .then((res) => {
                // 處理成功回應
            })
            .catch((err) => {
                // 處理錯誤
            });
    };

    const handleDelete = (id) => {
        // 透過id將資料傳到後端進行刪除
    }

    return (
        <div>
            {menu && menu.map((item) => (
                <div key={item.id}>
                    <div className="Res_Box">
                        <div className={`Res_PicSection ${modifyPopup ? 'darken' : ''}`}>
                            <img alt='啵啵恰恰'></img>
                        </div>
                        <div className={`Res_Left_TextSection ${modifyPopup ? 'darken' : ''}`}>
                            <div className="Res_Left_Title"><b></b>{item.resName}</div>
                            <div className="Res_Left_Classification"><b>分類: </b>{item.classification}</div>
                            <div className="Res_Left_IntroduceSection"><b>簡介: </b>{item.intro}</div>
                            <div className='Res_Left_ButtonSection'>
                                <button className='ModifyPopupButton' onClick={() => setModifyPopup(true)}>修改</button>
                            </div>
                        </div>

                        <div className={`Res_Right_TextSection ${modifyPopup ? 'darken' : ''}`}>
                            <div className="Res_Right_Score"><b>評分: </b>{item.score}</div>
                            <div className="Res_Right_CommentTitle"><b>評論: </b></div>
                            <div className="Res_Right_CommentRollBox">
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                                <div>123</div>
                            </div>
                        </div>
                        <div className={`Res_MapSection ${modifyPopup ? 'darken' : ''}`}>
                            {/* <input type="text" placeholder="title" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> */}
                        </div>
                    </div>
                </div>
            ))}
            {modifyPopup && (
                <div className="ModifyPopupBackgroud">
                    <div className="ModifyPopupSection">
                        <ModifyPopup />
                        <button onClick={() => setModifyPopup(false)}>关闭</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResSection;
