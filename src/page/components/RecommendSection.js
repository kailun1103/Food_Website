
import { useState, useEffect } from 'react';
import './RecommendSection.css';
const RecommendSection = () => {
    // const [menu, setMenu] = useState(null)
    // useEffect(() => {
    //     fetch("http://localhost:8000/menu")
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setMenu(data);
    //         })
    // }, []);

    return <div>
        <div id="RecommendSection">
            <div className="RecommendText">本月最熱門美食TOP5 !</div>
            {/* {menu &&
                menu.map((item) => (
                    <div key={item.title}>

                        <div className="Res_Box">
                            <div className="Res_PicSection">
                                <img alt='啵啵恰恰'></img>
                            </div>
                            <div className="Res_Left_TextSection">
                                <div className="Res_Left_Title"><b></b>{item.title}</div>
                                <div className="Res_Left_Classification"><b>分類: </b>義大利麵、頓飯</div>
                                <div className="Res_Left_IntroduceSection">
                                    <span className="Res_Left_IntroduceTitle"><b>簡介: </b></span>
                                    <span className="Res_Left_IntroduceText">{item.intro}</span>
                                </div>
                            </div>
                            <div className="Res_MapSection">

                            </div>
                        </div>
                    </div>
                ))} */}

        </div>
    </div>
}

export default RecommendSection;

