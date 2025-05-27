import './LoginCadastro.css';
import logonome from '../assets/logo-cuidarme(nome).png'
import psicologa from '../assets/psicologa.png'

const LoginCadastro = () => {
  return (
    <div className="pagina-container">
      <header className="cabecalho">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
        <nav className="menu">
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main className="conteudo">
        <div className="texto">
          <h1>Cuidando da sua<br></br>saúde mental</h1>
          <p>Olá, psicólogo! Faça login ou cadastre-se para começar a usar o Cuidar.me.</p>
          <div className="botoes">
            <button className="btn">Login</button>
            <button className="btn btn-secundario">Cadastrar</button>
          </div>
        </div>
        <div className="imagem">
          <img src={psicologa} alt="Personagem psi" />
        </div>
      </main>
    </div>
  );
};

export default LoginCadastro;