import { useEffect, useState } from 'react';
import './About.css';

const About = () => {
    // const [kelleninfo, setKellenInfo] = useState(null);
    // useEffect(() => {
    //     fetch("http://localhost:8000/kellenintro")
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setKellenInfo(data)
    //         })
    // }, []);
    return <div>
        <div className="AboutSection">
            <h3>123</h3>
            {/* {kelleninfo &&
                kelleninfo.map((item) => (
                    <div key={item.title}>
                        <div className="InfoSection">
                            <div className="Info_PicSection">
                                <img src={item.img} alt='啵啵恰恰'></img>
                            </div>
                            <div className="Info_TextSection">
                                <div className="Info_Title"><b>{item.top}</b>{item.resName}</div>
                                <div className="Res_Left_Classification"><b>分類: </b>義大利麵、頓飯</div>
                                <div className="Res_Left_IntroduceSection">
                                    <span className="Res_Left_IntroduceTitle"><b>簡介: </b></span>
                                    <span className="Res_Left_IntroduceText">{item.intro}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            } */}
        </div>
    </div>
}

export default About;