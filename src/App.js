import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginCadastro from './components/TelaInicial/LoginCadastro';
import Login from './components/TelaLogin/Login';
import Cadastro from './components/TelaCadastro/Cadastro'
import Principal from './components/TelaPrincipal/Principal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;