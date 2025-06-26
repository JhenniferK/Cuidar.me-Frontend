import './TelaInicial.css';
import { useNavigate } from 'react-router-dom'
import logonome from '../../assets/logo-cuidarme(nome).png'
import psicologa from '../../assets/psicologa.png'

const TelaInicial = () => {
  const navigate = useNavigate();
  return (
    <div className="pagina-inicial-container">
      <header className="cabecalho">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
        <nav className="menu">
          <a href="#inicio">Início</a>
          <a href="#sobre" onClick={() => navigate('/sobre')}>Sobre</a>
          <a href="#contato" onClick={() => navigate('/contato')}>Contato</a>
        </nav>
      </header>

      <main className="conteudo-inicial">
        <div className="texto">
          <h1>Cuidando da sua<br></br>saúde mental</h1>
          <p>Faça login ou cadastre-se para começar a usar o Cuidar.me.</p>
          <div className="botoes">
            <button className="btn" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-secundario" onClick={() => navigate('/cadastro')}>Cadastrar</button>
          </div>
        </div>
        <div className="imagem">
          <img src={psicologa} alt="Psicologa" />
        </div>
      </main>
    </div>
  );
};

export default TelaInicial;