import './IndexSection.css';
import { Link } from 'react-router-dom';

const IndexSection = () => {
    const homePageClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const aboutPageClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return <div>
        {/* 上方引導列 */}
        <div className="TopSection">
            <span>
                <button className='TopButton' style={{ left: '5%' }} onClick={homePageClick}><Link to='/home'>凱倫的網站</Link></button>
            </span>
            <span>
                <button className='TopButton' style={{ right: '50%' }} onClick={homePageClick}><Link to='/home'>Home</Link></button>
            </span>
            <span>
                {/* <button className='TopButton' style={{ right: '38%' }} onClick={aboutPageClick}><Link to='/about'>About</Link></button> */}
            </span>
            <span>
                <button className='TopButton' style={{ right: '26%' }} onClick={aboutPageClick}><Link to='/explore'>Explore</Link></button>
            </span>
            <span>
                {/* <button className='TopButton' style={{ right: '14%' }}>Contact</button> */}
            </span>
        </div>

    </div>
}

export default IndexSection;

