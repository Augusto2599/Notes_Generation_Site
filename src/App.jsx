import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainContent from './components/MainContent/MainContent';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [userSettings, setUserSettings] = useState({
    nickname: 'Usuário Exemplo',
    avatar: null,
    // Outras configurações podem ser adicionadas aqui
  });

  // Carrega as configurações do usuário do localStorage quando a aplicação inicia
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setUserSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Função para salvar as configurações, que será passada para os componentes filhos
  const handleSaveSettings = (newSettings) => {
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    setUserSettings(newSettings);
  };

  return (
    <div className="app-container">
      <NavBar />
      <MainContent settings={userSettings} />
      <SideBar settings={userSettings} onSave={handleSaveSettings} />
    </div>
  );
}

export default App;