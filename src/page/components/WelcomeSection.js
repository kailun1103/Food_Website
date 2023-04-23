
import './WelcomeSection.css';

const WelcomeSection = () => {
    function movepage2() {
        const top5foodSection = document.getElementById("RecommendSection");
        const top5foodSectionPos = top5foodSection.offsetTop;
        window.scrollTo({
            top: top5foodSectionPos,
            behavior: "smooth"
        });
    }
    return <div>
        <div className="WelcomeSection">
            <div className="MiddleText">聽說政大是美食沙漠?</div>
            <div className='MiddleText2' style={{ top: '11%' }}>
                <p>帶你尋找政大私藏美食!</p>
            </div>
            <div className='MiddleText2' style={{ top: '7%' }}>
                <p>點以下按鈕帶你探索</p>
            </div>
            <button className='MiddleButton' onClick={movepage2}>
                <div className='MiddleButtonText'>
                    開始探索
                </div>
            </button>
        </div>
    </div>
}

export default WelcomeSection;