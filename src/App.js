import './App.css';
import logo from './images/logo.svg';
import foodIcon from './images/food-icon.svg';
import libraryIcon from './images/library-icon.svg';
import mapIcon from './images/map-icon.svg';
import settingIcon from './images/setting-icon.svg';

function App() {
  return (
    <div className="App">
      <div className="App-Topbar">
        <div className="left-wrap">
          <img className="logo" src={logo} alt="logo" />
          <span className="title">한 눈에 확인하는 서울시립대</span>
        </div>
        <div className="right-wrap">
          <img className="icon" src={foodIcon} />
          <img className="icon" src={libraryIcon} />
          <img className="icon" src={mapIcon} />
          <img className="icon" src={settingIcon} />
        </div>
      </div>
    </div>
  );
}

export default App;
