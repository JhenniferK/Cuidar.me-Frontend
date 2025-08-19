import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import logonome from '../../assets/logonome.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();

  const [nomePsicologo, setNomePsicologo] = useState('');

  useEffect(() => {
    const psicologoSalvo = localStorage.getItem('psicologo');
    if (psicologoSalvo) {
      const psicologo = JSON.parse(psicologoSalvo);
      setNomePsicologo(psicologo.nome);
    } else {
      setNomePsicologo('Psicólogo');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('psicologo');
    navigate('/');
  };

  return (
    <header className="cabecalho-principal">
      <div className="logo-principal">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
      </div>
      <nav className="nav-principal">
        <NavLink to="/principal">Início</NavLink>
        <NavLink to="/paciente">Pacientes</NavLink>
        <NavLink to="/agenda">Agenda</NavLink>
        <NavLink to="/prontuarios">Prontuários</NavLink>
        <NavLink to="/pagamentos">Pagamentos</NavLink>
        <NavLink to="/" onClick={handleLogout}>Sair</NavLink>
      </nav>

      <div className="perfil-container">
        <NavLink to="/perfil" className="perfil-button">
          <FontAwesomeIcon icon={faUserFriends}/>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;