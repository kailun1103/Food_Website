import { useEffect, useState } from 'react';
import './Explore.css';
import PopupWindow from '../components/PopupWindow';
import ResSection from '../components/ResSection';

const Explore = () => {
    const [showPopup, setShowPopup] = useState(false);

    return <div>
        <div className='ExploreSection'>
            <input type="text" placeholder="Search" id="Search" />
            <button className='ExploreButton' onClick={() => setShowPopup(true)}>显示悬浮窗口</button>
            {showPopup && (
                <div className="popupBackgroud">
                    <div className="popupSearchSection">
                        <PopupWindow />
                        <button onClick={() => setShowPopup(false)}>关闭</button>
                    </div>
                </div>
            )}
            <ResSection />


        </div>
    </div>
}

export default Explore;