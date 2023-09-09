import './App.css';
import logo from './images/logo.svg';

function App() {
  return (
    <div className="App">
      <div className="App-Topbar">
        <div className="left">
          <img className="logo" src={logo} alt="logo" />
          <span className="title">한 눈에 보는 서울시립대</span>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  );
}

export default App;
