import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginCadastro from './components/TelaInicial/TelaInicial';
import Login from './components/TelasLoginCadastro/Login';
import Cadastro from './components/TelasLoginCadastro/Cadastro';
import Principal from './components/TelaPrincipal/Principal';
import Sobre from './components/TelaInicial/TelaSobre/Sobre';
import Contato from './components/TelaInicial/TelaContato/Contato';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;