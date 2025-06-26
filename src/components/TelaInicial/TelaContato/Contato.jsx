import './Contato.css';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import logonome from '../../../assets/logo-cuidarme(nome).png';
import psicologa from '../../../assets/psicologa-contato.png';

const Contato = () => {
  const navigate = useNavigate();
  return (
    <div className="pagina-contato-container">
      <header className="cabecalho">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
        <nav className="menu">
          <a href="#inicio" onClick={() => navigate('/')}>Início</a>
          <a href="#sobre" onClick={() => navigate('/sobre')}>Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main className="conteudo-contato">
        <div className="texto-contato">
          <h1>Contato</h1>
          <p>
            Jhennifer Kelly Nicolau da Cunha<br></br>
            <MdEmail className="icone" />jhenniferkelly@gmail.com<br></br>
            <MdPhone className="icone" />(83) 91234-5678
          </p>
          <p>
            Joyce Gregório da Silva<br></br>
            <MdEmail className="icone" />joycegregorio@gmail.com<br></br>
            <MdPhone className="icone" />(83) 98765-4321
          </p>
        </div>
        <div className="imagem-contato">
          <img src={psicologa} alt="Psicologa" />
        </div>
      </main>
    </div>
  );
};

export default Contato;