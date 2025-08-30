import './App.css'; // Podemos criar um App.css para o layout principal
import MenuLateral from './components/menuLateral/MenuLateral';
import ConteudoPrincipal from './components/conteudoPrincipal/ConteudoPrincipal';
import BarraLateral from './components/barraLateral/BarraLateral';

function App() {
  return (
    <div className="app-container">
      <MenuLateral />
      <ConteudoPrincipal />
      <BarraLateral />
    </div>
  );
}

export default App;