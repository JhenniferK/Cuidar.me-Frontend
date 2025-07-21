import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; 
import logonome from '../../assets/logonome.png';

const Header = () => {
  return (
    <header className="cabecalho-principal">
      <div className="logo-principal">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
      </div>
      <nav className="nav-principal">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/paciente">Pacientes</NavLink>
        <NavLink to="/agenda">Agenda</NavLink>
        <NavLink to="/prontuarios">Prontuários</NavLink>
        <NavLink to="/pagamentos">Pagamentos</NavLink>
      </nav>
      <div className="profile-icon">👤</div>
    </header>
  );
};

export default Header;