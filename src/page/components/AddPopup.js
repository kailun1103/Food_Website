import { useEffect, useState, useRef } from 'react';
import './AddPopup.css';

const AddPopup = ({ onClose }) => { // 接收一個 onClose 的 props
    const res_API = "http://localhost:8000/menu"; //餐廳資料的api

    const handleSubmit = (event) => { //處理表單提交事件，創建一個新的餐廳資料並提交到API

        // 從表單中的input取得餐廳名稱、分類和簡介的值
        const resName = document.getElementById('resName').value;
        const classification = document.getElementById('classification').value;
        const intro = document.getElementById('intro').value;

        // 如果三個值有任何一個是空的，則跳出alert視窗，提示使用者要填寫所有欄位
        if (!resName || !classification || !intro) {
            window.alert('請填寫所有欄位');
            return;
        }

        const newMenuItem = { // 創建新的餐廳資料物件，並把上面三行資料帶入
            resName,
            classification,
            intro,
            img: "",
            score: [],
            common: [""]
        };

        fetch(res_API, { // 發送POST請求提交新餐廳資料到API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuItem)
        }) // 當API成功接收到新餐廳資料並完成處理後，會執行then
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const confirmPopup = window.confirm(`請確認以下資料：\n\n餐廳:  ${resName}\n分類:  ${classification}\n簡介:  ${intro}`); // 顯示確認彈出式視窗，包含先前填入的資料
                if (confirmPopup) { // 如果按下確認按鈕，則提交餐廳資料
                    fetch(res_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newMenuItem)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            window.alert('提交成功');
                            onClose(); // 關閉彈窗
                        })
                        .catch((error) => { // 顯示錯誤訊息
                            console.error('Error:', error);
                        });
                } else { // 如果按下取消按鈕，則返回剛剛的輸入餐廳畫面
                    return;
                }
            })
    }

    const handleClose = () => { // 處理關閉彈窗事件
        onClose(false);
    };

    const [showPic, setShowPic] = useState(null); // 圖片選擇輸入框(上傳功能)
    const [previewPic, setPreviewPic] = useState(null); // 圖片預覽區域的DOM元素(顯示圖片功能)

    useEffect(() => { // 抓取資訊到上面兩個useState
        setShowPic(document.getElementById('showPic'));
        setPreviewPic(document.getElementById('previewPic'));
    }, []);

    useEffect(() => {
        if (showPic && previewPic) { // 確保了showPic和previewPic變數都已經被初始化，都初始化才執行下面程式碼
            const handleChange = () => { // handleChange會在showPic的change事件發生時被呼叫。handleChange函式會讀取showPic中選擇的檔案，並將它顯示在previewImg預覽區域中。
                const file = showPic.files[0]; // 讀取imgInp中選擇的第一個檔案
                const reader = new FileReader(); // 建立一個FileReader物件
                // reader物件會觸發load事件，並呼叫previewImg.src = reader.result這行程式碼將預覽圖片的src屬性設定為讀取的資料URL
                reader.addEventListener('load', () => {
                    previewPic.src = reader.result;
                }, false);
                // 將選擇的檔案讀入此物件(reader.readAsDataURL(file))
                if (file) {
                    reader.readAsDataURL(file);
                }
            };
            showPic.addEventListener('change', handleChange); // 將handleChange函式註冊到showPic元素的change事件中
            return () => {
                showPic.removeEventListener('change', handleChange); // 清除函式，當元件卸載時會呼叫此清除函式來移除handleChange函式的註冊
            };
        }
    }, [showPic, previewPic]);

    return <div>
        <div classname="AddPopupSection">
            <div className='AddPopupTopSection'>
                <h3>新增餐廳資料</h3>
                <button onClick={handleClose}></button>
            </div>
            <div className='AddPopupInputSection'>
                <form onSubmit={handleSubmit}>
                    <div className='AddPopupInputLeft'>
                        <div className='AddPopupLabel'>餐廳:<input type="text" className='AddPopupInput' placeholder="Restaurant" id="resName" /></div>
                        <div className='AddPopupLabel'>分類:<input type="text" className='AddPopupInput' placeholder="classification" id="classification" /></div>
                        <div className='AddPopupLabel'>簡介:<input type="text" className='AddPopupInput' style={{ paddingBottom: "170px" }} placeholder="Introduce" id="intro" /></div>
                    </div>
                    <div className='AddPopupInputRight'>
                        <form action="http://localhost:8000/image" enctype="multipart/form-data">
                            <input name="progressbarTW_img" type="file" id="showPic" accept="image/gif, image/jpeg, image/png" />
                            <img id="previewPic" src="#" />
                        </form>
                        <button type="submit">提交</button>

                    </div>
                </form>
            </div>
        </div >
    </div >

}

export default AddPopup;
