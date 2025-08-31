import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainContent from './components/MainContent/MainContent';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <MainContent />
      <SideBar />
    </div>
  );
}

export default App;