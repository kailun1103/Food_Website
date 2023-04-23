import { useEffect, useState } from 'react';
import './Explore.css';
import AddPopup from '../components/AddPopup';
import ResSection from '../components/ResSection';

const Explore = () => {
    const [addPopup, setAddPopup] = useState(false);

    return <div>
        <div className="ExploreSection">
            {/* <input type="text" placeholder="Search" id="Search" /> */}
            <button className='AddPopupButton' onClick={() => setAddPopup(true)}>新增餐廳資料</button>
            <ResSection className={`ResSection ${addPopup ? 'darken' : ''}`} />
        </div>
        {addPopup && (
            <div className="AddPopupBackgroud">
                <div className="AddPopupSection">
                    <AddPopup />
                    <button onClick={() => setAddPopup(false)}>关闭</button>
                </div>
            </div>
        )}
    </div>
}

export default Explore;
