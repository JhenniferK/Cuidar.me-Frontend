import './Sobre.css';
import { useNavigate } from 'react-router-dom'
import logonome from '../../../assets/logonome.png';
import psicologa from '../../../assets/psicologa-sobre.png'

const Sobre = () => {
  const navigate = useNavigate();
  return (
    <div className="pagina-inicial-container">
      <header className="cabecalho">
        <img src={logonome} alt="Logo Cuidar.me" className="logo" />
        <nav className="menu">
          <a href="#inicio" onClick={() => navigate('/')}>Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato" onClick={() => navigate('/contato')}>Contato</a>
        </nav>
      </header>

      <main className="conteudo-sobre">
        <div className="texto-sobre">
          <h1>Sobre</h1>
          <p>O Cuidar.me é um sistema web que está sendo desenvolvido<br></br>para otimizar a rotina administrativa de psicólogos. Em um<br></br>cenário onde o excesso de tarefas manuais pode comprometer<br></br>a qualidade do atendimento, o sistema surge como uma solução<br></br>completa para organização de prontuários, agendamento<br></br>de consultas, controle financeiro, comunicação com pacientes e<br></br>gestão de documentos, tudo isso com foco em segurança e<br></br>conformidade com a Lei Geral de Proteção de Dados (nº 13.709/2018).</p>
        </div>
        <div className="imagem-sobre">
          <img src={psicologa} alt="Psicologa" />
        </div>
      </main>
    </div>
  );
};

export default Sobre;