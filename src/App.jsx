import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainContent from './components/MainContent/MainContent';
import SideBar from './components/SideBar/SideBar';
import CommunityPage from './components/CommunityPage/CommunityPage'; // Importa a nova página

function App() {
  const [userSettings, setUserSettings] = useState({
    nickname: 'Usuário Exemplo',
    avatar: null,
    // Outras configurações podem ser adicionadas aqui
  });

  // Novo estado para controlar a página ativa
  const [activePage, setActivePage] = useState('home');

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

  // Renderiza o conteúdo da página com base no estado 'activePage'
  const renderPage = () => {
    switch (activePage) {
      case 'community':
        return <CommunityPage settings={userSettings} />;
      case 'home':
      default:
        return (
          <>
            <MainContent settings={userSettings} />
            <SideBar settings={userSettings} onSave={handleSaveSettings} />
          </>
        );
    }
  };

  return (
    <div className="app-container">
      {/* Passa a função para alterar a página para o NavBar */}
      <NavBar setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default App;