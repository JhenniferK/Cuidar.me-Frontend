import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LoginCadastro from './components/TelaInicial/TelaInicial';
import Login from './components/TelasLoginCadastro/Login';
import Cadastro from './components/TelasLoginCadastro/Cadastro';
import Principal from './components/TelaPrincipal/Principal';
import Sobre from './components/TelaInicial/TelaSobre/Sobre';
import Contato from './components/TelaInicial/TelaContato/Contato';
import Paciente from './components/TelaPaciente/Paciente';
import Agenda from './components/TelaAgenda/Agenda';
import Prontuario from './components/TelaProntuario/Prontuario';
import Pagamento from './components/TelaPagamento/Pagamento';
import BarraNavegacao from './components/Barra-navegacao/Header';
import Perfil from './components/Barra-navegacao/Perfil';
import AddPaciente from './components/TelaPaciente/AddPaciente';

const MainLayout = () => {
  return (
    <>
    <BarraNavegacao />
    <main>
      <Outlet/>
    </main>
    </>
  )
}
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />

        <Route element={<MainLayout/> }>
          <Route path="/principal" element={<Principal />} />  
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/prontuarios" element={<Prontuario />} />
          <Route path="/pagamentos" element={<Pagamento />} />
          <Route path="/perfil" element={<Perfil />} /> 
          <Route path='/addPaciente' element={<AddPaciente/>} />
        </Route>

        <Route element={<Perfil/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;