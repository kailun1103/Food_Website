
import { useState, useEffect } from 'react';
import Top5 from './Top5';
import './RecommendSection.css';
const RecommendSection = () => {

    return <div>
        <div id="RecommendSection">
            <div className="RecommendText">本月最熱門餐廳TOP5 !</div>
            <Top5 />
        </div>
    </div>
}

export default RecommendSection;

