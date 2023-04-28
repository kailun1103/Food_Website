import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ModifyPopup.css';

const ModifyPopup = ({ id }) => {
    const res_API = "http://localhost:8000/menu";
    const history = useHistory();

    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        fetch(`${res_API}/${id}`)
            .then(response => response.json())
            .then(data => {
                setMenuData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id, res_API]);

    const modifySubmit = (event) => {
        event.preventDefault();

        const resName = event.target.resName.value;
        const img = event.target.img.value;
        const classification = event.target.classification.value;
        const intro = event.target.intro.value;

        if (!resName || !img || !classification || !intro) {
            alert('請填寫所有欄位');
            return;
        }

        const updatedMenuData = {
            resName: resName,
            img: img,
            classification: classification,
            intro: intro
        };

        fetch(`${res_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMenuData)
        })
            .then(() => {
                alert('更新成功');
                history.push('/menu');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDelete = () => {
        if (window.confirm('確定要刪除此筆資料？')) {
            fetch(`${res_API}/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    alert('刪除成功');
                    history.push('/menu');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div>
            <h2>修改資料到db</h2>
            <form onSubmit={modifySubmit}>
                <p>修改資料</p>
                <input type="text" placeholder="resName" id="resName" defaultValue={menuData.resName} />
                <input type="text" placeholder="img" id="img" defaultValue={menuData.img} />
                <input type="text" placeholder="classification" id="classification" defaultValue={menuData.classification} />
                <input type="text" placeholder="intro" id="intro" defaultValue={menuData.intro} />
                <button type="submit">更新</button>
            </form>
            <button onClick={handleDelete}>刪除</button>
        </div>
    );
};

export default ModifyPopup;
