import { useEffect, useState } from 'react';
import './Explore.css';
import AddPopup from '../components/AddPopup';
import ResSection from '../components/ResSection';

const Explore = () => {
    const [addPopup, setAddPopup] = useState(false);

    const handleClose = () => {
        setAddPopup(false);
    };

    return (
        <div>
            <div className="ExploreSection">
                <button className="AddPopupButton" onClick={() => setAddPopup(true)}>
                    新增餐廳資料
                </button>
                <ResSection className={`ResSection ${addPopup ? "darken" : ""}`} />
            </div>
            {addPopup && (
                <div className="AddPopupBackgroud">
                    <div className="AddPopupSection">
                        <AddPopup onClose={handleClose} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Explore;
