import './TelaInicial.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logonome from '../../assets/logonome.png';
import psicologa from '../../assets/psicologa.png';

const TelaInicial = () => {
  const navigate = useNavigate();

  return (
    <div className="pagina-inicial-container">
      <header className="cabecalho">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
        <nav className="menu">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </nav>
      </header>

      <main className="conteudo-inicial">
        <div className="texto">
          <h1>Cuidando da sua<br />saúde mental</h1>
          <p>Faça login ou cadastre-se para começar a usar o Cuidar.me.</p>
          <div className="botoes">
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-secundario" onClick={() => navigate('/cadastro')}>Cadastrar</button>
          </div>
        </div>
        <div className="imagem">
          <img src={psicologa} alt="Psicóloga" />
        </div>
      </main>
    </div>
  );
};

export default TelaInicial;
