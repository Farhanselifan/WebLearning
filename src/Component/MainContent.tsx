
import './MainContent.css'; // Import the CSS file
import ironmanImage from './Image/DFW.png';

const MainContent = () => {
  return (
    <section className="NameImg">
      <div className="NameDiv">
        <h1>IRONMAN</h1>
        <h6>ACTION FIGURE</h6>
        <p>Price : 49 $</p>
        <button className="buttonx">BUY NOW</button>
      </div>
      <div className="forIMG">
        <img src={ironmanImage} className="ironmanimg" alt="Ironman Action Figure" />
      </div>
    </section>
  );
};

export default MainContent;