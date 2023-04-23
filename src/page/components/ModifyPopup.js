import { useEffect, useState } from 'react';
import './ModifyPopup.css';

const ModifyPopup = () => {
    const res_API = "http://localhost:8000/menu";

    const handleSubmit = (event) => { // handleSubmit處理提交表單的邏輯
        const newMenuItem = { // 當表單提交時，通過 document.querySelector 獲取表單元素的值，然後構造一個新的菜單項 newMenuItem
            resName: document.querySelector("#resName").value,
            img: document.querySelector("#img").value,
            classification: document.querySelector("#classification").value,
            intro: document.querySelector("#intro").value
        };

        fetch(res_API, { // 使用 fetch 方法發送一個 POST 請求到 res_API 接口，同時將 newMenuItem 作為請求體傳遞過去。當請求成功返回後，控制台打印輸出響應數據，並將懸浮窗口關閉
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuItem)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return <div>

        <h2>悬浮式窗口标题</h2>
        <form onSubmit={handleSubmit}>  {/* 當提交按鈕被點擊時，會觸發 handleSubmit 函數 */}
            <p>悬浮式窗口内容</p>
            <input type="text" placeholder="resName" id="resName" />
            <input type="text" placeholder="img" id="img" />
            <input type="text" placeholder="classification" id="classification" />
            <input type="text" placeholder="intro" id="intro" />
            <button type="submit">提交</button>
        </form>
    </div>

}

export default ModifyPopup;