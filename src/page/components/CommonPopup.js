import { useEffect, useState } from 'react';
import './CommonPopup.css';

const CommonPopup = ({ id }) => {
    const res_API = `http://localhost:8000/menu/${id}`;

    const handleSubmit = (event) => {
        event.preventDefault();

        const score = document.getElementById('score').value;
        const common = document.getElementById('common').value;

        fetch(res_API)
            .then((res) => res.json())
            .then((data) => {
                const newData = {
                    ...data,
                    score: [...data.score, score],
                    common: [...data.common, common],
                };

                fetch(res_API, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newData),
                })
                    .then((res) => {
                        // 在提交成功后进行操作，例如清空输入框或关闭窗口
                        document.getElementById('score').value = '';
                        document.getElementById('common').value = '';
                        alert('提交成功');
                    })
                    .catch((error) => {
                        // 处理提交数据时可能出现的错误
                        console.error(error);
                        alert('提交失败');
                    });
            })
            .catch((error) => {
                // 处理获取数据时可能出现的错误
                console.error(error);
                alert('获取数据失败');
            });

    };
    return (
        <div>
            <h2>悬浮式窗口标题</h2>
            <form onSubmit={handleSubmit}>
                <p>悬浮式窗口内容</p>
                <input type="text" placeholder="score" id="score" />
                <input type="text" placeholder="common" id="common" />
                <button type="submit">提交</button>
            </form>
        </div>
    );
};

export default CommonPopup;
